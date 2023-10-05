const express = require("express");
const axios = require("axios");
const router = express.Router();
const _ = require("lodash");

router.get("/blog-stats", async (req, res) => {
  try {
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Blogs not found error in data retrieval" });
  }
});
router.get("/data-analysis", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );

    const key = "title";
    const targetKeyword = "Privacy";

    const filteredObjects = _.filter(data.blogs, (obj) =>
      _.includes(obj[key], targetKeyword)
    );
    let title_array = _.map(data.blogs, "title");

    const uniqueTitle = _.uniq(title_array);
 
    const longestTitle = _.maxBy(title_array, "length");

    const LongetTitleObject = _.find(data.blogs, { title: longestTitle });

    res.status(200).json({
      length: data.blogs.length,
      blogWithLongestTitle: LongetTitleObject,
      noOfBlogsContainingPrivacyInTitle: filteredObjects.length,
      array_of_unique_blog_titles: uniqueTitle,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in data Analysis" });
  }
});

router.get("/blog-search", async (req, res) => {
  const searchWord = req.query.query;
  try {
    const { data } = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );

    const filteredObjects = _.filter(data.blogs, (obj) =>
      _.includes(obj["title"], searchWord)
    );
    res.status(200).json(filteredObjects);
  } catch (err) {
    res.status(500).json({ message: "Error in blog search" });
  }
});
module.exports = router;
