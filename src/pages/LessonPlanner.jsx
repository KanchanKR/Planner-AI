/* eslint-disable react/prop-types */
import LessonPlanForm from '../RequiredComponents/LessonPlanForm';
import LessonPlanGenerator from '../RequiredComponents/LessonPlanGenerator';

const LessonPlanner = ({ lessonDetails, setLessonDetails, lessonPlan, onLessonPlanGenerated }) => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Lesson Planner</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-1">
          <LessonPlanForm
            onGenerate={setLessonDetails}
            onLessonPlanGenerated={onLessonPlanGenerated}
          />
        </div>
        <div className="col-span-1">
          <LessonPlanGenerator
            lessonDetails={lessonDetails}
            lessonPlan={lessonPlan}
            onLessonPlanGenerated={onLessonPlanGenerated}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonPlanner;