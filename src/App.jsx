import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Legend
} from "recharts";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import AboutPopup from "./About";
import StatsCard from "./StatsCard";
import { Search, TrendingUp, BarChart2 } from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("startup");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  // --- Sample data (Same as provided) ---
  const startups = [
    { id: 1, name: "MediCare AI", domain: "HealthTech", studentNames: ["Sanya Gupta"], students: ["2021BT012"], contact: "medicare@college.edu", description: "Early disease detection...", startDate: "February 2024", status: "Active", fundingStage: "Grant", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop" },
    { id: 2, name: "FinWise", domain: "FinTech", studentNames: ["Arjun Das"], students: ["2020CS055"], contact: "finwise@college.edu", description: "Micro-investment platform...", startDate: "April 2024", status: "In Progress", fundingStage: "Bootstrapped", image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=400&h=250&fit=crop" },
    { id: 3, name: "AgriDrone", domain: "AgriTech", studentNames: ["Manish Tiwari"], students: ["2021ME044"], contact: "agridrone@college.edu", description: "Autonomous drones...", startDate: "January 2024", status: "Active", fundingStage: "Seed", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&h=250&fit=crop" },
    { id: 4, name: "CyberShield", domain: "Cybersecurity", studentNames: ["Aditya Joshi"], students: ["2020CS088"], contact: "cybershield@college.edu", description: "Vulnerability scanner...", startDate: "May 2024", status: "Active", fundingStage: "Pre-seed", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop" },
    { id: 5, name: "EcoPack", domain: "Sustainability", studentNames: ["Pooja Iyer"], students: ["2021CH015"], contact: "ecopack@college.edu", description: "Biodegradable packaging...", startDate: "December 2023", status: "Active", fundingStage: "Grant", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?w=400&h=250&fit=crop" },
    { id: 6, name: "FitTrack", domain: "Wellness", studentNames: ["Varun Kapoor"], students: ["2022CS019"], contact: "fittrack@college.edu", description: "Wearable device...", startDate: "June 2024", status: "In Progress", fundingStage: "Bootstrapped", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=250&fit=crop" },
    { id: 7, name: "RoboAssist", domain: "Robotics", studentNames: ["Karan Singh"], students: ["2020EC091"], contact: "roboassist@college.edu", description: "Robotic arms...", startDate: "November 2023", status: "Completed", fundingStage: "Series A", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop" },
    { id: 8, name: "UrbanCommute", domain: "Transportation", studentNames: ["Riya Deshmukh"], students: ["2021CE018"], contact: "urbancommute@college.edu", description: "Ride-sharing app...", startDate: "July 2024", status: "Active", fundingStage: "Pre-seed", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=250&fit=crop" },
    { id: 9, name: "SmartHome IO", domain: "IoT", studentNames: ["Tarun Bhatia"], students: ["2021EC050"], contact: "smarthome@college.edu", description: "Modular IoT system...", startDate: "March 2024", status: "Active", fundingStage: "Bootstrapped", image: "https://images.unsplash.com/photo-1558002038-1091a1661116?w=400&h=250&fit=crop" },
    { id: 10, name: "LangBridge", domain: "EdTech", studentNames: ["Aryan Saxena"], students: ["2022BA002"], contact: "langbridge@college.edu", description: "Translation tool...", startDate: "August 2024", status: "Idea Phase", fundingStage: "None", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=250&fit=crop" },
  ];

  const research = [
    { id: 1, name: "Quantum Computing", domain: "Computer Science", studentNames: ["Rohan"], students: ["2020CS010"], contact: "quantum@college.edu", description: "Quantum algorithms...", startDate: "August 2023", status: "Ongoing", type: "under_prof", professor: "Dr. Sharma", publications: 2, image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop" },
    { id: 2, name: "Glaucoma Detection", domain: "Biomedical", studentNames: ["Ishaan"], students: ["2021BM005"], contact: "biomed@college.edu", description: "CNN detection...", startDate: "January 2024", status: "Ongoing", type: "under_prof", professor: "Dr. Iyer", publications: 1, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop" },
    { id: 3, name: "Sustainable Concrete", domain: "Civil", studentNames: ["Arjun"], students: ["2020CE045"], contact: "green@college.edu", description: "Concrete mixtures...", startDate: "September 2023", status: "Completed", type: "grant_funded", professor: "Dr. Gill", publications: 3, image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2ac6?w=400&h=250&fit=crop" },
    { id: 4, name: "Swarm Robotics", domain: "Robotics", studentNames: ["Vikram"], students: ["2021RA002"], contact: "swarm@college.edu", description: "Swarm intelligence...", startDate: "March 2023", status: "Ongoing", type: "under_prof", professor: "Dr. Kulkarni", publications: 0, image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" },
    { id: 5, name: "Supply Chain Blockchain", domain: "IT", studentNames: ["Neha"], students: ["2020IT088"], contact: "crypto@college.edu", description: "Hyperledger Fabric...", startDate: "November 2023", status: "Ongoing", type: "independent", professor: "Prof. Roy", publications: 1, image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=250&fit=crop" },
    { id: 6, name: "Perovskite Solar", domain: "Material Science", studentNames: ["Karan"], students: ["2022MS004"], contact: "solar@college.edu", description: "Solar cells...", startDate: "February 2024", status: "Ongoing", type: "under_prof", professor: "Dr. Thomas", publications: 0, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop" },
    { id: 7, name: "Regional NLP", domain: "Computer Science", studentNames: ["Manoj"], students: ["2020CS102"], contact: "nlp@college.edu", description: "Translation model...", startDate: "August 2022", status: "Published", type: "grant_funded", professor: "Dr. Venkataraman", publications: 4, image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop" },
    { id: 8, name: "Microplastics", domain: "Env Science", studentNames: ["Riya"], students: ["2021ES033"], contact: "water@college.edu", description: "Microplastics...", startDate: "June 2023", status: "Completed", type: "under_prof", professor: "Dr. Siddiqui", publications: 2, image: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?w=400&h=250&fit=crop" },
    { id: 9, name: "Smart Grid", domain: "Electrical", studentNames: ["Devendra"], students: ["2020EE014"], contact: "grid@college.edu", description: "Load balancing...", startDate: "October 2023", status: "Ongoing", type: "under_prof", professor: "Prof. Das", publications: 1, image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop" },
    { id: 10, name: "CRISPR Drought", domain: "Biotech", studentNames: ["Tara"], students: ["2021BT007"], contact: "genetics@college.edu", description: "Rice plants...", startDate: "January 2023", status: "Ongoing", type: "under_prof", professor: "Dr. Gupta", publications: 2, image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=250&fit=crop" },
    { id: 11, name: "Drone Aerodynamics", domain: "Aerospace", studentNames: ["Sameer"], students: ["2022AE019"], contact: "aero@college.edu", description: "CFD analysis...", startDate: "April 2024", status: "Just Started", type: "independent", professor: "Dr. D'Souza", publications: 0, image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&h=250&fit=crop" },
  ];

  const COLORS = ["#00D1FD", "#00A5EA", "#1370CE", "#004792", "#535E97"];
  const currentData = activeTab === "startup" ? startups : research;

  // --- DATA PROCESSING FOR CHARTS ---

  // 1. Timeline Data (Group by Year)
  const timelineData = useMemo(() => {
    const counts = {};
    currentData.forEach(item => {
      const year = item.startDate.split(' ')[1]; // Extract Year
      counts[year] = (counts[year] || 0) + 1;
    });
    return Object.keys(counts).sort().map(year => ({
      year,
      count: counts[year]
    }));
  }, [currentData]);

  // 2. Bar Chart Data (Funding for Startups, Type for Research)
  const barChartData = useMemo(() => {
    const counts = {};
    currentData.forEach(item => {
      const key = activeTab === 'startup' ? item.fundingStage : item.type.replace('_', ' ');
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: counts[key]
    }));
  }, [currentData, activeTab]);

  // 3. Domain Data (Existing)
  const domainData = useMemo(() => {
    const counts = {};
    currentData.forEach(item => {
      // Simple grouping for demo
      let domain = item.domain.split(' ')[0]; 
      counts[domain] = (counts[domain] || 0) + 1;
    });
    // Take top 5 for cleaner chart
    return Object.keys(counts).slice(0, 5).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [currentData]);

  const filteredData = currentData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-text">
      {/* HEADER */}
      <header className="bg-[#0D47A1] text-white p-6 flex items-center justify-between relative overflow-visible z-20">
        <h1 className="text-xl sm:text-2xl font-bold">College Innovation Hub</h1>
        {/* <div className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 w-[150px] h-16 bg-[#0D47A1] rounded-b-[10000px]" /> */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10">
          <img
            src="https://raw.githubusercontent.com/A-nshuman/DVPD_Dashboard/refs/heads/main/src/assets/logo_250.png"
            alt="Logo"
            className="w-20 h-20 object-contain rounded-full bg-none"
          />
        </div>
        <button onClick={() => setAboutOpen(true)} className="bg-white text-[#0D47A1] px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer font-semibold">
          About
        </button>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 mt-6">
        
        {/* LEFT SIDEBAR (Navigation) */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md border p-4 sticky top-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Category</h3>
            <div className="space-y-2">
              {["startup", "research"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center justify-between ${
                    activeTab === tab
                      ? "bg-[#0D47A1] text-white shadow-lg"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && <span className="w-2 h-2 bg-white rounded-full"></span>}
                </button>
              ))}
            </div>
            
            {/* Mini Summary in Left Sidebar */}
            <div className="mt-8 pt-6 border-t">
               <div className="text-sm text-gray-500 mb-2">Active {activeTab === 'startup' ? 'Funded' : 'Grants'}</div>
               <div className="text-3xl font-bold text-[#0D47A1]">
                 {activeTab === 'startup' ? '₹ 45L+' : '₹ 1.2Cr'}
               </div>
               <div className="text-xs text-green-600 mt-1 flex items-center">
                 <TrendingUp size={12} className="mr-1"/> +12% from last year
               </div>
            </div>
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <main className="flex-1 min-w-0">
          
          {/* VISUALIZATION: TRENDS (AREA CHART) */}
          <div className="bg-white rounded-xl shadow-md border mb-6 overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <TrendingUp size={18} className="text-[#0D47A1]"/> 
                    Innovation Timeline (Projects Started)
                </h3>
            </div>
            <div className="p-4 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                        <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0D47A1" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#0D47A1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area type="monotone" dataKey="count" stroke="#0D47A1" fillOpacity={1} fill="url(#colorCount)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* LIST SECTION */}
          <div className="bg-white rounded-xl shadow-md border">
            <div className="p-4 border-b flex items-center gap-4 bg-gray-50 rounded-t-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}s by name or domain...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-[#0D47A1] outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="p-4 space-y-4">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <ProjectCard
                    key={item.id}
                    item={item}
                    onClick={setSelectedItem}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-gray-400" size={24}/>
                    </div>
                    <p className="text-gray-500">No {activeTab}s found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR (Analytics) */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
          
          {/* VISUALIZATION: BAR CHART (Funding/Type) */}
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BarChart2 size={18} className="text-[#0D47A1]" />
                {activeTab === 'startup' ? 'Funding Stages' : 'Project Types'}
            </h3>
            <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={barChartData} margin={{ left: 0, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 11}} interval={0}/>
                        <Tooltip cursor={{fill: '#f3f4f6'}} />
                        <Bar dataKey="value" fill="#0D47A1" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* VISUALIZATION: PIE CHART (Domains) */}
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h3 className="text-lg font-semibold mb-2">Domain Distribution</h3>
            <div className="h-[220px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={domainData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {domainData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={50} iconType="circle" iconSize={8} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-6">
                 <div className="text-2xl font-bold text-gray-800">{currentData.length}</div>
                 <div className="text-xs text-gray-500 uppercase tracking-wide">Total</div>
              </div>
            </div>
          </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatsCard
                title="Total"
                value={currentData.length}
                gradient="bg-gradient-to-br from-[#0D47A1] to-[#1e88e5]"
              />
               <StatsCard
                title="Students"
                value="47"
                gradient="bg-gradient-to-br from-[#1e88e5] to-[#64b5f6]"
              />
            </div>

        </aside>
      </div>

      {/* MODALS */}
      <ProjectModal
        item={selectedItem}
        activeTab={activeTab}
        onClose={() => setSelectedItem(null)}
      />
       
      <AboutPopup 
        isOpen={aboutOpen} 
        onClose={() => setAboutOpen(false)} 
      />
    </div>
  );
};

export default App;
