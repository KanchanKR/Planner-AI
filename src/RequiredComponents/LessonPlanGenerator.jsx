/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { jsPDF } from 'jspdf';

const LessonPlanGenerator = ({ lessonDetails, lessonPlan, onLessonPlanGenerated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);

  const LINES_PER_PAGE = 20;

  useEffect(() => {
    if (lessonPlan) {
      const lines = lessonPlan.split('\n');
      const paginated = [];
      for (let i = 0; i < lines.length; i += LINES_PER_PAGE) {
        paginated.push(lines.slice(i, i + LINES_PER_PAGE).join('\n'));
      }
      setPages(paginated);
      setCurrentPage(0);
    } else {
      setPages([]);
    }
  }, [lessonPlan]);

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const generatePDF = () => {
    if (!lessonPlan) {
      alert('No lesson plan available to download. Please generate one first.');
      return;
    }
  
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Lesson Plan', 20, 20); // Title on the first page
    doc.setFontSize(12);
  
    // Split the entire lesson plan into chunks that fit within the page width
    const lines = doc.splitTextToSize(lessonPlan, 170);
    
    // Track the vertical position on the page
    let y = 30;
  
    // Define the maximum height per page (accounting for margins)
    const maxPageHeight = doc.internal.pageSize.height - 30;
  
    lines.forEach((line) => {
      // If the current text exceeds the page height, add a new page
      if (y + 10 > maxPageHeight) {
        doc.addPage();
        y = 20; // Reset the vertical position for the new page
      }
      // Add the line of text to the PDF and increment the vertical position
      doc.text(line, 20, y);
      y += 10;
    });
  
    // Save the PDF with a filename
    doc.save('Lesson_Plan.pdf');
  };
  

  const renderContent = () => {
    if (isEditing) {
      return (
        <Textarea
          value={pages[currentPage]}
          onChange={(e) => {
            const newPageContent = e.target.value;
            const updatedPages = [...pages];
            updatedPages[currentPage] = newPageContent;
            const newPlan = updatedPages.join('\n');
            onLessonPlanGenerated(newPlan);
            setPages(updatedPages);
          }}
          className="w-full min-h-[300px] border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
        />
      );
    } else {
      const content = pages[currentPage].split('\n').map((line, index) => {
        if (line.trim().endsWith(':')) {
          return <p key={index} className="font-bold text-gray-800 dark:text-gray-200">{line}</p>;
        }
        return <p key={index} className="text-gray-700 dark:text-gray-300">{line}</p>;
      });
      return <div className="prose whitespace-pre-wrap">{content}</div>;
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full flex flex-col">
      <div className="flex-grow overflow-auto">
        {lessonDetails ? (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Inputs</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                <li><strong>Topic:</strong> {lessonDetails.topic}</li>
                <li><strong>Grade Level:</strong> {lessonDetails.gradeLevel}</li>
                {lessonDetails.mainConcept && <li><strong>Main Concept:</strong> {lessonDetails.mainConcept}</li>}
                {lessonDetails.subtopics && <li><strong>Subtopics:</strong> {lessonDetails.subtopics}</li>}
                {lessonDetails.materials && <li><strong>Materials:</strong> {lessonDetails.materials}</li>}
                {lessonDetails.objectives && <li><strong>Objectives:</strong> {lessonDetails.objectives}</li>}
                {lessonDetails.outline && <li><strong>Outline:</strong> {lessonDetails.outline}</li>}
              </ul>
            </div>
            {lessonPlan ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Generated Lesson Plan</h3>
                {renderContent()}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Waiting for lesson plan generation...</p>
            )}
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Fill out the form to generate a lesson plan.</p>
        )}
      </div>
      {lessonPlan && (
        <div className="mt-4 space-y-4 shrink-0">
          <div className="flex justify-between">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {isEditing ? 'Save Edits' : 'Edit Lesson Plan'}
            </Button>
            <Button
              onClick={generatePDF}
              className="bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Download as PDF
            </Button>
          </div>
          {pages.length > 1 && (
            <div className="flex justify-between items-center">
              <Button
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
              >
                <ChevronLeft className="mr-2" /> Previous
              </Button>
              <span className="text-gray-700 dark:text-gray-300">Page {currentPage + 1} of {pages.length}</span>
              <Button
                onClick={() => handlePageChange('next')}
                disabled={currentPage === pages.length - 1}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
              >
                Next <ChevronRight className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default LessonPlanGenerator;