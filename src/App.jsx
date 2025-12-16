import React, { useState, useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend, ScatterChart, Scatter, ZAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Label, LineChart, Line
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import AboutPopup from "./About";
import StatsCard from "./StatsCard";
import { Search, TrendingUp, Filter, Activity, Hexagon, Layers, Download, CheckCircle } from "lucide-react";

// --- IMPORT DATA ---
import { startups, research } from "./data";

const App = () => {
  const [activeTab, setActiveTab] = useState("startup");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const COLORS = ["#0D47A1", "#1976D2", "#42A5F5", "#90CAF9", "#E3F2FD"];
  const currentData = activeTab === "startup" ? startups : research;

  // --- HELPER FUNCTIONS ---

  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  // CSV Export Function
  const downloadCSV = () => {
    const headers = ["ID", "Name", "Domain", "Status", "Funding/Type", "Students", "Contact"];
    
    const rows = filteredData.map(item => [
      item.id,
      `"${item.name}"`, 
      `"${item.domain}"`,
      item.status,
      activeTab === 'startup' ? item.fundingStage : item.type,
      `"${item.studentNames.join(', ')}"`,
      item.contact
    ]);

    const csvContent = [
      headers.join(","), 
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeTab}_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Report downloaded successfully!");
  };

  // --- ANALYTICS DATA PREPARATION ---

  // 1. Double Line Chart Data (Comparison)
  const comparisonData = useMemo(() => {
    const dataByYear = {};
    
    // Helper to aggregate counts
    const processData = (dataset, key) => {
        dataset.forEach(item => {
            const year = item.startDate.split(' ')[1];
            if (!dataByYear[year]) dataByYear[year] = { year, startup: 0, research: 0 };
            dataByYear[year][key] += 1;
        });
    };

    processData(startups, 'startup');
    processData(research, 'research');

    // Convert object to sorted array
    return Object.values(dataByYear).sort((a, b) => a.year - b.year);
  }, []);

  // 2. Scatter Plot: Impact vs Duration
  const scatterData = useMemo(() => {
    return currentData.map(item => {
      const start = new Date(item.startDate);
      const now = new Date();
      const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
      
      let traction = 0;
      if (activeTab === 'startup') {
         const stages = { "Series A": 90, "Seed": 70, "Grant": 50, "Pre-seed": 40, "Bootstrapped": 30, "Idea Phase": 10 };
         traction = stages[item.fundingStage] || 20;
      } else {
         traction = (item.publications * 20) + 20;
      }
      const jitter = Math.floor(Math.random() * 10) - 5; 

      return {
        id: item.id,
        name: item.name,
        x: Math.max(1, months),
        y: traction + jitter,
        z: 1 
      };
    });
  }, [currentData, activeTab]);

  // 3. Radar Chart: Ecosystem Shape
  const radarData = useMemo(() => {
    const domainMetrics = {};
    currentData.forEach(item => {
       const domain = item.domain.split(" ")[0];
       if (!domainMetrics[domain]) domainMetrics[domain] = { count: 0, traction: 0 };
       
       let traction = 0;
       if (activeTab === 'startup') {
         const stages = { "Series A": 5, "Seed": 4, "Grant": 3, "Pre-seed": 2, "Bootstrapped": 1, "Idea Phase": 1 };
         traction = stages[item.fundingStage] || 1;
       } else {
         traction = item.publications + 1;
       }

       domainMetrics[domain].count += 1;
       domainMetrics[domain].traction += traction;
    });

    return Object.keys(domainMetrics).slice(0, 5).map(domain => ({
        subject: domain,
        A: domainMetrics[domain].count * 20, 
        B: domainMetrics[domain].traction * 10,
        fullMark: 100
    }));
  }, [currentData, activeTab]);

  // 4. Bar Chart (Existing)
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

  const uniqueStatuses = useMemo(() => ["All", ...new Set(currentData.map(i => i.status))], [currentData]);

  const filteredData = currentData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-[#0D47A1] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-[#0D47A1]/95 backdrop-blur-md text-white px-6 py-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
                <img
                    src="https://raw.githubusercontent.com/A-nshuman/DVPD_Dashboard/refs/heads/main/src/assets/logo_250.png"
                    alt="Logo"
                    className="w-9 h-9 object-contain"
                />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">College Innovation Hub</h1>
        </div>
        <button 
            onClick={() => setAboutOpen(true)} 
            className="bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2 rounded-full transition-all text-sm font-medium backdrop-blur-sm shadow-sm"
        >
          Dev Team
        </button>
      </header>

      {/* DASHBOARD LAYOUT */}
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6">
        
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <StatsCard title="Total Projects" value={currentData.length} gradient="bg-gradient-to-br from-blue-600 to-blue-800" />
             <StatsCard title="Active Students" value="42" gradient="bg-gradient-to-br from-indigo-500 to-indigo-700" />
             <StatsCard title="Total Funding" value="₹ 4.5 Cr" gradient="bg-gradient-to-br from-cyan-500 to-cyan-700" />
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-center items-center cursor-pointer hover:shadow-md transition-all" onClick={() => setActiveTab(activeTab === 'startup' ? 'research' : 'startup')}>
                <p className="text-sm text-gray-500 font-medium">Current View</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xl font-bold ${activeTab === 'startup' ? 'text-blue-600' : 'text-purple-600'}`}>
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s
                    </span>
                    <Activity size={18} className="text-gray-400" />
                </div>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN: Main Charts */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* 1. SCATTER PLOT (Impact Matrix) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Layers size={18} className="text-[#0D47A1]"/> 
                            Impact Matrix (Duration vs. Traction)
                        </h3>
                    </div>
                    <div className="p-4 h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis type="number" dataKey="x" name="Duration" unit=" mos" tick={{fontSize: 12}}>
                                    <Label value="Duration (Months)" offset={-10} position="insideBottom" style={{ fontSize: '12px', fill: '#666' }} />
                                </XAxis>
                                <YAxis type="number" dataKey="y" name="Traction" unit=" pts" tick={{fontSize: 12}}>
                                    <Label value="Traction Score" angle={-90} position="insideLeft" style={{ fontSize: '12px', fill: '#666' }} />
                                </YAxis>
                                <ZAxis type="number" dataKey="z" range={[60, 400]} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                                <Legend verticalAlign="top" height={36}/>
                                <Scatter name="Projects" data={scatterData} fill="#0D47A1" fillOpacity={0.7} shape="circle" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. DOUBLE LINE CHART (Timeline Comparison) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp size={18} className="text-[#0D47A1]"/> 
                            Growth Trends (Comparison)
                        </h3>
                    </div>
                    <div className="p-4 h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend verticalAlign="top" height={36} iconType="plainline"/>
                                <Line 
                                    type="monotone" 
                                    dataKey="startup" 
                                    name="Startups" 
                                    stroke="#0D47A1" 
                                    strokeWidth={3} 
                                    dot={{r: 4, fill: '#0D47A1'}}
                                    activeDot={{r: 6}}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="research" 
                                    name="Research" 
                                    stroke="#00D1FD" 
                                    strokeWidth={3} 
                                    dot={{r: 4, fill: '#00D1FD'}}
                                    activeDot={{r: 6}}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: Secondary Charts */}
            <div className="space-y-6">
                
                {/* 3. RADAR CHART (Ecosystem Shape) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm uppercase tracking-wider font-bold mb-4 text-gray-500 flex items-center gap-2">
                        <Hexagon size={16} className="text-[#0D47A1]" /> Ecosystem Focus
                    </h3>
                    <div className="h-[250px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#E5E7EB" />
                                <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#6B7280'}} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Volume" dataKey="A" stroke="#0D47A1" strokeWidth={2} fill="#0D47A1" fillOpacity={0.4} />
                                <Radar name="Quality" dataKey="B" stroke="#00D1FD" strokeWidth={2} fill="#00D1FD" fillOpacity={0.2} />
                                <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
                                <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. PIE CHART (Distribution) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm uppercase tracking-wider font-bold mb-4 text-gray-500">Distribution</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={barChartData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {barChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                                <Legend 
                                    verticalAlign="bottom" 
                                    height={36} 
                                    iconType="circle" 
                                    iconSize={8}
                                    layout="horizontal"
                                    wrapperStyle={{fontSize: '11px'}} 
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>

        {/* SEARCH & FILTER LIST */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
             <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 bg-gray-50/50 rounded-t-2xl">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}s...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D47A1]/20 focus:border-[#0D47A1] outline-none transition-all"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    {/* Filter Dropdown */}
                    <div className="relative min-w-[140px]">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D47A1]/20 outline-none appearance-none cursor-pointer text-sm font-medium"
                        >
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    {/* Export Button */}
                    <button 
                      onClick={downloadCSV}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:text-[#0D47A1] hover:border-[#0D47A1]/30 transition-all font-medium text-sm whitespace-nowrap"
                      title="Export to CSV"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Export</span>
                    </button>
                  </div>
             </div>

             <div className="p-4 space-y-3 bg-gray-50/30 flex-1">
                <AnimatePresence mode="popLayout">
                    {filteredData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                            <ProjectCard item={item} onClick={setSelectedItem} />
                        </motion.div>
                    ))}
                </AnimatePresence>
             </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ProjectModal item={selectedItem} activeTab={activeTab} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
       
      <AboutPopup isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />

      {/* TOAST NOTIFICATION */}
      <div className={`fixed bottom-6 right-6 transform transition-all duration-300 z-50 ${toast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {toast && (
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
            <div className="bg-green-500 rounded-full p-1">
              <CheckCircle size={16} className="text-white" />
            </div>
            <span className="font-medium">{toast.message}</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default App;