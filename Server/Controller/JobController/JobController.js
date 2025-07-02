// const Job = require("../../Module/JobModule/jobModule");
// const imagekit = require("../../Utils/imageKit");
// const razorpay = require("../Razorpay/PaymentController"); // Add Razorpay utility
// // const fileUpload = require("../../Utils/fileUpload"); // Make sure this handles PDF uploads

// // Create a new job posting
// const createJob = async (req, res) => {
//   try {
//     const {
//       company,
//       location,
//       salaryMin,
//       salaryMax,
//       experience,
//       deadline,
//       description,
//       responsibilities,
//       requirements,
//       jobpost,
//       category,
//       subCategory,
//     } = req.body;

//     // Count how many jobs already posted by this company
//     const jobCount = await Job.countDocuments({ company });

//     // Determine status: pending until 5th job
//     const status = jobCount < 4 ? "pending" : "approved";

//     // Handle PDF upload if exists
//     let pdfUrl = null;
//     if (req.files && req.files.pdf) {
//       pdfUrl = await fileUpload(req.files.pdf);
//     }

//     const newJob = new Job({
//       company,
//       location,
//       salaryMin,
//       salaryMax,
//       experience,
//       deadline,
//       description,
//       jobpost,
//       status,
//       responsibilities,
//       requirements,
//       category,
//       subCategory,
//       pdfUrl,
//     });

//     const savedJob = await newJob.save();

//     // If it's the 5th job, trigger Razorpay payment
//     if (jobCount + 1 === 5) {
//       const options = {
//         amount: 50000, // ₹500 in paise
//         currency: "INR",
//         receipt: `job_post_${savedJob._id}`,
//       };

//       const order = await razorpay.orders.create(options);

//       return res.status(201).json({
//         job: savedJob,
//         paymentRequired: true,
//         order,
//         message: "5th job added. Please complete the payment.",
//       });
//     }

//     // Otherwise, just return the job normally
//     res.status(201).json({
//       job: savedJob,
//       paymentRequired: false,
//       message: "Job created successfully",
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// // Get all jobs
// const getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find()
//       .populate("category")
//       .populate("subCategory");
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get job by ID
// const getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id)
//       .populate("category")
//       .populate("subCategory");
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }
//     res.status(200).json(job);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update job by ID
// const updateJob = async (req, res) => {
//   try {
//     const updates = req.body;
//     let pdfUrl = null;

//     // Handle PDF upload if exists in the update
//     if (req.files && req.files.pdf) {
//       pdfUrl = await fileUpload(req.files.pdf);
//       updates.pdfUrl = pdfUrl;
//     }

//     const updatedJob = await Job.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//     })
//       .populate("category")
//       .populate("subCategory");

//     if (!updatedJob) {
//       return res.status(404).json({ message: "Job not found" });
//     }
//     res.status(200).json(updatedJob);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete job by ID
// const deleteJob = async (req, res) => {
//   try {
//     const deletedJob = await Job.findByIdAndDelete(req.params.id);
//     if (!deletedJob) {
//       return res.status(404).json({ message: "Job not found" });
//     }
//     res.status(200).json({ message: "Job deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get jobs by category
// const getJobsByCategory = async (req, res) => {
//   try {
//     const jobs = await Job.find({ category: req.params.categoryId })
//       .populate("category")
//       .populate("subCategory");
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get jobs by subcategory
// const getJobsBySubcategory = async (req, res) => {
//   try {
//     const jobs = await Job.find({ subCategory: req.params.subcategoryId })
//       .populate("category")
//       .populate("subCategory");
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // File upload helper function
// const fileUpload = async (file) => {
//   const buffer = file.data;
//   if (!buffer || !file.name) {
//     throw new Error("Invalid file data");
//   }

//   const uploadResponse = await imagekit.upload({
//     file: buffer,
//     fileName: file.name,
//   });
//   return uploadResponse.url;
// };

// module.exports = {
//   createJob,
//   getAllJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
//   getJobsByCategory,
//   getJobsBySubcategory,
// };




const Job = require("../../Module/JobModule/jobModule");
const imagekit = require("../../Utils/imageKit");
const Razorpay = require('razorpay');
const Order = require('../../Module/JobModule/PaymentusersModule');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: "rzp_test_o3vkPO5n8pMXdo",
  key_secret: "fENFkA5Mq3eCWjciw8YWKuVi"
});

// File upload helper function
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

