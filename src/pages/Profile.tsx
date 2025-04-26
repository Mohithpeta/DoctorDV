import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Define types for our data
interface Video {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  views: string;
  time: string;
  category: string; // For live status: live-now, recent-live, upcoming-live
  videoCategory: string; // For content category: postpartum, pregnancy, preconception
  type: string;
}

// Sample video data with categories for filtering
const videoData: Video[] = [
  {
    id: 1,
    title: "10 Practical tips for managing postpartum Hypertension",
    instructor: "Dr. Anjali Kumar",
    duration: "00:30:00",
    views: "100 Views",
    time: "Streamed 2 hours ago",
    category: "live-now",
    videoCategory: "postpartum",
    type: "profile-info",
  },
  {
    id: 2,
    title: "10 Practical tips for managing postpartum Hypertension",
    instructor: "Dr. Anjali Kumar",
    duration: "00:30:00",
    views: "100 Views",
    time: "Streamed 2 hours ago",
    category: "recent-live",
    videoCategory: "postpartum",
    type: "profile-info",
  },
  {
    id: 3,
    title: "10 Practical tips for managing postpartum Hypertension",
    instructor: "Dr. Anjali Kumar",
    duration: "00:30:00",
    views: "100 Views",
    time: "Streamed 2 hours ago",
    category: "upcoming-live",
    videoCategory: "postpartum",
    type: "profile-info",
  },
];

type SortOption = "most-recent" | "most-viewed";
type CategoryFilter = "postpartum" | "pregnancy" | "preconception" | "";

