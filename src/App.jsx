import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Search, TrendingUp, Users, Briefcase, BookOpen, X, Mail, Calendar, Award } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('startup');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data for startups
  const startups = [
    {
      id: 1,
      name: 'EduTech Solutions',
      domain: 'Education Technology',
      students: ['2021CS001', '2021CS045', '2021EC032'],
      studentNames: ['Amit Kumar', 'Priya Sharma', 'Rahul Verma'],
      contact: 'edutech@college.edu',
      description: 'AI-powered learning platform for personalized education experiences. Our solution uses machine learning algorithms to adapt to individual learning styles and provides real-time feedback to improve student outcomes.',
      startDate: 'January 2024',
      status: 'Active',
      fundingStage: 'Seed',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      name: 'GreenEnergy Systems',
      domain: 'Renewable Energy',
      students: ['2020EE023', '2020ME015'],
      studentNames: ['Neha Patel', 'Vikram Singh'],
      contact: 'greenenergy@college.edu',
      description: 'Solar panel optimization using machine learning algorithms to maximize energy output. We develop smart systems that predict weather patterns and adjust panel angles accordingly.',
      startDate: 'March 2024',
      status: 'Active',
      fundingStage: 'Pre-seed',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      name: 'HealthTrack',
      domain: 'Healthcare',
      students: ['2021IT012', '2021CS078', '2021IT089'],
      studentNames: ['Sneha Reddy', 'Arjun Malhotra', 'Kavya Iyer'],
      contact: 'healthtrack@college.edu',
      description: 'Wearable health monitoring system for chronic disease management. Our IoT-enabled devices track vital signs in real-time and alert users and healthcare providers of any anomalies.',
      startDate: 'February 2024',
      status: 'Active',
      fundingStage: 'Prototype',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop'
    }
  ];

  // Sample data for research
  const research = [
    {
      id: 1,
      name: 'Quantum Computing Applications',
      domain: 'Computer Science',
      students: ['2020CS010', '2020CS034'],
      studentNames: ['Rohan Khanna', 'Ananya Desai'],
      contact: 'quantum@college.edu',
      description: 'Exploring quantum algorithms for cryptography and their applications in securing modern communication systems. This research aims to develop post-quantum cryptographic solutions.',
      type: 'under_prof',
      professor: 'Dr. Rajesh Sharma',
      professorDept: 'Computer Science',
      startDate: 'August 2023',
      status: 'Ongoing',
      publications: 2,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      name: 'Sustainable Materials Research',
      domain: 'Materials Science',
      students: ['2019ME005', '2019ME017', '2020ME023'],
      studentNames: ['Karan Mehta', 'Divya Nair', 'Aditya Joshi'],
      contact: 'materials@college.edu',
      description: 'Development of biodegradable polymers for packaging industries. Our research focuses on creating eco-friendly alternatives to traditional plastics using natural materials.',
      type: 'under_prof',
      professor: 'Prof. Meena Kumar',
      professorDept: 'Mechanical Engineering',
      startDate: 'June 2023',
      status: 'Ongoing',
      publications: 3,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      name: 'Neural Network Optimization',
      domain: 'AI/ML',
      students: ['2021CS091'],
      studentNames: ['Ishaan Gupta'],
      contact: 'neural@college.edu',
      description: 'Novel approaches to reducing training time in deep learning models while maintaining accuracy. This independent research explores new optimization techniques and architecture designs.',
      type: 'own',
      professor: null,
      professorDept: null,
      startDate: 'October 2023',
      status: 'Ongoing',
      publications: 1,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'
    }
  ];

  // Chart data
  const domainData = [
    { name: 'CS/IT', value: 35 },
    { name: 'Healthcare', value: 20 },
    { name: 'Energy', value: 15 },
    { name: 'Education', value: 18 },
    { name: 'Others', value: 12 }
  ];

  const monthlyData = [
    { month: 'Jan', startups: 4, research: 6 },
    { month: 'Feb', startups: 6, research: 8 },
    { month: 'Mar', startups: 8, research: 10 },
    { month: 'Apr', startups: 10, research: 12 },
    { month: 'May', startups: 12, research: 15 }
  ];

  const COLORS = ['#0369a0', '#bfe0fd', '#fdfad8', '#60a5fa', '#93c5fd'];

  const currentData = activeTab === 'startup' ? startups : research;
  const filteredData = currentData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-[#121212]">College Innovation Hub</h1>
          <p className="text-gray-600 mt-1">Track ongoing research projects and startups</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#0369a0] to-[#0284c7] rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Startups</p>
                <p className="text-3xl font-bold mt-2">{startups.length}</p>
              </div>
              <Briefcase className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#bfe0fd] to-[#dbeafe] rounded-xl p-6 text-[#121212] shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">Research Projects</p>
                <p className="text-3xl font-bold mt-2">{research.length}</p>
              </div>
              <BookOpen className="w-12 h-12 text-[#0369a0]" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#fdfad8] to-[#fef9c3] rounded-xl p-6 text-[#121212] shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">Students Involved</p>
                <p className="text-3xl font-bold mt-2">47</p>
              </div>
              <Users className="w-12 h-12 text-[#0369a0]" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-[#121212] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#0369a0]" />
              Monthly Growth Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Bar dataKey="startups" fill="#0369a0" name="Startups" />
                <Bar dataKey="research" fill="#bfe0fd" name="Research" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-[#121212] mb-4">Domain Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('startup')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                  activeTab === 'startup'
                    ? 'border-b-2 border-[#0369a0] text-[#0369a0] bg-[#bfe0fd]/10'
                    : 'text-gray-600 hover:text-[#0369a0] hover:bg-gray-50'
                }`}
              >
                <Briefcase className="w-5 h-5 inline mr-2" />
                Startups
              </button>
              <button
                onClick={() => setActiveTab('research')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                  activeTab === 'research'
                    ? 'border-b-2 border-[#0369a0] text-[#0369a0] bg-[#bfe0fd]/10'
                    : 'text-gray-600 hover:text-[#0369a0] hover:bg-gray-50'
                }`}
              >
                <BookOpen className="w-5 h-5 inline mr-2" />
                Research Projects
              </button>
            </div>
          </div>

          {/* Search and Add */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}s...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0369a0] focus:border-transparent outline-none"
                />
              </div>
              <button className="bg-[#0369a0] text-white px-6 py-2 rounded-lg hover:bg-[#025a8a] transition-colors flex items-center justify-center gap-2 font-medium">
                <Plus className="w-5 h-5" />
                Add New
              </button>
            </div>
          </div>

          {/* Content Cards Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer bg-white hover:border-[#0369a0]/50 group"
                >
                  {/* Image Holder */}
                  <div className="w-full h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#121212] mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    
                    <span className="inline-block bg-[#bfe0fd] text-[#0369a0] text-xs px-3 py-1 rounded-full font-medium mb-3">
                      {item.domain}
                    </span>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">
                          {activeTab === 'startup' ? 'Team Members:' : 'Researchers:'}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.studentNames.slice(0, 2).map((name, idx) => (
                            <span key={idx} className="text-xs bg-[#fdfad8] text-[#121212] px-2 py-1 rounded">
                              {name}
                            </span>
                          ))}
                          {item.studentNames.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              +{item.studentNames.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {activeTab === 'research' && item.type === 'under_prof' && (
                        <div>
                          <p className="text-xs text-gray-600 font-medium mb-1">Under Professor:</p>
                          <p className="text-sm text-[#0369a0] font-medium">{item.professor}</p>
                        </div>
                      )}

                      {activeTab === 'research' && item.type === 'own' && (
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Independent Research</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No {activeTab}s found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header with Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-[#121212] mb-2">{selectedItem.name}</h2>
                  <span className="inline-block bg-[#bfe0fd] text-[#0369a0] text-sm px-4 py-1 rounded-full font-medium">
                    {selectedItem.domain}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Contact */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-[#0369a0]" />
                    <h3 className="font-semibold text-gray-700">Contact</h3>
                  </div>
                  <p className="text-[#0369a0] font-medium">{selectedItem.contact}</p>
                </div>

                {/* Start Date */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-[#0369a0]" />
                    <h3 className="font-semibold text-gray-700">Started</h3>
                  </div>
                  <p className="text-gray-700">{selectedItem.startDate}</p>
                </div>

                {/* Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-[#0369a0]" />
                    <h3 className="font-semibold text-gray-700">Status</h3>
                  </div>
                  <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    {selectedItem.status}
                  </span>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#0369a0]" />
                    <h3 className="font-semibold text-gray-700">
                      {activeTab === 'startup' ? 'Funding Stage' : 'Publications'}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {activeTab === 'startup' ? selectedItem.fundingStage : `${selectedItem.publications} Published`}
                  </p>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  {activeTab === 'startup' ? 'Team Members' : 'Research Team'}
                </h3>
                <div className="space-y-2">
                  {selectedItem.studentNames.map((name, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#fdfad8] rounded-lg p-3">
                      <span className="font-medium text-[#121212]">{name}</span>
                      <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                        {selectedItem.students[idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professor Info for Research */}
              {activeTab === 'research' && selectedItem.type === 'under_prof' && (
                <div className="bg-[#bfe0fd]/30 rounded-lg p-5 border-l-4 border-[#0369a0]">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Supervised By
                  </h3>
                  <p className="text-lg font-bold text-[#0369a0]">{selectedItem.professor}</p>
                  <p className="text-sm text-gray-600">{selectedItem.professorDept} Department</p>
                </div>
              )}

              {activeTab === 'research' && selectedItem.type === 'own' && (
                <div className="bg-[#fdfad8] rounded-lg p-5 border-l-4 border-yellow-500">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                    Independent Research
                  </h3>
                  <p className="text-sm text-gray-600">Self-guided research project</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;