import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import LessonPlanner from './pages/LessonPlanner';
import About from './pages/About';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lessonDetails, setLessonDetails] = useState(null);
  const [lessonPlan, setLessonPlan] = useState('');

  useEffect(() => {
    const savedPlan = localStorage.getItem('lessonPlan');
    if (savedPlan) setLessonPlan(savedPlan);
  }, []);

  const handleLessonPlanGenerated = (plan) => {
    console.log('Generated Lesson Plan:', plan);
    setLessonPlan(plan);
    localStorage.setItem('lessonPlan', plan);
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLessonPlan('');
    localStorage.removeItem('lessonPlan');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sticky Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </div>

        {/* Main content with padding-top to avoid navbar overlap */}
        <main className="flex-grow pt-[80px] p-6">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route
              path="/login"
              element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/planner" />}
            />
            <Route
              path="/planner"
              element={
                isLoggedIn ? (
                  <LessonPlanner
                    lessonDetails={lessonDetails}
                    setLessonDetails={setLessonDetails}
                    lessonPlan={lessonPlan}
                    onLessonPlanGenerated={handleLessonPlanGenerated}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer flows naturally after main content */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;