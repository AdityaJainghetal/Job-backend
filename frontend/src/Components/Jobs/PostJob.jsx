import React, { useState } from 'react';

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobType: '',
    category: '',
    company: '',
    website: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    experience: '',
    deadline: '',
    description: '',
    responsibilities: '',
    requirements: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Add API call here
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white shadow-xl rounded-xl mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center text-[#0077B6] mb-8">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Job Title & Type */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Job Title</label>
            <input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
            >
              <option value="">Select Type</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>
        </div>

        {/* Category & Experience */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., IT, Finance, Marketing"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., 2"
            />
          </div>
        </div>

        {/* Company & Website */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Company Name</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Company Inc."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="https://company.com"
            />
          </div>
        </div>

        {/* Location & Deadline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., Delhi, India"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Minimum Salary</label>
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., 30000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Maximum Salary</label>
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., 60000"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Provide a detailed description of the job role..."
          ></textarea>
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="List the responsibilities expected from the candidate..."
          ></textarea>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="List qualifications, skills, and experience needed..."
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Upload Job File (optional)</label>
          <input
            type="file"
            className="mt-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#0077B6] text-white font-medium py-3 px-6 rounded-md hover:bg-[#023E8A] transition duration-300"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
