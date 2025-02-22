/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'demouser@gmail.com' && password === 'demopass') {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
          Welcome to Planner-AI
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Log in to create your lesson plans
        </p>
        <div className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;