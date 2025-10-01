import { useEffect, useState } from 'react';
  import AurovaLanding from "./components/AurovaLanding";
  import AuthRedirect from "./components/AuthRedirect";

  function App() {
    const [isAuthRedirect, setIsAuthRedirect] = useState(false);

    useEffect(() => {
      if (window.location.pathname === '/auth-redirect') {
        setIsAuthRedirect(true);
      }
    }, []);

    if (isAuthRedirect) {
      return <AuthRedirect />;
    }

    return <AurovaLanding />;
  }

  export default App;