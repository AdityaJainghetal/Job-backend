import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllJobs,
  fetchJobById,
  fetchJobsByCategory,
  fetchJobsBySubcategory,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
    
} from './thunak';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    job: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ✅ Fetch all jobs
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch job by ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch jobs by category
      .addCase(fetchJobsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch jobs by subcategory
      .addCase(fetchJobsBySubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobsBySubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobsBySubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Create job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        );
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(applyToJob.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(applyToJob.fulfilled, (state, action) => {
  state.loading = false;
  state.successMessage = action.payload.message || "Applied Successfully";
})
.addCase(applyToJob.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload.message || "Failed to apply";
});



      
  },



});

export default jobSlice.reducer;