// Create a new job posting
const createJob = async (req, res) => {
  try {
    const {
      company,
      location,
      salaryMin,
      salaryMax,
      experience,
      deadline,
      description,
      responsibilities,
      requirements,
      jobpost,
      category,
      subCategory,
      position,
    } = req.body;

    // Count how many jobs already posted by this company
    const jobCount = await Job.countDocuments({ company });

    // Determine status: first 4 jobs are free and auto-approved, subsequent require payment
    const status = jobCount < 4 ? "approved" : "pending";

    // Handle PDF upload if exists
    let pdfUrl = null;
    if (req.files && req.files.pdf) {
      pdfUrl = await fileUpload(req.files.pdf);
    }

    const newJob = new Job({
      company,
      location,
      salaryMin,
      salaryMax,
      experience,
      deadline,
      description,
      jobpost,
      status,
      responsibilities,
      position,
      requirements,
      category,
      subCategory,
      pdfUrl,
      
    });

    const savedJob = await newJob.save();

    // For 5th job onwards, require payment of ₹20 per job
    if (jobCount >= 4) {
      const options = {
        amount: 100, // ₹20 in paise
        currency: "INR",
        receipt: `job_post_${savedJob._id}`,
        notes: {
          jobId: savedJob._id.toString(),
          company: company,
          type: "job_post_payment"
        }
      };

      const order = await razorpay.orders.create(options);

      // Save the order details to track payment status
      const newOrder = new Order({
        orderId: order.id,
        jobId: savedJob._id,
        company: company,
        amount: options.amount,
        currency: options.currency,
        status: 'created',
        receipt: options.receipt
      });
      await newOrder.save();

      return res.status(201).json({
        job: savedJob,
        paymentRequired: true,
        order,
        message: "Payment required to activate this job posting (₹20 per post after first 4 free posts).",
      });
    }

    // For first 4 jobs, no payment required
    res.status(201).json({
      job: savedJob,
      paymentRequired: false,
      message: "Job created successfully",
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(400).json({ message: error.message });
  }
};

// Verify payment and update job status
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Verify the payment signature
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', razorpay.key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Find the order in our database
    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update the order status
    order.status = 'paid';
    order.paymentId = razorpay_payment_id;
    order.signature = razorpay_signature;
    await order.save();

    // Update the job status to approved
    const updatedJob = await Job.findByIdAndUpdate(
      order.jobId,
      { status: 'approved' },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified and job approved",
      job: updatedJob,
      order
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    // For public access, only show approved jobs
    const jobs = await Job.find({ status: 'approved' })
      .populate("category")
      .populate("subCategory");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("category")
      .populate("subCategory");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    // Only show approved jobs to public, admin can see all
    if (job.status !== 'approved' && !req.user?.isAdmin) {
      return res.status(403).json({ message: "This job is not yet approved" });
    }
    
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update job by ID
// const updateJob = async (req, res) => {
//   try {
//     const updates = req.body;
//     let pdfUrl = null;

//     // Handle PDF upload if exists in the update
//     if (req.files && req.files.pdf) {
//       pdfUrl = await fileUpload(req.files.pdf);
//       updates.pdfUrl = pdfUrl;
//     }

//     const updatedJob = await Job.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//     })
//       .populate("category")
//       .populate("subCategory");

//     if (!updatedJob) {
//       return res.status(404).json({ message: "Job not found" });
//     }
//     res.status(200).json(updatedJob);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const updateJob = async (req, res) => {
  try {
    const updates = req.body;
    let pdfUrl = null;

    // Handle PDF upload if exists in the update
    if (req.files && req.files.pdf) {
      pdfUrl = await fileUpload(req.files.pdf);
      updates.pdfUrl = pdfUrl;
    }

    // Remove position from updates to prevent it from being modified
    if (updates.position) {
      delete updates.position;
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    })
      .populate("category")
      .populate("subCategory");

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete job by ID
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    // Also delete any associated payment orders
    await Order.deleteMany({ jobId: req.params.id });
    
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get jobs by category
const getJobsByCategory = async (req, res) => {
  try {
    const jobs = await Job.find({ 
      category: req.params.categoryId,
      status: 'approved' // Only show approved jobs
    })
      .populate("category")
      .populate("subCategory");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get jobs by subcategory
const getJobsBySubcategory = async (req, res) => {
  try {
    const jobs = await Job.find({ 
      subCategory: req.params.subcategoryId,
      status: 'approved' // Only show approved jobs
    })
      .populate("category")
      .populate("subCategory");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending jobs (for admin)
const getPendingJobs = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    const jobs = await Job.find({ status: 'pending' })
      .populate("category")
      .populate("subCategory");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJob,
  verifyPayment,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByCategory,
  getJobsBySubcategory,
  getPendingJobs
};