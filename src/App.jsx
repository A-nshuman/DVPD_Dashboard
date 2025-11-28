import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import AboutPopup from "./About"; // Assumes file is named About.jsx based on your first snippet
import StatsCard from "./StatsCard";
import { Search } from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("startup");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  // --- Sample data ---
  const startups = [
    {
      id: 1,
      name: "EduTech Solutions",
      domain: "Education Technology",
      studentNames: ["Amit Kumar", "Priya Sharma", "Rahul Verma"],
      students: ["2021CS001", "2021CS045", "2021EC032"],
      contact: "edutech@college.edu",
      description:
        "AI-powered learning platform for personalized education experiences.",
      startDate: "January 2024",
      status: "Active",
      fundingStage: "Seed",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      name: "GreenEnergy Systems",
      domain: "Renewable Energy",
      studentNames: ["Neha Patel", "Vikram Singh"],
      students: ["2020EE023", "2020ME015"],
      contact: "greenenergy@college.edu",
      description:
        "Solar panel optimization using ML algorithms to maximize output.",
      startDate: "March 2024",
      status: "Active",
      fundingStage: "Pre-seed",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
    },
  ];

  const research = [
    {
      id: 1,
      name: "Quantum Computing Applications",
      domain: "Computer Science",
      studentNames: ["Rohan Khanna", "Ananya Desai"],
      students: ["2020CS010", "2020CS034"],
      contact: "quantum@college.edu",
      description:
        "Exploring quantum algorithms for cryptography and secure communication.",
      startDate: "August 2023",
      status: "Ongoing",
      type: "under_prof",
      professor: "Dr. Rajesh Sharma",
      professorDept: "Computer Science",
      publications: 2,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
    },
  ];

  const domainData = [
    { name: "CS/IT", value: 35 },
    { name: "Healthcare", value: 20 },
    { name: "Energy", value: 15 },
    { name: "Education", value: 18 },
    { name: "Others", value: 12 },
  ];
  const COLORS = ["#0369a0", "#bfe0fd", "#fdfad8", "#60a5fa", "#93c5fd"];

  const currentData = activeTab === "startup" ? startups : research;
  const filteredData = currentData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-text">
      {/* HEADER */}
      <header className="bg-[#0D47A1] text-white p-4 flex items-center justify-between relative overflow-visible">
        <h1 className="text-xl sm:text-2xl font-bold">
          College Innovation Hub
        </h1>

        <div className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 w-[150px] h-16 bg-[#0D47A1] rounded-b-[10000px]" />

        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-25px] z-10">
          <img
            src="src/assets/logo_250.png"
            alt="Logo"
            className="w-24 h-24 object-contain rounded-full"
          />
        </div>

        {/* UPDATED ABOUT BUTTON */}
        <button 
          onClick={() => setAboutOpen(true)}
          className="bg-white text-[#0D47A1] px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          About
        </button>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-6">
        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-64">
          <div className="bg-white rounded-xl shadow-md border p-4">
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <div className="space-y-2">
              {["research", "startup"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? "bg-[#0D47A1] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <main className="flex-1">
          <div className="bg-white rounded-xl shadow-md border">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}s...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0D47A1] outline-none"
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
                <p className="text-center py-8 text-gray-500">
                  No {activeTab}s found.
                </p>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full lg:w-80">
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h3 className="text-lg font-semibold mb-6">Statistics</h3>
            <div className="space-y-4 mb-6">
              <StatsCard
                title="Total Startups"
                value={startups.length}
                gradient="bg-gradient-to-br from-[#0D47A1] to-[#0284c7]"
              />
              <StatsCard
                title="Total Research"
                value={research.length}
                gradient="bg-gradient-to-br from-[#0D47A1] to-[#0284c7]"
              />
              <StatsCard
                title="Students Involved"
                value="47"
                gradient="bg-gradient-to-br from-[#0D47A1] to-[#0284c7]"
              />
            </div>
            <div className="bg-gradient-to-br from-[#0D47A1] to-[#0284c7] rounded-xl justify-center items-center">
              {/* <h4 className="text-sm font-semibold mb-3">Graph</h4> */}
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={domainData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    // 1. Make the connector lines white
                    labelLine={{ stroke: "white" }}
                    // 2. Render a custom <text> element to control color
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      index,
                      name,
                      x,
                      y,
                    }) => {
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white" // <--- This makes the text white
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                          fontSize={7}
                        >
                          {`${name} ${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {domainData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </aside>
      </div>

      {/* MODALS */}
      <ProjectModal
        item={selectedItem}
        activeTab={activeTab}
        onClose={() => setSelectedItem(null)}
      />
      
      {/* INTEGRATED ABOUT POPUP */}
      <AboutPopup 
        isOpen={aboutOpen} 
        onClose={() => setAboutOpen(false)} 
      />
    </div>
  );
};

export default App;