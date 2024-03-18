const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

   await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: "Admin created successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        adminname,
        password
    })

    if (admin) {
        const token = jwt.sign({
            username
        }, JWT_SECRET)
    
        res.json({
            token
        })
        
    } else {
        res.status(411).json({
            message: "Invalid login credentials"
        })
        
    }
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // validate inputs with zod

   const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: "Course created successfully", courseID: newCourse._id
    })
});

router.get("/courses", adminMiddleware, async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
  console.log(response)
    res.json({
      courses: response,
    });
  });

module.exports = router;