import { useResume } from '../context/ResumeContext';
import html2pdf from 'html2pdf.js';

const PortfolioPreview = () => {
  const { sections: resumeData } = useResume();

  const handleExportPDF = () => {
    const element = document.getElementById('portfolio-content');
    const opt = {
      margin: 0.5,
      filename: 'portfolio.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!resumeData || resumeData.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">No resume data found.</h1>
        <p>Please go back to the builder and create a resume first.</p>
      </div>
    );
  }

  // Helper to find a specific section's data
  const getSection = (id) => resumeData.find(sec => sec.id === id);
  const summary = getSection('summary');
  const experience = getSection('experience');
  const education = getSection('education');
  const skills = getSection('skills');

  return (
    <div className="max-w-4xl mx-auto rounded-md border dark:bg-transparent bg-gray-50 p-4 sm:p-8">
      
      <div id="portfolio-content" className="bg-white dark:bg-gray-800 p-8 md:p-12 shadow-lg rounded-lg">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200 text-center mb-2">Portfolio</h1>
          <p className="text-center dark:text-gray-300 text-gray-600 mb-8">Generated from Resume Data</p>
        </header>

        <main>
          {summary && (
            <section className="mb-10">
              <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-700 border-b-2 border-gray-600 pb-2 mb-4">
                Professional Summary
              </h2>
              <p className="dark:text-gray-300 text-gray-700">{summary.content}</p>
            </section>
          )}

          {experience && experience.content.length > 0 && (
            <section className="mb-10">
              <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-700 border-b-2 border-gray-600 pb-2 mb-4">
                Work Experience
              </h2>
              <div className="space-y-6">
                {experience.content.map(job => (
                  <div key={job.id}>
                    <h3 className="text-xl dark:text-gray-200 font-semibold text-gray-800">{job.jobTitle}</h3>
                    <p className="text-md dark:text-gray-300 font-medium text-gray-600">{job.company}</p>
                    <p className="text-sm dark:text-gray-400 text-gray-500 mb-2">{job.dates}</p>
                    <p className="text-gray-700 dark:text-gray-400 whitespace-pre-wrap">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.content.length > 0 && (
            <section className="mb-10">
              <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-700 border-b-2 border-gray-600 pb-2 mb-4">
                Education
              </h2>
              {education.content.map(edu => (
                <div key={edu.id} className="mb-4">
                  <h3 className="text-xl dark:text-gray-200 font-semibold text-gray-800">{edu.school}</h3>
                  <p className="text-md dark:text-gray-300 text-gray-600">{edu.degree}</p>
                  <p className="text-sm dark:text-gray-400 text-gray-500">{edu.dates}</p>
                </div>
              ))}
            </section>
          )}

          {skills && (
            <section>
              <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-700 border-b-2 border-gray-600 pb-2 mb-4">
                Skills
              </h2>
              <p className="dark:text-gray-300 text-gray-700">{skills.content}</p>
            </section>
          )}
        </main>
      </div>

      <div className="flex justify-end mt-4">
      {/* <div className="max-w-4xl mx-auto text-center mb-8"> */}
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white cursor-pointer font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default PortfolioPreview;