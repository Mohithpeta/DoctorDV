import { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import {Link} from 'react-router-dom';

export function LifeCourseExperts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Postpartum Hypertension', 'Anal Incontinence', 'Obesity', 'Diabetes Mellitus', 'Dyspareunia'];
  
  const experts = useMemo(() => [
    {
      name: "Dr. Sarah Johnson",
      id: 1, 
      specialization: "OBGYN",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Michael Chen",
      id: 2,
      specialization: "Pediatrician",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Lisa Williams",
      id: 3,
      specialization: "Family Medicine",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. James Wilson",
      id: 4,
      specialization: "Cardiologist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    },
    // Duplicate experts to fill the grid
    {
      name: "Dr. Sarah Johnson",
      id: 5,
      specialization: "OBGYN",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Michael Chen",
      id: 6,
      specialization: "Pediatrician",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Lisa Williams",
      specialization: "Family Medicine",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. James Wilson",
      specialization: "Cardiologist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    }
  ], []);

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const matchesSearch = 
        searchQuery.trim() === '' ||
        expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.specialization.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter = 
        activeFilter === 'All' ||
        expert.specialization.includes(activeFilter); 

      return matchesSearch && matchesFilter;
    });
  }, [experts, searchQuery, activeFilter]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header
          placeholder="Search LifeCourse Experts" 
          onSearch={setSearchQuery} 
        />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold">LifeCourse Experts</h1>
            </div>

            {/* Categories */}
            <div className="flex space-x-3 overflow-x-auto mb-8 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeFilter === category 
                      ? 'bg-[#A32E76] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Experts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredExperts.map((expert, index) => ( 
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img 
                    src={expert.image} 
                    alt={expert.name} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{expert.name}</h3>
                    <p className="text-sm text-gray-600">{expert.specialization}</p>
                    <button className="mt-3 text-[#A32E76] text-sm font-medium hover:text-[#D81B60]">                     
                      <Link to={`/profile/${expert.id}`}>View Profile</Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}