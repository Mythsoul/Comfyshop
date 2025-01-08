import React, { useEffect, useState } from 'react';

const ProtectedComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/protected');
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <div>Please log in to view this content.</div>;
  }

  return <div>Protected Content</div>;
};

export default ProtectedComponent;