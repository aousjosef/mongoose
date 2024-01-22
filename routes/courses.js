const express = require("express");
const router = express.Router();
const Course = require("../module/coursesmod");

//hämta alla
router.get("/", async (req, res) => {
  try {
    const coureses = await Course.find();
    res.json(coureses);
  } catch (error) {
    res.json({ msg: error.message }).status(500);
  }
});

//hämta en
router.get("/:id", checkCourseByid, async (req, res) => {
  await res.json(res.course);
});

//Skapa en

router.post("/", async (req, res) => {
  const courseinput = new Course({
    _id: req.body._id,
    courseId: req.body.courseId,
    courseName: req.body.courseName,
    coursePeriod: req.body.coursePeriod,
  });

  try {
    const newCourse = await courseinput.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//Radera en
router.delete("/:id", checkCourseByid, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.id });
    res.json({ msg: "kurs raderad" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

async function checkCourseByid(req, res, next) {
  let course;
  try {
    course = await Course.findById(req.params.id);
    if (course == null) {
      return res.status(404).json({ msg: "kursen finns inte" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

  res.course = course;
  next();
}

module.exports = router;
