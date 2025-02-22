/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCRHclHdyMDpKOPRyW7_4dFyYs50DdenDM'); // Replace with your API key

const LessonPlanForm = ({ onGenerate, onLessonPlanGenerated }) => {
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [mainConcept, setMainConcept] = useState('');
  const [subtopics, setSubtopics] = useState('');
  const [materials, setMaterials] = useState('');
  const [objectives, setObjectives] = useState('');
  const [outline, setOutline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = { topic, gradeLevel, mainConcept, subtopics, materials, objectives, outline };

    if (!details.topic || !details.gradeLevel) {
      alert('Please provide at least a Topic and Grade Level.');
      return;
    }

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `
        Generate a detailed lesson plan for the topic "${details.topic}" at grade level ${details.gradeLevel}.
        Include the following sections:
        - Main Concept: ${details.mainConcept || 'Not provided'}
        - Subtopics: ${details.subtopics || 'Not provided'}
        - Materials Needed: ${details.materials || 'Not provided'}
        - Learning Objectives: ${details.objectives || 'Not provided'}
        - Lesson Outline: ${details.outline || 'Not provided'}
        - Suggested Classroom Activities
        - Assessment Questions
      `;
      const result = await model.generateContent(prompt);
      const generatedText = result.response.text().replace(/\*/g, ''); // Remove asterisks
      onGenerate(details);
      onLessonPlanGenerated(generatedText);
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      alert('Failed to generate lesson plan. Check API key and network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Lesson Plan</h2>
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic"
          className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        />
        <Input
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          placeholder="Grade Level"
          className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        />
        <Textarea
          value={mainConcept}
          onChange={(e) => setMainConcept(e.target.value)}
          placeholder="Main Concept"
          className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        />
        <Textarea
          value={subtopics}
          onChange={(e) => setSubtopics(e.target.value)}
          placeholder="Subtopics (one per line)"
          className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        />
        <Textarea
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          placeholder="Materials Needed"
          className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        />
        <Textarea
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          placeholder="Learning Objectives"
          className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        />
        <Textarea
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
          placeholder="Lesson Outline"
          className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          {loading ? 'Generating...' : 'Generate Lesson Plan'}
        </Button>
      </form>
    </Card>
  );
};

export default LessonPlanForm;