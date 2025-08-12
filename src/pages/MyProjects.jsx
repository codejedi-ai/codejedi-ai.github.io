import { useEffect, useState } from 'preact/hooks';
import { clerk } from '../lib/clerk';
import { Plus, Code2, ExternalLink, Calendar, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

function MyProjects() {
  const [user, setUser] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveLink: '',
    status: 'in-progress'
  });

  useEffect(() => {
    const checkUser = () => {
      setUser(clerk.user);
      // Load user projects from localStorage (in a real app, this would be from a database)
      const savedProjects = localStorage.getItem(`projects_${clerk.user?.id}`);
      if (savedProjects) {
        setUserProjects(JSON.parse(savedProjects));
      }
    };

    checkUser();

    // Listen for auth state changes
    const unsubscribe = clerk.addListener(checkUser);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const saveProjects = (projects) => {
    if (user?.id) {
      localStorage.setItem(`projects_${user.id}`, JSON.stringify(projects));
      setUserProjects(projects);
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.description.trim()) return;

    const project = {
      id: Date.now(),
      ...newProject,
      techStack: newProject.techStack.split(',').map(tech => tech.trim()).filter(tech => tech),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedProjects = [...userProjects, project];
    saveProjects(updatedProjects);
    
    setNewProject({
      name: '',
      description: '',
      techStack: '',
      githubLink: '',
      liveLink: '',
      status: 'in-progress'
    });
    setShowAddForm(false);
  };

  const handleDeleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = userProjects.filter(p => p.id !== projectId);
      saveProjects(updatedProjects);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'planning': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Projects</h2>
            <p className="text-gray-400">
              Track and manage your personal coding projects
            </p>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary hover:bg-primary/90 text-black mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        {/* Add Project Form */}
        {showAddForm && (
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Add New Project</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="My Awesome Project"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe what your project does..."
                    rows="3"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="React, Node.js, MongoDB (comma separated)"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub Link
                    </label>
                    <input
                      type="url"
                      value={newProject.githubLink}
                      onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Live Demo Link
                    </label>
                    <input
                      type="url"
                      value={newProject.liveLink}
                      onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://myproject.com"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-black"
                  >
                    Add Project
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Projects Grid */}
        {userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProjects.map((project) => (
              <Card key={project.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.techStack.map((tech, index) => (
                        <span key={index} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-400 mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.githubLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Code2 className="w-3 h-3 mr-1" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.liveLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8 text-center">
              <Code2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
              <p className="text-gray-400 mb-6">
                Start tracking your coding projects and showcase your work to the community.
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-primary hover:bg-primary/90 text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

export default MyProjects;