import { Button } from "antd";
import { AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Oops! Page not found
            </h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full bg-blue-600 h-[45px] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>

            <Button
              onClick={() => {
                window.history.back();
              }}
              className="h-[45px] w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go Back
            </Button>
          </div>

          {/* <div className="mt-8 text-sm text-gray-500">
            <p>
              Need help?{" "}
              <Link to="/contact" className="text-blue-600 hover:underline">
                Contact support
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Errorpage;
