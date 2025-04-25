import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from '../../assets/1.png';
import logo2 from '../../assets/2.png';
import logo3 from '../../assets/3.png';
import logo4 from '../../assets/4.png';
import logo5 from '../../assets/5.png';

// Mock data for community details
const communitiesData: Record<number, { name: string; banner: string; image: string }> = {
  1: { 
    name: "Hypertension Care Community", 
    banner: "bg-blue-100",
    image: logo1
  },
  2: { 
    name: "Urinary Incontinence Community", 
    banner: "bg-indigo-100",
    image: logo2
  },
  3: { 
    name: "Postpartum Depression Community", 
    banner: "bg-purple-100",
    image: logo3
  },
  4: { 
    name: "Anxiety Community", 
    banner: "bg-blue-100",
    image: logo4
  },
  5: { 
    name: "Secondary Infertility Community", 
    banner: "bg-indigo-100",
    image: logo5
  },
  // Additional communities...
};

// Group options with their colors
const groupOptions = [
  {
    id: 1,
    title: "Announcements & Remainders",
    date: "04/01/25",
    description: "LifeCourse: Welcome all to the",
    bgColor: "bg-pink-100",
    imgSrc: "/announcements-icon.png"
  },
  {
    id: 2,
    title: "Virtual Community Meetup",
    bgColor: "bg-yellow-100",
    imgSrc: "/virtual-meetup-icon.png"
  },
  {
    id: 3,
    title: "Online Contests",
    bgColor: "bg-purple-100",
    imgSrc: "/contests-icon.png"
  },
  {
    id: 4,
    title: "Ask the Doctor",
    bgColor: "bg-blue-100",
    imgSrc: "/doctor-icon.png"
  },
  {
    id: 5,
    title: "Articles",
    bgColor: "bg-orange-100",
    imgSrc: "/articles-icon.png"
  },
];

export function CommunityDetails() {
  const { communityId } = useParams(); // assuming route is like /community/:communityId
  const [community, setCommunity] = useState<{ name: string; banner: string; image: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch community data based on ID
    const id = Number(communityId);
    if (communityId && communitiesData[id]) {
      setCommunity(communitiesData[id]);
    } else {
      // Fallback for testing or when ID doesn't match
      setCommunity({ 
        name: "Hypertension Care Community", 
        banner: "bg-blue-100",
        image: "/hypertension-illustration.png"
      });
    }
  }, [communityId]);

  

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 z-20 border-r bg-white">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col bg-gray-50 ml-64">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 z-10 bg-white border-b">
          <Header />
        </div>

        {/* Content */}
        <div className="p-8 pt-28 pb-16 overflow-y-auto">
          {/* Community Banner */}
          <div className={`${community?.banner || 'bg-blue-100'} rounded-2xl p-6 mb-8 flex justify-between items-center relative`}>
            <div className="flex items-center">
              <button className="mr-6 p-2 rounded-full bg-white bg-opacity-80 text-blue-600 hover:bg-opacity-100 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{community?.name || "Community"}</h2>
                <a href="#" className="text-blue-600 text-sm font-medium mt-1 inline-block hover:underline">
                  See community info
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img src= {logo1} alt="Community illustration" className="h-32 object-contain" />
            </div>
          </div>

            {/* Announcement Section */}
            <div className="mb-8">
            <button
              onClick={() => navigate(`/community/announcements`)}
              className="bg-pink-100 rounded-xl p-5 flex items-start gap-4 w-full text-left"
            >
              <div className="flex-shrink-0 bg-white rounded-lg p-2 w-16 h-16 flex items-center justify-center">
              <img src={logo2} alt="Announcements" className="w-10 h-10" />
              </div>
              <div className="flex-1">
              <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800">Announcements & Remainders</h3>
              <span className="text-xs text-gray-500">04/01/25</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">LifeCourse: Welcome all to the</p>
              </div>
              <div className="flex-shrink-0 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              2
              </div>
            </button>
            </div>
              {/* Joinable Groups Section */}
              <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Groups you can join</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {groupOptions.map((group) => (
                <button
                  key={group.id}
                  onClick={() => navigate(`/community/group/${group.id}`)}
                  className={`rounded-xl ${group.bgColor} hover:shadow-md transition-shadow duration-200 flex w-full`}
                >
                  <div className="flex p-5 w-full">
                  {/* Group icon/image */}
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center">
                    <img src={group.imgSrc} alt={group.title} className="w-12 h-12" />
                    </div>
                  </div>
                  
                  {/* Group title and join button */}
                  <div className="flex flex-col justify-between flex-1">
                    <h4 className="font-medium text-gray-800">{group.title}</h4>
                    <span className="text-blue-600 text-sm font-medium">Join Group</span>
                  </div>
                  </div>
                  
                  {/* Info icon */}
                  <div className="flex items-start p-3">
                  <div className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">i</span>
                  </div>
                  </div>
                </button>
                ))}
              </div>
              </div>
        </div>
      </div>
    </div>
  );
}