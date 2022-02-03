const Syllabus = require("../model/syllabus");

module.exports = (app) => {
  app.get("/syllabus/class/:class", async (req, res) => {
    try {
      const data = await Syllabus.find({ class: req.params.class });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  app.get("/syllabus/chapter/:chapter", async (req, res) => {
    try {
      const data = await Syllabus.find({ chapter: req.params.chapter });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  app.get("/syllabus/:id", async (req, res) => {
    try {
      const data = await Syllabus.findById(req.params.id);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  app.post("/addSyllabus", async (req, res) => {
    try {
      for (var i = 0; i < x.length; i++) {
        const newSyllabus = new Syllabus({
          chapter: x[i].name,
          syllabus: x[i].syllabus,
          class: "12",
        });
        const data = await newSyllabus.save();
      }
      return res.status(200).json("success");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
