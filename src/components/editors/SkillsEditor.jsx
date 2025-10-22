const SkillsEditor = ({ content, onContentChange }) => {
  return (
    <div className="mt-4">
      <label htmlFor="skills" className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-2">
        List your skills, separated by commas
      </label>
      <textarea
        id="skills"
        rows="5"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g., React, JavaScript, Project Management, Public Speaking"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
};

export default SkillsEditor;