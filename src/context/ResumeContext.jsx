import React, { createContext, useState, useContext } from 'react';

const initialSections = [
  { id: 'summary', title: 'Professional Summary', content: 'A brief, powerful summary of your skills and experience.' },
  { id: 'experience', title: 'Work Experience', content: [] },
  { id: 'education', title: 'Education', content: [] },
  { id: 'skills', title: 'Skills', content: 'List your key skills here.' },
];

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [sections, setSections] = useState(initialSections);
  
  const value = { sections, setSections };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};