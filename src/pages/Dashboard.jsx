import { useEffect, useState } from 'preact/hooks';
import { clerk } from '../lib/clerk';
import { Code2, Users, Trophy, Calendar } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Clock, MapPin } from 'lucide-react';
import eventsData from '../data/events.json';
import projectsData from '../data/projects.json';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const checkUser = () => {
      setUser(clerk.user);
    };

    checkUser();

    // Listen for auth state changes
    const unsubscribe = clerk.addListener(checkUser);

    // Get upcoming events
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming = eventsData
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
    
    setUpcomingEvents(upcoming);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-16 px-4">
      {/* Welcome Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Welcome back, {user?.firstName || 'Koalition Member'}! 👋
        </h2>
        <p className="text-gray-400 text-lg">
          Ready to hack, code, and collaborate? Here's what's happening in the Koalition.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <Code2 className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{projectsData.length}</div>
            <div className="text-sm text-gray-400">Projects</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{upcomingEvents.length}</div>
            <div className="text-sm text-gray-400">Upcoming Events</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-sm text-gray-400">Members</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-sm text-gray-400">Hackathons Won</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        {/* Upcoming Events */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Events
              </h2>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <a href="/events">View All</a>
              </Button>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-md">
                    <h3 className="font-semibold text-white mb-2">{event.name}</h3>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(event.date)}
                      {event.time && (
                        <>
                          <Clock className="w-4 h-4 ml-3 mr-1" />
                          {event.time}
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <p className="text-sm text-gray-300">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No upcoming events</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Code2 className="w-5 h-5 mr-2" />
                Featured Projects
              </h2>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <a href="/projects">View All</a>
              </Button>
            </div>
            
            <div className="space-y-4">
              {projectsData.slice(0, 3).map((project, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-md">
                  <h3 className="font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">{project.description.substring(0, 100)}...</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs text-gray-400">+{project.techStack.length - 3} more</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline"
                    >
                      GitHub
                    </a>
                    {(project.devpostLink || project.doraLink) && (
                      <a 
                        href={project.devpostLink || project.doraLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline"
                      >
                        {project.devpostLink ? 'Devpost' : 'Dora'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800 max-w-6xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-black"
            >
              <a
                href="https://discord.gg/6GaWZAawUc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Discord
              </a>
            </Button>
            
            <Button
              variant="outline"
              asChild
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <a href="/my-projects">
                <Code2 className="w-4 h-4 mr-2" />
                My Projects
              </a>
            </Button>
            
            <Button
              variant="outline"
              asChild
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <a
                href="https://app.getriver.io/beta/duo-keyboard-koalition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Events Platform
              </a>
            </Button>
            
            <Button
              variant="outline"
              asChild
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <a
                href="https://github.com/orgs/Duo-Keyboard-Koalition/repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repos
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default Dashboard;