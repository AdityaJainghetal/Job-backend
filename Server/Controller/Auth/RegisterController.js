const userModel = require("../../Module/UserModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const imagekit = require("../../Utils/imageKit");
const UserModule = require("../../Module/UserModule");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const fileUpload = async (file) => {
  const buffer = file.data;
  if (!buffer || !file.name) {
    throw new Error("Invalid file data");
  }

  const uploadResponse = await imagekit.upload({
    file: buffer,
    fileName: file.name,
  });
  return uploadResponse.url;
};

// Register Controller

// const register = async (req, res) => {
//   const {
//     name,
//     phone,
//     dob,
//     city,
//     qualification,
//     skills,
//     desgination,
//     age,
//     gender,
//   } = req.body;

//   const pdfFile = req.files?.pdfBrochure;
//   console.log(req.body, "lkjhgfdsa");
//   try {
//     // Check if user already exists by phone number
//     const existingUser = await userModel.findOne({ phone });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone number already registered",
//       });
//     }

//     // Hash the phone (used as password)
//     // const salt = await bcrypt.genSalt(10);
//     // const hashedPassword = await bcrypt.hash(phone, salt);

//     // Upload PDF if provided
//     const pdfUrl = pdfFile ? await fileUpload(pdfFile) : undefined;

//     // Create user
//     const user = await userModel.create({
//       name,
//       phone,
//       dob,
//       city,
//       age,
//       desgination,
//       qualification,
//       gender,
//       skills,
//       // password: hashedPassword,
//       pdfBrochure: pdfUrl,
//     });

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, name: user.name, phone: user.phone },
//       JWT_SECRET,
//       { expiresIn: "10d" }
//     );

//     await user.save();

//     res.status(201).json({
//       success: true,
//       message: "User registered and logged in successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//       },
//       token,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during registration",
//       error: error.message,
//     });
//   }
// };

// Login Controller
// const login = async (req, res) => {
//   const { phone, password } = req.body; // Now expecting phone and password separately

//   try {
//     // Find user by phone number
//     const user = await userModel.findOne({ phone });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Compare provided password with stored hash
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//       },
//       process.env.JWT_SECRET || "Adityajain@1234",
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during login",
//       error: error.message,
//     });
//   }
// };

// const login = async (req, res) => {
//   const { phone, name } = req.body;

//   try {
//     // Find user by phone number
//     const user = await userModel.findOne({ phone });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Check if name matches
//     if (user.name !== name) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid name",
//       });
//     }

//     // Debug logs
//     console.log("🔐 Raw phone (used as password):", phone);
//     console.log("🔐 Hashed password from DB:", user.password);

//     // Password logic: phone number is treated as password
//     const isMatch = await bcrypt.compare(phone, user.password);

//     console.log("✅ Password match result:", isMatch);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//       },
//       process.env.JWT_SECRET || "your_jwt_secret_key",
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during login",
//       error: error.message,
//     });
//   }
// };


const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await userModel.findOne({ name });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("🔐 Entered password (phone number):", password);
    console.log("📞 User phone:", user.phone);
    console.log("🔐 Stored hash:", password);

    // Check for missing values
    if (!password || !password) {
      console.error("❌ Missing password or stored hashed password");
      return res.status(400).json({
        success: false,
        message: "Password or stored hash is missing",
      });
    }

    // // Compare password
    // const isMatch = await bcrypt.compare(password, password);
    // console.log("✅ Password match:", isMatch);

    // if (!isMatch) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid password",
    //   });
    // }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        phone: user.phone,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};


// const login = async (req, res) => {
//   const { name, password } = req.body; // password === phone

//   try {
//     const user = await UserModule.findOne({ name });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     console.log("🔐 Entered password (phone):", password);
//     console.log("🔐 Stored hashed password:", user.password);

//     if (!password || !user.password) {
//       return res.status(400).json({
//         success: false,
//         message: "Password or stored hash is missing",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//       },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during login",
//       error: error.message,
//     });
//   }
// };


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;

    // Set reset password token and expiry (1 hour from now)
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "adityajainghetal@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "wjiv vwra gbpo mkgr",
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || "adityajainghetal@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `
                <h2>Password Reset</h2>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Reset Password
                </a>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token or token has expired",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Set new password and clear token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "adityajainghetal@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "wjiv vwra gbpo mkgr",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || "adityajainghetal@gmail.com",
      to: user.email,
      subject: "Password Changed Successfully",
      html: `
                <h2>Password Updated</h2>
                <p>Your password has been successfully changed.</p>
                <p>If you didn't make this change, please contact support immediately.</p>
            `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred",
      error: error.message,
    });
  }
};

// const register = async (req, res) => {
//   try {
//     const { phone, name } = req.body;

//     // Validate input
//     if (!phone || !name) {
//       return res.status(400).json({ message: "Phone and name are required" });
//     }

//     // Check if user already exists
//     const existingUser = await UserModule.findOne({ name :name});

//     console.log(existingUser,"aaaaaaaaaaaaaaaaaaaaa")

//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "Phone number already registered" }); // 409 Conflict is more accurate
//     }

//     // Create and save new user
//     const newUser = new UserModule({ phone, name });
//     await newUser.save();

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       message: "Server error during registration",
//       error: error.message,
//     });
//   }
// };


// const register = async (req, res) => {
//   try {
//     const { phone, name } = req.body;

//     // Validate input
//     if (!phone || !name) {
//       return res.status(400).json({ message: "Phone and name are required" });
//     }

//     // Check if user already exists (by phone)
//     const existingUser = await UserModule.findOne({ phone });

//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "Phone number already registered" });
//     }

//     // Create and save new user
//     const newUser = new UserModule({ phone, name });
//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: newUser._id, phone: newUser.phone },
//       JWT_SECRET,
//       { expiresIn: "7d" } // Token valid for 7 days
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//       token,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       message: "Server error during registration",
//       error: error.message,
//     });
//   }
// };

// const register = async (req, res) => {
//   try {
//     const { phone, name } = req.body;

//     // Validate input
//     if (!phone || !name) {
//       return res.status(400).json({ message: "Phone and name are required" });
//     }

//     // Check if user already exists (by phone)
//     const existingUser = await UserModule.findOne({ phone });
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "Phone number already registered" });
//     }

//     // Hash the phone number to use as password
//     const hashedPassword = await bcrypt.hash(phone, 10);

//     console.log("📞 Phone (raw password):", phone);
//     console.log("🔐 Hashed password:", hashedPassword);

//     // Create and save new user with hashed password
//     const newUser = new UserModule({
//       phone,
//       name,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: newUser._id, phone: newUser.phone },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         phone: newUser.phone,
//       },
//       token,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       message: "Server error during registration",
//       error: error.message,
//     });
//   }
// };

const register = async (req, res) => {
  try {
    const { phone, name } = req.body;

    // Validate input
    if (!phone || !name) {
      return res.status(400).json({ message: "Phone and name are required" });
    }

    // Check if user already exists (by phone)
    const existingUser = await UserModule.findOne({ phone });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Phone number already registered" });
    }

    // Hash the phone number to use as password
    const hashedPassword = await bcrypt.hash(phone, 10);

    console.log("📞 Phone (raw password):", phone);
    console.log("🔐 Hashed password:", hashedPassword);

    // Create and save new user with hashed password
    const newUser = new UserModule({
      phone,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, phone: newUser.phone },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
