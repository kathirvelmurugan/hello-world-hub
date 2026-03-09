import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background gap-8">
      <h1 className="text-6xl font-bold text-foreground text-center">Hello, World! 👋</h1>
      <Link 
        to="/alchemy" 
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity"
      >
        Go to Alchemy API Monitor
      </Link>
      <Link 
        to="/stargazers" 
        className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-bold hover:opacity-90 transition-opacity"
      >
        Go to Stargazers
      </Link>
    </div>
  );
};

export default Index;
