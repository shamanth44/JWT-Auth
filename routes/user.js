const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course } = require("../db");
const adminMiddleware = require("../middleware/admin");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.get("/courses", adminMiddleware, async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
  console.log(response)
    res.json({
      courses: response,
    });
  });

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router