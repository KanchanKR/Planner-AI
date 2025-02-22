/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '../assets/photo.png'; // Adjust the filename as per your asset

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/planner');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Welcome to Planner-AI
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Create AI-powered lesson plans with ease. Log in to get started!
      </p>
      <img
        src={heroImage}
        alt="Planner-AI Hero"
        className="mx-auto w-full max-w-md rounded-lg shadow-md"
      />
      <Button
        onClick={handleGetStarted}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-lg"
      >
        Get Started
      </Button>
    </div>
  );
};

export default Home;