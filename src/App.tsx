import { useEffect, useState } from 'react';
  import AurovaLanding from "./components/AurovaLanding";
  import AuthRedirect from "./components/AuthRedirect";
  import Privacy from "./components/Privacy";
  import Terms from "./components/Terms";
  import Feedback from "./components/Feedback";

  function App() {
    const [currentPage, setCurrentPage] = useState<'home' | 'auth-redirect' | 'privacy' | 'terms' | 'feedback'>('home');

    useEffect(() => {
      const path = window.location.pathname;

      if (path === '/auth-redirect') {
        setCurrentPage('auth-redirect');
      } else if (path === '/privacy') {
        setCurrentPage('privacy');
      } else if (path === '/terms') {
        setCurrentPage('terms');
      } else if (path === '/feedback') {
        setCurrentPage('feedback');
      } else {
        setCurrentPage('home');
      }
    }, []);

    if (currentPage === 'auth-redirect') {
      return <AuthRedirect />;
    }

    if (currentPage === 'privacy') {
      return <Privacy />;
    }

    if (currentPage === 'terms') {
      return <Terms />;
    }

    if (currentPage === 'feedback') {
      return <Feedback />;
    }

    return <AurovaLanding />;
  }

  export default App;