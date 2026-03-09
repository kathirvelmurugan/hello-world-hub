import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background gap-8">
      <h1 className="text-6xl font-bold text-foreground text-center">Hello, World! 👋</h1>
      <Link 
        to="/alchemy" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition-colors"
      >
        Go to Alchemy API Monitor
      </Link>
    </div>
  );
};

export default Index;
