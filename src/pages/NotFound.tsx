import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-sceen flex items-cnter justifycenter bggray-100">
  <div className="textcenter">
    <h1 className="text4xl fontbold mb-4">404</h1>
    <p className="text-xl textgray-600 mb4">Oops! Page not found</p>
    <a href="/home" className="text-blue500 hovertext-blue700 underlin">
      Return Home Page
    </a>
  </div>
</div>

  );
};

export default NotFound;
