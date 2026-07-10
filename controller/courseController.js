import Course from '../models/coursesModel.js'
import Enrollment from '../models/enrollmentModel.js';
export const createCourse = async (req, res) => {
    try {
        const { course, subject, price, shortDescription, longDescription } = req.body;
        if (!course || !subject || !price || !longDescription || !shortDescription) {
            return res.status(400).json({
                message: "all field are required"
            })
        }
        const coursed = await Course.create({
            course,
            subject,
            price,
            shortDescription,
            longDescription,
            createdBy: req.user.id
        })
        res.status(200).json({
            success: true,
            message: "exam created successfully",
            coursed
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("createdBy", "firstName lastName email");

        const enrollments = await Enrollment.find({
            student: req.user.id
        });

        const enrolledCourseIds = enrollments.map(
            e => e.course.toString()
        );

        const updatedCourses = courses.map(course => {
            let isEnrolled = false;
            if (req.user.role === "student") {
                isEnrolled = enrolledCourseIds.includes(course._id.toString())
            }
            if (req.user.role === "teacher" && course.createdBy._id.toString === req.user._id.toString()) {
                isEnrolled = true
            }
            if (req.user.role === "admin") {
                isEnrolled: true
            }
            return {
                ...course.toObject(),
                isEnrolled
            }
        })

        res.status(200).json({
            success: true,
            course: updatedCourses
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id)
            .populate("createdBy", "firstName lastName email");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check enrollment
        let isEnrolled = false;
        if (req.user.role === "student") {
            const enrollment = await Enrollment.findOne({
                student: req.user._id,
                course: id
            })
            isEnrolled = !!enrollment
        }
        if (
            req.user.role === "teacher" &&
            course.createdBy._id.toString() === req.user._id.toString()
        ) {
            isEnrolled = true;
        }

        if (req.user.role === "admin") {
            isEnrolled = true;
        }

        const updatedCourse = {
            ...course.toObject(),
            isEnrolled
        };

        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            course: updatedCourse
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!course) {
            return res.status(400).json({
                message: "course are not available"
            })
        }
        res.status(200).json({
            success: true,
            message: "course updated successfully",
            course
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "course created successfully"
            })
        }
        await course.deleteOne()
        return res.status(200).json({
            success: true,
            message: "course deleted successfully",
            course
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}