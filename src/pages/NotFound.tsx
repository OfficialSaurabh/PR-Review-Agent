import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    console.error(`404: Attempted to access non-existent route: ${location.pathname}`);
    setAttemptCount((prev) => prev + 1);
  }, [location.pathname]);

  const getSuggestedRoute = (path) => {
    const knownRoutes = ["/", "/about", "/contact", "/products"];
    const suggestions = knownRoutes.filter((route) =>
      route.includes(path)
    );

    return suggestions[0];
  };

  const suggestion = getSuggestedRoute(location.pathname);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          Oops! The page "{location.pathname}" was not found.
        </p>

        {suggestion ? (
          <p className="text-gray-700 mb-4">
            Did you mean{" "}
            <Link to={suggestion} className="text-blue-500 underline">
              {suggestion}
            </Link>
            ?
          </p>
        ) : (
          <p className="text-gray-500 mb-4">
            We couldn’t find a related page.
          </p>
        )}

        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>

        <p className="text-sm text-gray-400 mt-6">
          Attempts: {attemptCount}
        </p>
      </div>
    </main>
  );
};

export default NotFound;
