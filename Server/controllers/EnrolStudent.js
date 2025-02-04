const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const mailSender = require("../utils/mailSender");

exports.handleEnrolStudent = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid course ID and user ID",
      });
    }

    // Fetch the course details
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    console.log("Enrolling user:", userId, "in course:", courseId);

    // Enroll the student in the course
    await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { studentsEnrolled: userId } }, // Prevent duplicate enrollments
      { new: true }
    );

    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { courses: courseId } }, // Make sure the field name is correct
      { new: true }
    );

    // Set up course progress
    const newCourseProgress = new CourseProgress({
      userID: userId,
      courseID: courseId,
    });
    await newCourseProgress.save();

    // Link progress to the user
    await User.findByIdAndUpdate(
      userId,
      { $push: { courseProgress: newCourseProgress._id } },
      { new: true }
    );

    // Send confirmation email
    const recipient = await User.findById(userId);
    const emailTemplate = courseEnrollmentEmail(
      course.courseName,
      `${recipient.firstName} ${recipient.lastName}`,
      course.courseDescription,
      course.thumbnail
    );
    await mailSender(
      recipient.email,
      `You have successfully enrolled in ${course.courseName}`,
      emailTemplate
    );

    return res.status(200).json({
      success: true,
      message: `User successfully enrolled in ${course.courseName}`,
    });
  } catch (error) {
    console.error("Error enrolling user:", error);
    return res.status(500).json({
      success: false,
      message: "Could not enroll student",
      error: error.message,
    });
  }
};
