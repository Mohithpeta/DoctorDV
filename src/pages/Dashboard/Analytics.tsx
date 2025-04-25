import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AnalyticsPage() {
  const [dateRange] = useState("Last 28 days");
  
  // Sample analytics data for the chart
  const analyticsData = [
    { date: 'Jan 1', views: 0 },
    { date: 'Jan 5', views: 2 },
    { date: 'Jan 10', views: 5 },
    { date: 'Jan 20', views: 9 },
    { date: 'Jan 24', views: 11 },
    { date: 'Jan 26', views: 10 },
    { date: 'Jan 28', views: 12 },
  ];

  // Stats summary data
  const statsSummary = [
    { title: "Views", value: "22K" },
    { title: "Watch Time (Hours)", value: "44 Hrs" },
    { title: "Followers", value: "33" }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 border-r bg-white z-20">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64 bg-gray-50">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 z-10 bg-white border-b">
          <Header />
        </div>

        {/* Main content area */}
        <div className="pt-16 px-8 pb-8">
          {/* Analytics Header with Date Range */}
          <div className="flex justify-between items-center mt-4 mb-6">
            <h1 className="text-2xl font-medium text-gray-800">Video Analytics</h1>
            <div className="relative">
              <button 
                className="flex items-center px-4 py-2 bg-white border rounded-md shadow-sm text-sm text-gray-700"
              >
                <span className="mr-2">{dateRange}</span>
                <span className="text-xs text-gray-500">Jan 1 - Jan 28</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {statsSummary.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
                <p className="text-3xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analyticsData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    domain={[0, 'dataMax + 1']}
                    ticks={[0, 3, 6, 9, 12]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                    itemStyle={{ color: '#7C3AED' }}
                    labelStyle={{ color: '#4B5563', fontWeight: 500 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#7C3AED" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}