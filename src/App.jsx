import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthWrapper from './components/AuthWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyProjects from './pages/MyProjects';
import Projects from './pages/Projects';
import Events from './pages/Events';
import EventDate from './pages/EventDate';
import Auth from './pages/Auth';

function App() {
  const handleDiscordJoin = () => {
    window.open('https://discord.gg/6GaWZAawUc', '_blank');
  };

  return (
    <AuthWrapper>
      <Router>
        <div className="min-h-screen flex flex-col bg-black text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:date" element={<EventDate />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-projects" 
                element={
                  <ProtectedRoute>
                    <MyProjects />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer handleDiscordJoin={handleDiscordJoin} />
        </div>
      </Router>
    </AuthWrapper>
  );
}

export default App;