import React from "react";

const jobData = [
  {
    title: "Security Guard",
    company: "SecureCorp Pvt Ltd",
    location: "Delhi, India",
    type: "Full-Time",
    status: "Open",
  },
  {
    title: "Kitchen Master",
    company: "Tasty Bites",
    location: "Mumbai, India",
    type: "Full-Time",
    status: "Closed",
  },
  {
    title: "Sweeper",
    company: "CleanCity Services",
    location: "Pune, India",
    type: "Part-Time",
    status: "Open",
  },
  {
    title: "Construction Labour",
    company: "BuildTech Infra",
    location: "Hyderabad, India",
    type: "Contract",
    status: "Closed",
  },
  {
    title: "Painter",
    company: "ColorNest",
    location: "Chennai, India",
    type: "Project Based",
    status: "Open",
  },
  {
    title: "Cook",
    company: "Foodies Express",
    location: "Jaipur, India",
    type: "Full-Time",
    status: "Closed",
  },


];

const ManageJobs = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobData.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h2>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  job.status === "Open"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {job.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Company:</span> {job.company}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Location:</span> {job.location}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Job Type:</span> {job.type}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Posted:</span>{" "}
              {new Date().toDateString()}
            </p>

            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View
              </button>
              <button className="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Edit
              </button>
              <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;
