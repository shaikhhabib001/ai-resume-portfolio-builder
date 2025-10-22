// Importing necessary libraries and hooks
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useResume } from '../context/ResumeContext';
// Importing Firebase utilities
import { auth, db } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
// Importing individual section editors
import SummaryEditor from '../components/editors/SummaryEditor';
import ExperienceEditor from '../components/editors/ExperienceEditor';
import EducationEditor from '../components/editors/EducationEditor';
import SkillsEditor from '../components/editors/SkillsEditor';
// Importing other components
import Banner from '../components/Banner';
import AiSuggestions from '../components/AiSuggestions';
import PortfolioPreview from '../components/PortfolioPreview';

const initialSections = [
  { id: 'summary', title: 'Professional Summary', content: 'A brief, powerful summary of your skills and experience.' },
  { id: 'experience', title: 'Work Experience', content: [] },
  { id: 'education', title: 'Education', content: [] },
  { id: 'skills', title: 'Skills', content: 'List your key skills here.' },
];

const BuilderPage = () => {
  const { sections, setSections } = useResume();
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const resumeRef = doc(db, 'resumes', user.uid);
        try {
          const docSnap = await getDoc(resumeRef);
          if (docSnap.exists() && docSnap.data().sections) {
            const fetchedSections = docSnap.data().sections;
            if (Array.isArray(fetchedSections)) {
              setSections(fetchedSections);
            } else {
              console.warn("Firestore data is not an array. Resetting to default.");
              setSections(initialSections);
            }
          } else {
            console.log("No saved resume. Using default sections.");
            setSections(initialSections);
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
          setSections(initialSections);
        }
      } else {
        setCurrentUser(null);
        console.log("No user logged in. Using default sections.");
        setSections(initialSections);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setSections]);

  const handleOnDragEnd = (result) => {
    if (!result.destination || !sections) return;
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSections(items);
  };

  const handleContentChange = (sectionId, newContent) => {
    if (!sections) return; // Add null check for sections
    const newSections = sections.map(section =>
      section.id === sectionId ? { ...section, content: newContent } : section
    );
    setSections(newSections);
  };

  const renderSectionEditor = (section) => {
    // Your existing switch statement logic is fine
    switch (section.id) {
      case 'summary':
        return <SummaryEditor content={section.content} onContentChange={(newContent) => handleContentChange(section.id, newContent)} />;
      case 'experience':
        return <ExperienceEditor content={section.content} onContentChange={(newContent) => handleContentChange(section.id, newContent)} />;
      case 'education':
        return <EducationEditor content={section.content} onContentChange={(newContent) => handleContentChange(section.id, newContent)} />;
      case 'skills':
        return <SkillsEditor content={section.content} onContentChange={(newContent) => handleContentChange(section.id, newContent)} />;
      default:
        return <p className="mt-4 text-gray-500">Editor not available.</p>;
    }
  };

  const handleSaveResume = async () => {
    if (!currentUser) {
      alert('Please log in to save your resume.');
      return;
    }
    if (!sections) {
      alert('Cannot save, resume data is missing.');
      return;
    }
    try {
      const resumeRef = doc(db, 'resumes', currentUser.uid);
      await setDoc(resumeRef, { sections: sections });
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume: ', error);
      alert('Failed to save resume.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-semibold text-gray-700">Loading Resume Data...</h1>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen">
      <div className="my-6">
        <Banner />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-1 space-y-4">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {Array.isArray(sections) ? sections.map(({ id, title, content }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="p-4 bg-white dark:bg-transparent border rounded-lg shadow-sm"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setEditingSectionId(editingSectionId === id ? null : id)}
                          >
                            <span className="font-semibold dark:text-gray-100 text-gray-700 text-lg">{title}</span>
                            <span className="text-gray-500 dark:text-gray-300 text-xl">☰</span>
                          </div>
                          {editingSectionId === id && (
                            <div className="mt-4 border-t pt-1">
                              {renderSectionEditor({ id, content })}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  )) : (
                    <p>Error: Resume sections data is unavailable.</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {currentUser && (
            <button
              onClick={handleSaveResume}
              className="w-full px-4 py-2 font-semibold text-white dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Save Resume
            </button>
          )}
        </div>

        <div className="md:col-span-2">
          <PortfolioPreview />
        </div>

        <div className="md:col-span-3">
          <AiSuggestions />
        </div>

      </div> {/* End Grid */}
    </div>
  );
};

export default BuilderPage;