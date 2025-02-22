import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Button onClick={() => setIsDark(!isDark)} className="fixed top-4 right-4">
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default DarkModeToggle;