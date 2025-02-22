/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';

const LessonPlanPDF = ({ lessonPlan }) => {
  const generatePDF = () => {
    if (!lessonPlan) {
      alert('No lesson plan available to download. Please generate one first.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Lesson Plan', 20, 20);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(lessonPlan, 170);
    doc.text(lines, 20, 30);
    doc.save('Lesson_Plan.pdf');
  };

  return (
    <div className="mt-6">
      <div className="p-6 bg-gray-50 border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Lesson Plan Preview</h1>
        <div className="prose whitespace-pre-wrap mt-4 text-gray-700">
          {lessonPlan || 'No lesson plan generated yet.'}
        </div>
      </div>
      {lessonPlan ? (
        <Button
          onClick={generatePDF}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Download as PDF
        </Button>
      ) : (
        <Button disabled className="mt-4 w-full bg-gray-400 text-white">
          Download as PDF (Generate a lesson plan first)
        </Button>
      )}
    </div>
  );
};

export default LessonPlanPDF;