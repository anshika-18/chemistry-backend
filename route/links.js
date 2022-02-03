const Link = require("../model/link");
module.exports = (app) => {
  app.get("/link/class/:class", async (req, res) => {
    try {
      const data = await Link.find({ class: req.params.class });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  app.get("/link/id/:id", async (req, res) => {
    try {
      const data = await Link.findById(req.params.id);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  app.get("/link/chapter/:chapter", async (req, res) => {
    try {
      const data = await Link.find({ chapter: req.params.chapter });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  app.post("/addLink", async (req, res) => {
    try {
      for (var i = 0; i < chapters11.length; i++) {
        let arr = [];
        for (var j = 0; j < chapters11[i].link12.length; j++) {
          arr.push({
            link: chapters11[i].link12[j].link1,
            description: chapters11[i].link12[j].topic,
          });
        }
        const newLink = new Link({
          chapter: chapters11[i].name,
          links: arr,
          class: "12",
        });
        const data = await newLink.save();
      }
      return res.status(200).json("success");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
