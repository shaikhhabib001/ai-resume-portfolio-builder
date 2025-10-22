const EducationEditor = ({ content, onContentChange }) => {
  // Handles changes for a specific education entry
  const handleEducationChange = (eduId, field, value) => {
    const updatedContent = content.map(edu =>
      edu.id === eduId ? { ...edu, [field]: value } : edu
    );
    onContentChange(updatedContent);
  };

  // Adds a new blank education entry
  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      school: '',
      degree: '',
      dates: '',
    };
    onContentChange([...content, newEducation]);
  };

  // Deletes an education entry
  const handleDeleteEducation = (eduId) => {
    const updatedContent = content.filter(edu => edu.id !== eduId);
    onContentChange(updatedContent);
  };

  return (
    <div className="space-y-6">
      {content.map(edu => (
        <div key={edu.id} className="p-4 border rounded-md dark:bg-transparent bg-gray-50 space-y-2">
          <input
            type="text"
            placeholder="School or University"
            className="w-full p-2 dark:text-gray-300 border rounded-md"
            value={edu.school}
            onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
          />
          <input
            type="text"
            placeholder="Degree or Certificate"
            className="w-full p-2 dark:text-gray-300 border rounded-md"
            value={edu.degree}
            onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
          />
          <input
            type="text"
            placeholder="Dates (e.g., Aug 2016 - May 2020)"
            className="w-full p-2 dark:text-gray-300 border rounded-md"
            value={edu.dates}
            onChange={(e) => handleEducationChange(edu.id, 'dates', e.target.value)}
          />
          <button
            onClick={() => handleDeleteEducation(edu.id)}
            className="px-3 py-1 text-sm dark:text-red-200 dark:border dark:border-red-500 dark:bg-transparent dark:hover:bg-red-700 text-red-700 bg-red-100 rounded-md hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={handleAddEducation}
        className="px-4 py-2 font-semibold text-white dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-600 rounded-md hover:bg-blue-700"
      >
        + Add Education
      </button>
    </div>
  );
};

export default EducationEditor;