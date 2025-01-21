import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Plus, SlidersHorizontal, X } from "lucide-react";

export function Community() {
  const themeColor = "#a32e76"; // Match the theme color
  const [selectedCategory, setSelectedCategory] = useState("Preconception");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { name: "Preconception", count: 10 },
    { name: "Pregnancy", count: 0 },
    { name: "Postpartum", count: 0 },
  ];

  const groups = [
    {
      id: 1,
      title: "Mental Health in Preconception",
      image: "/api/placeholder/64/64",
      createdAt: "12/12/2024",
      type: "Paid",
    },
    {
      id: 2,
      title: "Nutrition for Preconception",
      image: "/api/placeholder/64/64",
      createdAt: "10/12/2024",
      type: "Free",
    },
    {
      id: 3,
      title: "Support Groups for New Parents",
      image: "/api/placeholder/64/64",
      createdAt: "15/12/2024",
      type: "Paid",
    },
    {
      id: 4,
      title: "Exercise Tips During Pregnancy",
      image: "/api/placeholder/64/64",
      createdAt: "18/12/2024",
      type: "Free",
    },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          placeholder="Search group"
          onSearch={(query) => console.log("Search query:", query)}
          username="Anjali Kumar"
          avatarUrl="/path-to-avatar.jpg"
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Action Buttons for Community and Group Management */}
          <div className="flex gap-4 mb-6">
            <button 
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm"
              style={{ backgroundColor: themeColor }}
            >
              Community
            </button>
            <button 
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition-colors hover:bg-opacity-90"
              style={{ backgroundColor: "#f8f8f8", color: themeColor }}
            >
              Group Management
            </button>
          </div>

          {/* Categories and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-2.5 rounded-full text-sm transition-colors`}
                  style={{
                    backgroundColor: selectedCategory === category.name ? themeColor : "#f8f8f8",
                    color: selectedCategory === category.name ? "white" : themeColor
                  }}
                >
                  {category.name}
                  {category.count > 0 && (
                    <span className="ml-1">({category.count})</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition-colors"
                style={{ backgroundColor: "#f8f8f8", color: themeColor }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <button 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: themeColor }}
              >
                <Plus className="w-4 h-4" />
                Create Group
              </button>
            </div>
          </div>

          {/* My Group Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">My Groups</h2>
            <div className="grid gap-4">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={group.image}
                    alt={group.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{group.title}</h3>
                    <p className="text-sm text-gray-500">
                      Created on {group.createdAt}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm ${
                      group.type === "Paid"
                        ? "bg-orange-50 text-orange-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {group.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Sidebar */}
        {showFilters && (
          <div className="fixed right-0 top-0 h-screen w-72 bg-white shadow-lg p-6 z-50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-full border-gray-300 accent-[#a32e76]"
                />
                <span className="text-gray-700">Free Group</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-full border-gray-300 accent-[#a32e76]"
                />
                <span className="text-gray-700">Paid Group</span>
              </label>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}