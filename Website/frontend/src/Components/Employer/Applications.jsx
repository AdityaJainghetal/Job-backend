import React from "react";

const applicants = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    jobTitle: "Security Guard",
    resume: "#",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya.mehta@example.com",
    jobTitle: "Chef",
    resume: "#",
    status: "Approved",
  },
  {
    id: 3,
    name: "Amit Verma",
    email: "amit.verma@example.com",
    jobTitle: "Electrician",
    resume: "#",
    status: "Rejected",
  },
  {
    id: 4,
    name: "Rani Gupta",
    email: "rani.gupta@example.com",
    jobTitle: "Office Boy",
    resume: "#",
    status: "Pending",
  },
];

const Applications = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Job Applications</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Applicant Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Resume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {applicant.name}
                </td>
                <td className="px-6 py-4 text-gray-700">{applicant.email}</td>
                <td className="px-6 py-4 text-gray-700">{applicant.jobTitle}</td>
                <td className="px-6 py-4">
                  <a
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      applicant.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : applicant.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {applicant.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2 flex-wrap">
                  <button className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
