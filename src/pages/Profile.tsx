import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample video data with categories for filtering
const videoData = [
    {
        id: 1,
        title: "10 Practical tips for managing postpartum Hypertension",
        instructor: "Dr. Anjali Kumar",
        duration: "00:30:00",
        views: "100 Views",
        time: "Streamed 2 hours ago",
        category: "live-now",
        type: "profile-info", // Added type for top-level filter
    },
    {
        id: 2,
        title: "10 Practical tips for managing postpartum Hypertension",
        instructor: "Dr. Anjali Kumar",
        duration: "00:30:00",
        views: "100 Views",
        time: "Streamed 2 hours ago",
        category: "recent-live",
        type: "saved-videos",
    },
    {
        id: 3,
        title: "10 Practical tips for managing postpartum Hypertension",
        instructor: "Dr. Anjali Kumar",
        duration: "00:30:00",
        views: "100 Views",
        time: "Streamed 2 hours ago",
        category: "upcoming-live",
        type: "liked-videos",
    },
    {
        id: 4,
        title: "10 Practical tips for managing postpartum Hypertension",
        instructor: "Dr. Anjali Kumar",
        duration: "00:30:00",
        views: "100 Views",
        time: "Streamed 2 hours ago",
        category: "live-now",
        type: "experts-followed",
    },
    {
        id: 5,
        title: "10 Practical tips for managing postpartum Hypertension",
        instructor: "Dr. Anjali Kumar",
        duration: "00:30:00",
        views: "100 Views",
        time: "Streamed 2 hours ago",
        category: "recent-live",
        type: "commented-videos",
    },
    {
        id: 6,
        title: "10 Practical tips for managing postpartum Hypertension",
        instructor: "Dr. Anjali Kumar",
        duration: "00:30:00",
        views: "100 Views",
        time: "Streamed 2 hours ago",
        category: "upcoming-live",
        type: "watch-history",
    },
];

const DoctorLivePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile-info");
    const [activeFilters, setActiveFilters] = useState(["recent-live"]);

    // Toggle filter functionality for Live filters
    const toggleFilter = (filter: string): void => {
        setActiveFilters((prevFilters: string[]) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f: string) => f !== filter)
                : [...prevFilters, filter]
        );
    };

    // Filter videos based on both the selected tab and live filters
    const filteredVideos = videoData.filter(
        (video) =>
            video.type === activeTab &&
            (activeFilters.length === 0 || activeFilters.includes(video.category))
    );

    return (
        <div className="flex min-h-screen bg-white text-gray-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header />

                <main className="flex-1">
                    {/* Profile Section */}
                    <section className="p-6">
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-4 text-sm">
                            {[
                                "Profile Info",
                                "Saved Videos",
                                "Liked Videos",
                                "LifeCourse Experts You Follow",
                                "Commented Videos",
                                "Watch History",
                            ].map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() =>
                                        setActiveTab(
                                            tab.toLowerCase().replace(/\s+/g, "-")
                                        )
                                    }
                                    className={`px-4 py-1 rounded-full ${
                                        activeTab ===
                                        tab.toLowerCase().replace(/\s+/g, "-")
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Profile (always visible) */}
                        <div className="bg-yellow-100 rounded-xl p-6 flex gap-6 items-center shadow-sm mb-6">
                            <img
                                src="https://randomuser.me/api/portraits/women/47.jpg"
                                alt="Dr. Anjali Kumar"
                                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold">
                                    DR. Anjali Kumar <span className="text-purple-600">✔️</span>
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Gynecologist | Obstetrician
                                </p>
                                <p className="text-sm text-gray-600">📍 Pune, India</p>
                                <p className="text-sm text-gray-600">
                                    Years Of Experience: 15 Yrs
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    LifeCourse Expert Since: October 5, 2024
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <SocialButton label="LinkedIn" />
                                    <SocialButton label="YouTube" />
                                    <SocialButton label="Instagram" />
                                </div>
                            </div>
                        </div>

                        {/* About (always visible) */}
                        <div className="mb-6 text-sm text-gray-700 max-w-4xl">
                            <p>
                                I am Dr. Anjali Kumar, holding an MBBS, MD in Obstetrics &
                                Gynecology, and FICMCH, FMAS certifications. I have also completed
                                a Certificate Course and Training in Endoscopy from the World
                                Association of{" "}
                                <span className="text-purple-600 cursor-pointer">Read more...</span>
                            </p>
                        </div>

                        {/* Tabs under profile */}
                        <div className="flex gap-4 border-b mb-6">
                            {["Videos", "Live", "Courses"].map((item, i) => (
                                <button
                                    key={i}
                                    className={`py-2 px-4 border-b-2 ${
                                        item === "Live"
                                            ? "border-purple-600 text-purple-600"
                                            : "border-transparent text-gray-600"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {/* Live Filters */}
                        <div className="flex gap-4 mb-6">
                            <FilterButton
                                label="Live Now"
                                isActive={activeFilters.includes("live-now")}
                                onClick={() => toggleFilter("live-now")}
                            />
                            <FilterButton
                                label="Recent Live"
                                isActive={activeFilters.includes("recent-live")}
                                onClick={() => toggleFilter("recent-live")}
                            />
                            <FilterButton
                                label="Upcoming Live"
                                isActive={activeFilters.includes("upcoming-live")}
                                onClick={() => toggleFilter("upcoming-live")}
                            />
                        </div>

                        {/* Video Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredVideos.length > 0 ? (
                                filteredVideos.map((video) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        navigate={navigate}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-600 text-sm col-span-3">
                                    No videos available for the selected filters.
                                </p>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

const SocialButton = ({ label }: { label: string }) => (
    <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 text-xs rounded-full">
        {label}
    </button>
);

const FilterButton = ({
    label,
    isActive = false,
    onClick,
}: {
    label: string;
    isActive?: boolean;
    onClick: () => void;
}) => (
    <button
        onClick={onClick}
        className={`px-4 py-1 text-sm rounded-full ${
            isActive ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
        }`}
    >
        {label}
    </button>
);

interface Video {
    id: number;
    title: string;
    instructor: string;
    duration: string;
    views: string;
    time: string;
    category: string;
    type: string;
}

const VideoCard = ({ video, navigate }: { video: Video; navigate: (path: string) => void }) => (
    <div className="bg-white shadow rounded-xl overflow-hidden border">
        <div className="relative">
            <img
                src="https://via.placeholder.com/300x180"
                alt="Thumbnail"
                className="w-full h-44 object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                {video.duration}
            </span>
        </div>
        <div className="p-4 text-sm">
            <p className="font-semibold truncate">{video.title}</p>
            <p className="text-gray-600 mt-1">{video.instructor} ✔️</p>
            <p className="text-gray-500 text-xs">{video.views} | {video.time}</p>
            <button
                onClick={() => navigate(`/video/${video.id}`)}
                className="mt-3 bg-purple-600 text-white text-xs px-4 py-1 rounded-full"
            >
                View →
            </button>
        </div>
    </div>
);

export default DoctorLivePage;