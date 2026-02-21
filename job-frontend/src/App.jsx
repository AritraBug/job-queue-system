import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [type, setType] = useState("");
  const [payload, setPayload] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const fetchJobs = async () => {
    try {
      const url =
        statusFilter === "ALL"
          ? `${API}/jobs`
          : `${API}/jobs?status=${statusFilter}`;

      const res = await axios.get(url);

      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to backend.");
    }
  };

  const createJob = async () => {
    if (!type || !payload) return;

    try {
      await axios.post(`${API}/jobs`, { type, payload });
      setType("");
      setPayload("");
      fetchJobs();
    } catch (err) {
      console.error(err);
      setError("Failed to create job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-extrabold text-white text-center mb-10">
          🚀 Distributed Job Queue
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Create Job */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Create Job</h2>
          <div className="flex gap-4 flex-wrap">
            <input
              className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Job Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <input
              className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Payload"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
            <button
              onClick={createJob}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Jobs</h2>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-xl shadow-lg"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        {/* Job List */}
        <div className="grid gap-4">
          {jobs.length === 0 ? (
            <div className="bg-white p-6 rounded-xl text-center">
              No jobs found.
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-2xl shadow-lg flex justify-between items-center hover:shadow-xl transition"
              >
                <div>
                  <p className="font-bold text-lg">{job.type}</p>
                  <p className="text-gray-500">{job.payload}</p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    job.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : job.status === "PROCESSING"
                      ? "bg-yellow-100 text-yellow-700"
                      : job.status === "FAILED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}