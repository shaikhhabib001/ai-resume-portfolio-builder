const ExperienceEditor = ({ content, onContentChange }) => {
  // Handles changes to a specific job entry's input fields
  const handleJobChange = (jobId, field, value) => {
    const updatedContent = content.map(job =>
      job.id === jobId ? { ...job, [field]: value } : job
    );
    onContentChange(updatedContent);
  };

  // Adds a new blank job entry
  const handleAddJob = () => {
    const newJob = {
      id: Date.now(), // Simple unique ID
      jobTitle: '',
      company: '',
      dates: '',
      description: ''
    };
    onContentChange([...content, newJob]);
  };

  // Removes a job entry
  const handleDeleteJob = (jobId) => {
    const updatedContent = content.filter(job => job.id !== jobId);
    onContentChange(updatedContent);
  };

  return (
    <div className="space-y-6">
      {content.map(job => (
        <div key={job.id} className="p-4 border rounded-md dark:bg-transparent bg-gray-50 space-y-2">
          <input
            type="text"
            placeholder="Job Title"
            className="w-full p-2 dark:text-gray-300 border rounded-md"
            value={job.jobTitle}
            onChange={(e) => handleJobChange(job.id, 'jobTitle', e.target.value)}
          />
          <input
            type="text"
            placeholder="Company"
            className="w-full p-2 dark:text-gray-300 border rounded-md"
            value={job.company}
            onChange={(e) => handleJobChange(job.id, 'company', e.target.value)}
          />
          <input
            type="text"
            placeholder="Dates (e.g., Jan 2020 - Present)"
            className="w-full p-2 dark:text-gray-300 border rounded-md"
            value={job.dates}
            onChange={(e) => handleJobChange(job.id, 'dates', e.target.value)}
          />
          <textarea
            rows="4"
            placeholder="Job Description"
            className="w-full p-2 dark:text-gray-300 border rounded-md"
            value={job.description}
            onChange={(e) => handleJobChange(job.id, 'description', e.target.value)}
          />
          <button
            onClick={() => handleDeleteJob(job.id)}
            className="px-3 py-1 text-sm dark:text-red-200 dark:border dark:border-red-500 dark:bg-transparent dark:hover:bg-red-700 text-red-700 bg-red-100 rounded-md hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={handleAddJob}
        className="px-4 py-2 font-semibold text-white dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-600 rounded-md hover:bg-blue-700"
      >
        + Add Experience
      </button>
    </div>
  );
};

export default ExperienceEditor;