const DoctorLivePage = () => {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<string>("live");
  const [liveFilter, setLiveFilter] = useState<string>("recent-live");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("");
  const [sortOption, setSortOption] = useState<SortOption>("most-recent");
  const profileCardRef = useRef<HTMLDivElement>(null);

  // Make profile card sticky on scroll
  useEffect(() => {
    const handleScroll = () => {
      const profileCard = profileCardRef.current;
      if (!profileCard) return;
      
      const scrollPosition = window.scrollY;
      if (scrollPosition > 80) {
        profileCard.classList.add("sticky-profile");
      } else {
        profileCard.classList.remove("sticky-profile");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter videos based on active filters
  const filteredVideos = videoData
    .filter((video) => video.category === liveFilter)
    .filter((video) => !categoryFilter || video.videoCategory === categoryFilter)
    .sort((a, b) => {
      if (sortOption === "most-viewed") {
        return parseInt(b.views.replace(/[^0-9]/g, "")) - parseInt(a.views.replace(/[^0-9]/g, ""));
      }
      return 0; // Default to the order they are in the data (assumed to be most recent first)
    });

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        <main className="flex-1">
          {/* Profile Card - Sticky */}
          <div 
            ref={profileCardRef}
            className="bg-white p-6 transition-all duration-300 z-10"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Column (Doctor Info) */}
                <div className="md:w-1/3 flex flex-col items-center md:items-start">
                  <img
                    src="https://randomuser.me/api/portraits/women/47.jpg"
                    alt="Dr. Anjali Kumar"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-md"
                    loading="lazy"
                  />
                  <h2 className="text-xl font-bold mt-4 flex items-center">
                    Dr. Anjali Kumar 
                    <span className="text-purple-600 ml-1" aria-label="Verified Account">✓</span>
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Gynecologist | Obstetrician
                  </p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <span className="mr-1">📍</span> Pune, India
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Years Of Experience: 15 Yrs
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    LifeCourse Expert Since: October 5, 2024
                  </p>
                </div>

                {/* Right Column (Banner & About) */}
                <div className="md:w-2/3">
                  <div className="relative rounded-lg overflow-hidden mb-4  h-32 w-full">
                    <button 
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                      aria-label="Edit banner image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex gap-3 mb-4">
                    <SocialButton label="LinkedIn" icon="linkedin" />
                    <SocialButton label="YouTube" icon="youtube" />
                    <SocialButton label="Instagram" icon="instagram" />
                  </div>

                  <div className="text-sm text-gray-700 relative">
                    <h3 className="font-semibold mb-1">About Me</h3>
                    <p>
                      I am Dr. Anjali Kumar, holding an MBBS, MD in Obstetrics &
                      Gynecology, and FICMCH, FMAS certifications. I have also completed
                      a Certificate Course and Training in Endoscopy from the World
                      Association of Laparoscopic Surgeons.{" "}
                      <a href="#" className="text-purple-600">Read more...</a>
                    </p>
                    <button 
                      className="text-purple-600 font-medium absolute right-0 top-0"
                      aria-label="Edit about section"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Main Tabs */}
            <div className="flex gap-4 border-b mb-6">
              {["Videos", "Live", "Courses"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMainTab(tab.toLowerCase())}
                  className={`py-2 px-4 border-b-2 transition-colors ${
                    mainTab === tab.toLowerCase()
                      ? "border-purple-600 text-purple-600 font-medium"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                  aria-selected={mainTab === tab.toLowerCase()}
                  role="tab"
                >
                  {tab}
                </button>
              ))}
              <div className="ml-auto flex items-center">
                <button className="p-2" aria-label="Additional options">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Live Sub-Tabs */}
            {mainTab === "live" && (
              <div className="flex gap-4 mb-6">
                {[
                  { id: "live-now", label: "Live Now" },
                  { id: "recent-live", label: "Recent Live" },
                  { id: "upcoming-live", label: "Upcoming Live" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLiveFilter(item.id)}
                    className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      liveFilter === item.id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-selected={liveFilter === item.id}
                    role="tab"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
              {/* Category Filters - Left */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm text-gray-600 self-center">Filter by:</span>
                {[
                  { id: "", label: "All" },
                  { id: "postpartum", label: "Postpartum" },
                  { id: "pregnancy", label: "Pregnancy" },
                  { id: "preconception", label: "Preconception" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCategoryFilter(item.id as CategoryFilter)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      categoryFilter === item.id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Sort Options - Right */}
              <div className="flex gap-2">
                <span className="text-sm text-gray-600 self-center">Sort by:</span>
                {[
                  { id: "most-recent", label: "Most Recent" },
                  { id: "most-viewed", label: "Most Viewed" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSortOption(item.id as SortOption)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      sortOption === item.id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    navigate={navigate}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No videos available for the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface SocialButtonProps {
  label: string;
  icon: string;
}

const SocialButton = ({ label, icon }: SocialButtonProps) => {
  const iconMap: Record<string, JSX.Element> = {
    linkedin: (
      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    youtube: (
      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
      </svg>
    )
  };

  return (
    <button 
      className="bg-gray-100 hover:bg-gray-200 px-3 py-1 text-xs rounded-full flex items-center transition-colors"
      aria-label={`Visit ${label} profile`}
    >
      {iconMap[icon]}
      {label}
    </button>
  );
};

interface VideoCardProps {
  video: Video;
  navigate: (path: string) => void;
}

const VideoCard = ({ video, navigate }: VideoCardProps) => (
  <div className="bg-white rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
    <div className="relative">
      <img
        src={`https://via.placeholder.com/400x225?text=${encodeURIComponent(video.title.substring(0, 10))}`}
        alt={`Thumbnail for ${video.title}`}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
        {video.duration}
      </span>
    </div>
    <div className="p-4 text-sm">
      <h3 className="font-semibold truncate" title={video.title}>
        {video.title}
      </h3>
      <p className="text-gray-600 mt-1 flex items-center">
        {video.instructor} 
        <span className="text-purple-600 ml-1 text-xs">✓</span>
      </p>
      <p className="text-gray-500 text-xs mt-1">{video.views} | {video.time}</p>
      <div className="flex justify-end mt-3">
        <button
          onClick={() => navigate(`/video/${video.id}`)}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-1 rounded-full transition-colors"
          aria-label={`View ${video.title}`}
        >
          View →
        </button>
      </div>
    </div>
  </div>
);

export default DoctorLivePage;