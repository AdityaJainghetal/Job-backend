const Employee = require("../../Module/RegisterModule");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const imagekit = require("../../Utils/imageKit");

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adityajainghetal@gmail.com",
    pass: "wjiv vwra gbpo mkgr",
  },
});

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Upload helper function
const uploadToImageKit = async (file) => {
  if (!file) return null;

  try {
    const uploadResponse = await imagekit.upload({
      file: file.data,
      fileName: `employee_${Date.now()}_${file.name}`,
      folder: "/employee_uploads",
    });
    return uploadResponse.url;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
};

// Register Employee
const registerEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      companyName,
      businessType,
      industry,
      website,
      location,
      contactPerson,
      contactEmail,
      contactPhone,
      companySize,
      password,
      confirmPassword,
      hiringNeeds,
    } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    console.log(email, "LLLL");
    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email: email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload photos to ImageKit
    const profilePhotoUrl = req.files?.ProfilePhoto
      ? await uploadToImageKit(req.files.ProfilePhoto[0])
      : null;

    const coverPhotoUrl = req.files?.Coverphoto
      ? await uploadToImageKit(req.files.Coverphoto[0])
      : null;

    // Create new employee
    const newEmployee = new Employee({
      name,
      email,
      companyName,
      businessType,
      industry,
      website,
      location,
      contactPerson,
      contactEmail,
      companySize,
      contactPhone,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      hiringNeeds,
      ProfilePhoto: profilePhotoUrl,
      Coverphoto: coverPhotoUrl,
    });

    await newEmployee.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newEmployee._id, role: "employee" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "10d" }
    );

    res.status(201).json({
      success: true,
      message: "Employee registered successfully",
      token,
      employee: {
        id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        companyName: newEmployee.companyName,
        ProfilePhoto: newEmployee.ProfilePhoto,
        Coverphoto: newEmployee.Coverphoto,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// Login Employee
const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: employee._id, role: "employee" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        companyName: employee.companyName,
        ProfilePhoto: employee.ProfilePhoto,
        Coverphoto: employee.Coverphoto,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

// Send OTP for password reset
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to employee record
    employee.resetPasswordOTP = otp;
    employee.resetPasswordOTPExpires = otpExpires;
    await employee.save();

    // Send email with OTP
    const mailOptions = {
      from: "adityajainghetal@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      html: `
                <h2>Password Reset Request</h2>
                <p>You requested a password reset for your account.</p>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>This OTP is valid for 10 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while sending OTP",
      error: error.message,
    });
  }
};

// Verify OTP and reset password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmNewPassword } = req.body;

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Find employee
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check OTP
    if (
      employee.resetPasswordOTP !== otp ||
      employee.resetPasswordOTPExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP fields
    employee.password = hashedPassword;
    employee.confirmPassword = hashedPassword;
    employee.resetPasswordOTP = undefined;
    employee.resetPasswordOTPExpires = undefined;
    await employee.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while resetting password",
      error: error.message,
    });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
  sendOTP,
  resetPassword,
};
