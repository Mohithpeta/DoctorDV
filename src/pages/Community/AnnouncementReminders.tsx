import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Mock data for community details
const communitiesData: Record<string, { name: string; banner: string; description: string }> = {
  1: { 
    name: "Hypertension General Community", 
    banner: "bg-blue-100",
    description: "You joined this community! Doctor initiated, patient centric community",
  },
  2: { 
    name: "Urinary Incontinence Community", 
    banner: "bg-indigo-100",
    description: "You joined this community! Doctor initiated, patient centric community",
  },
  3: { 
    name: "Postpartum Depression Community", 
    banner: "bg-purple-100",
    description: "You joined this community! Doctor initiated, patient centric community",
  },
  4: { 
    name: "Anxiety Community", 
    banner: "bg-blue-100",
    description: "You joined this community! Doctor initiated, patient centric community",
  },
  5: { 
    name: "Secondary Infertility Community", 
    banner: "bg-indigo-100",
    description: "You joined this community! Doctor initiated, patient centric community",
  },
};

// Mock announcement data
const announcementsData = [
  {
    id: 1,
    sender: "LifeCourse Admin",
    message: "Hello community people. In this group you will be notified about recent news. Announcements from doctors and reminders to attend meeting and live.",
    replies: 3,
  },
];

export function AnnouncementsPage() {
  const { communityId } = useParams(); // assuming route is like /announcements/:communityId
  const [community, setCommunity] = useState<{ name: string; banner: string; description: string } | null>(null);

  useEffect(() => {
    // Fetch community data based on ID
    const id = Number(communityId);
    if (communityId && communitiesData[id]) {
      setCommunity(communitiesData[id]);
    } else {
      // Fallback for testing or when ID doesn't match
      setCommunity({ 
        name: "Hypertension General Community", 
        banner: "bg-blue-100",
        description: "You joined this community! Doctor initiated, patient centric community",
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
                <h2 className="text-2xl font-semibold text-gray-800">
                  Welcome to the {community?.name || "Community"}!
                </h2>
                <p className="text-sm text-gray-600 mt-1">{community?.description}</p>
                <button className="mt-2 px-4 py-1 bg-white border border-blue-600 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-50">
                  See community info
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="/api/placeholder/280/140" alt="Community illustration" className="h-32 object-contain" />
            </div>
          </div>

          {/* Announcements Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">ANNOUNCEMENTS & REMINDERS</h3>
            {announcementsData.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-xl p-5 flex items-start gap-4 border shadow-sm mb-4">
                <div className="flex-shrink-0 bg-pink-100 rounded-lg p-2 w-16 h-16 flex items-center justify-center">
                  <img src="/api/placeholder/48/48" alt="Announcements" className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{announcement.sender}</h4>
                  <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
                  <div className="flex items-center mt-2 text-sm text-blue-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {announcement.replies} Replies
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}