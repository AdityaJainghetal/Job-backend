const express = require('express');
const router = express.Router();
const employeeAuthController = require('../Controller/Auth/EmployeeController'); // Assuming you have multer configured

// Register Employee
router.post(
  '/register',

  employeeAuthController.registerEmployee
);

// Login Employee
router.post('/login', employeeAuthController.loginEmployee);

// Send OTP for password reset
router.post('/send-otp', employeeAuthController.sendOTP);

// Reset Password with OTP
router.post('/reset-password', employeeAuthController.resetPassword);

module.exports = router;