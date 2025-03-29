import { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { X } from 'lucide-react';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Categories for the main filter buttons
  const categories = [
    'All',
    'Hypertension',
    'Urinary Incontinence',
    'Depression',
    'Postpartum Anxiety',
    'Secondary Infertility',
    'Pelvic Organ Prolapse',
    'Dyspareunia',
    'Obesity',
    'Backpain',
    'Anal Incontinence',
  ];

  // Sub-categories for the modal (specific to each category)
  const subCategories = useMemo(() => ({
    Hypertension: [
      'All',
      'About Postpartum Hypertension',
      'Symptoms of Hypertension',
      'Risk Factors of Hypertension',
      'Screening & Diagnosis',
      'Treatment for Hypertension',
      'Others',
    ],
    'Urinary Incontinence': [
      'All',
      'About Urinary Incontinence',
      'Symptoms of Urinary Incontinence',
      'Risk Factors',
      'Diagnosis',
      'Treatment Options',
      'Others',
    ],
    Depression: [
      'All',
      'About Postpartum Depression',
      'Symptoms of Depression',
      'Risk Factors',
      'Diagnosis',
      'Treatment Options',
      'Others',
    ],
    'Postpartum Anxiety': [
      'All',
      'About Postpartum Anxiety',
      'Symptoms of Anxiety',
      'Risk Factors',
      'Diagnosis',
      'Treatment Options',
      'Others',
    ],
    'Secondary Infertility': [
      'All',
      'About Secondary Infertility',
      'Causes of Secondary Infertility',
      'Risk Factors',
      'Diagnosis',
      'Treatment Options',
      'Others',
    ],
    'Pelvic Organ Prolapse': [
      'All',
      'About Pelvic Organ Prolapse',
      'Symptoms of Pelvic Organ Prolapse',
      'Risk Factors',
      'Diagnosis',
      'Treatment Options',
      'Others',
    ],
    Dyspareunia: [
      'All',
      'About Dyspareunia',
      'Symptoms of Dyspareunia',
      'Risk Factors',
      'Diagnosis',
      'Treatment Options',
      'Others',
    ],
    Obesity: [
      'All',
      'About Obesity in Postpartum',
      'Causes of Obesity',
      'Risk Factors',
      'Management',
      'Lifestyle Changes',
      'Others',
    ],
    Backpain: [
      'All',
      'About Postpartum Backpain',
      'Causes of Backpain',
      'Risk Factors',
      'Management',
      'Exercises',
      'Others',
    ],
    'Anal Incontinence': [
      'All',
      'About Anal Incontinence',
      'Symptoms of Anal Incontinence',
      'Risk Factors',
      'Diagnosis',
      'Treatment Options',
      'Others',
    ],
  }), []);

  // Sample videos data
  const videos = useMemo(() => [
    {
      title: '10 Practical tips for managing postpartum Hypertension',
      thumbnail: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Anjali Kumar',
      views: 100,
      timeAgo: '2 hours ago',
      category: 'Hypertension',
      subCategory: 'About Postpartum Hypertension',
    },
    {
      title: 'Types of Postpartum Hypertension | Distinguishing...',
      thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Pravin Raja',
      views: 1300,
      timeAgo: '4 months ago',
      category: 'Hypertension',
      subCategory: 'About Postpartum Hypertension',
    },
    {
      title: 'How it Develops Post Delivery | Pathways leading...',
      thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Kavin Kumar',
      views: 120,
      timeAgo: '4 hours ago',
      category: 'Hypertension',
      subCategory: 'About Postpartum Hypertension',
    },
    {
      title: 'Role of Hormonal Changes | How shifts hormones...',
      thumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Anjali Kumar',
      views: 103,
      timeAgo: '5 days ago',
      category: 'Hypertension',
      subCategory: 'Symptoms of Hypertension',
    },
    {
      title: 'Preeclampsia and Eclampsia | Distinction from...',
      thumbnail: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Anjali Kumar',
      views: 1200,
      timeAgo: '6 months ago',
      category: 'Hypertension',
      subCategory: 'Risk Factors of Hypertension',
    },
    {
      title: 'Epidemiology and Prevalence | Statistics and...',
      thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Anjali Kumar',
      views: 2400,
      timeAgo: '2 years ago',
      category: 'Hypertension',
      subCategory: 'Screening & Diagnosis',
    },
    {
      title: 'Understanding Postpartum Depression',
      thumbnail: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Sarah Johnson',
      views: 500,
      timeAgo: '1 week ago',
      category: 'Depression',
      subCategory: 'About Postpartum Depression',
    },
    {
      title: 'Managing Urinary Incontinence Postpartum',
      thumbnail: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
      author: 'Dr. Lisa Williams',
      views: 300,
      timeAgo: '3 days ago',
      category: 'Urinary Incontinence',
      subCategory: 'About Urinary Incontinence',
    },
  ], []);

  // Handle filter button click to open modal
  const handleFilterClick = (category: string) => {
    if (category === 'All') {
      setActiveFilter('All');
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
      setModalOpen(true);
    }
  };

  // Handle sub-filter selection in the modal
  const handleSubFilterSelect = (subFilter: string) => {
    setActiveFilter(subFilter === 'All' ? selectedCategory : subFilter);
    setModalOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilter('All');
    setSelectedCategory('');
    setSearchQuery('');
  };

  // Filter videos based on active filter and search query
  const filteredVideos = useMemo(() => {
    let filtered = videos;

    if (activeFilter !== 'All') {
      filtered = filtered.filter((video) => {
        if (activeFilter in subCategories) {
          return video.category === activeFilter;
        }
        return video.category === selectedCategory && video.subCategory === activeFilter;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.author.toLowerCase().includes(query) ||
          video.category.toLowerCase().includes(query) ||
          video.subCategory.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [videos, activeFilter, selectedCategory, searchQuery, subCategories]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header placeholder="Search videos" onSearch={setSearchQuery} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterClick(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === category ||
                    (category === 'All' && activeFilter === 'All') ||
                    (category === selectedCategory && activeFilter !== 'All')
                      ? 'bg-[#5E17EB] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
              {activeFilter !== 'All' && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1.5 rounded-full text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </button>
              )}
            </div>

            {/* Modal for Sub-Filters */}
            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-semibold mb-4">
                    {selectedCategory}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {subCategories[selectedCategory as keyof typeof subCategories]?.map((subFilter) => (
                      <button
                        key={subFilter}
                        onClick={() => handleSubFilterSelect(subFilter)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          activeFilter === subFilter ||
                          (subFilter === 'All' && activeFilter === selectedCategory)
                            ? 'bg-[#5E17EB] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {subFilter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-[#5E17EB] to-[#8344FF] text-white p-6 rounded-lg">
                <h1 className="text-2xl font-semibold">
                  {activeFilter === 'All' ? 'All Videos' : activeFilter}
                </h1>
              </div>
            </div>

            {/* Videos Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">ALL VIDEOS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center mt-2">
                          <p className="text-sm text-gray-600">{video.author}</p>
                          <span className="ml-2 w-4 h-4 bg-[#5E17EB] rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {video.views} VIEWS | {video.timeAgo}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No videos found for this filter.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}