import axios from "axios";
import Course from "../models/coursesModel.js";
import Enrollment from "../models/enrollmentModel.js";
import Payment from "../models/paymentModel.js";
import { generateEsewaSignature } from "../utils/esewaSignature.js";
import { generateTransactionId } from "../utils/generateTransactionId.js";

// =======================
// CREATE PAYMENT
// =======================
export const createPayment = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Already enrolled?
    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // Generate unique transaction UUID
    const transactionId = generateTransactionId();

    // Save payment as pending
    const payment = await Payment.create({
      student: req.user.id,
      course: courseId,
      amount: course.price,
      transactionId,
      paymentMethod: "esewa",
      status: "pending",
    });

    const productCode = process.env.ESEWA_PRODUCT_CODE;

    const signature = generateEsewaSignature(
      course.price,
      transactionId,
      productCode
    );

    return res.status(201).json({
      success: true,

      paymentId: payment._id,

      paymentData: {
        amount: course.price,
        tax_amount: 0,
        total_amount: course.price,

        transaction_uuid: transactionId,

        product_code: productCode,

        product_service_charge: 0,
        product_delivery_charge: 0,

        success_url: `${process.env.BACKEND_URL}/api/v1/payment/verify-payment`,

        failure_url: `${process.env.FRONTEND_URL}/payment-failed`,

        signed_field_names:
          "total_amount,transaction_uuid,product_code",

        signature,
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// VERIFY PAYMENT
// =======================
export const verifyPayment = async (req, res) => {
  try {

    const { data } = req.query;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Payment data not received",
      });
    }

    // Decode eSewa response
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf8")
    );

    console.log("Decoded Data:", decodedData);

    const {
      transaction_uuid,
      transaction_code,
      total_amount,
    } = decodedData;

    // Verify payment from eSewa server
    const verification = await axios.get(
      "https://rc.esewa.com.np/api/epay/transaction/status/",
      {
        params: {
          product_code: process.env.ESEWA_PRODUCT_CODE,
          total_amount,
          transaction_uuid,
        },
      }
    );

    console.log("Verification:", verification.data);

    if (verification.data.status !== "COMPLETE") {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-failed`
      );
    }

    // Find payment
    const payment = await Payment.findOne({
      transactionId: transaction_uuid,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Already verified?
    if (payment.status === "completed") {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-success`
      );
    }

    payment.esewaTransactionId = transaction_code;
    payment.status = "completed";
    payment.paidAt = new Date();

 


    await payment.save();

    // Check enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      student: payment.student,
      course: payment.course,
    });

    if (!alreadyEnrolled) {

      await Enrollment.create({
        student: payment.student,
        course: payment.course,
        payment: payment._id,
      });

      // Add student to course
      const course = await Course.findById(payment.course);

      if (course) {

        if (!course.enrolledStudents.includes(payment.student)) {
          course.enrolledStudents.push(payment.student);
          await course.save();
        }
      }
    }

    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-success`
    );

  } catch (error) {

    console.log(error);

    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-failed`
    );
  }
};