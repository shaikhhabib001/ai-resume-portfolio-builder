const SummaryEditor = ({ content, onContentChange }) => {
  return (
    <div className="mt-4">
      <label htmlFor="summary" className="block text-sm dark:text-gray-200 font-medium text-gray-700 mb-2">
        Edit your summary
      </label>
      <textarea
        id="summary"
        rows="5"
        className="w-full p-2 border overflow-y-auto border-gray-300 dark:text-gray-300 dark:bg-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
};

export default SummaryEditor;