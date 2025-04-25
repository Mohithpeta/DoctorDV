import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import JoinCommunityModal from "./Community/JoinCommunityModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from '../assets/1.png';
import logo2 from '../assets/2.png';
import logo3 from '../assets/3.png';
import logo4 from '../assets/4.png';
import logo5 from '../assets/5.png';

interface Community {
  id: number;
  title: string;
  description: string;
  members: number;
  image: string;
}

export function Community() {
  const navigate = useNavigate();

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [joinedCommunityIds, setJoinedCommunityIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("joinedCommunityIds");
    if (stored) {
      setJoinedCommunityIds(JSON.parse(stored));
    }
  }, []);

  const saveJoinedIds = (ids: number[]) => {
    setJoinedCommunityIds(ids);
    localStorage.setItem("joinedCommunityIds", JSON.stringify(ids));
  };

  const communities: Community[] = [
    {
      id: 1,
      title: "Hypertension Care Community",
      description: "Engage with specialists, exchange insights, and help mothers manage postpartum hypertension.",
      members: 156,
      image: logo1,
    },
    {
      id: 2,
      title: "Urinary Incontinence Community",
      description: "Join specialists in discussing postpartum urinary incontinence, management, treatment options, and patient care.",
      members: 143,
      image: logo2,
    },
    {
      id: 3,
      title: "Postpartum Depression Community",
      description: "Connect with mental health professionals to support mothers through postpartum depression.",
      members: 167,
      image: logo3,
    },
    {
      id: 4,
      title: "Anxiety Community",
      description: "Explore knowledge on recognizing and managing early interventions and therapy.",
      members: 151,
      image: logo4,
    },
    {
      id: 5,
      title: "Secondary Infertility Community",
      description: "Discuss fertility treatments, emotional well-being strategies, and medical advancements in secondary infertility care.",
      members: 139,
      image: logo5,
    },
    {
      id: 6,
      title: "Pelvic Organ Prolapse Community",
      description: "Collaborate with peers to explore treatment options, recovery strategies, and patient education.",
      members: 144,
      image: logo3,
    },
    {
      id: 7,
      title: "Dyspareunia Community",
      description: "Engage in discussions on pain management, therapy options, and support strategies for postpartum dyspareunia.",
      members: 122,
      image: logo2,
    },
    {
      id: 8,
      title: "Obesity Community",
      description: "Join experts in postpartum weight management, metabolic health, and lifestyle interventions for sustainable recovery.",
      members: 178,
      image: logo1,
    },
    {
      id: 9,
      title: "Back Pain Community",
      description: "Share physiotherapy techniques, pain relief methods, and rehabilitation strategies for postpartum back pain.",
      members: 134,
      image: logo4,
    },
    {
      id: 10,
      title: "Anal Incontinence Community",
      description: "Community for managing postpartum anal incontinence through medical treatments & pelvic floor rehabilitation.",
      members: 120,
      image: logo5,
    },
  ];

  const joinedCommunities = communities.filter((c) => joinedCommunityIds.includes(c.id));
  const unjoinedCommunities = communities.filter((c) => !joinedCommunityIds.includes(c.id));

  const handleJoinOrEnter = (community: Community) => {
    if (joinedCommunityIds.includes(community.id)) {
      navigate(`/community/${community.id}`);
    } else {
      setSelectedCommunity(community);
    }
  };

  const confirmJoin = () => {
    if (selectedCommunity) {
      const updated = [...joinedCommunityIds, selectedCommunity.id];
      saveJoinedIds(updated);
      setSelectedCommunity(null);
    }
  };

  const renderCommunityCard = (community: Community, joined: boolean) => (
    <div
      key={community.id}
      className="bg-white p-6 rounded-2xl shadow-sm flex flex-col border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-5 flex-auto">
        <img
          src={community.image}
          alt={community.title}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">
            {community.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{community.members} Members</p>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            {community.description}
          </p>
        </div>
      </div>
      <button
        className={`mt-5 px-5 py-2.5 rounded-full text-sm font-medium self-end transition-opacity ${
          joined
        ? "bg-green-600 text-white hover:bg-green-700"
        : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
        onClick={() => {
          if (joined) {
        navigate(`/community/${community.id}`);
          } else {
        handleJoinOrEnter(community);
          }
        }}
      >
        {joined ? "Enter Community →" : "Join Community →"}
      </button>
    </div>
  );

  return (
    <div className="flex h-screen overflow-auto">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 z-20 border-r bg-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-50 ml-64">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 z-10 bg-white border-b">
          <Header />
        </div>

        <div className="p-8 pt-28">
          <h2 className="text-2xl font-semibold mb-8">Communities</h2>

          {joinedCommunities.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Your Joined Communities</h3>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {joinedCommunities.map((c) => renderCommunityCard(c, true))}
              </div>
            </>
          )}

          <h3 className="text-xl font-semibold mb-4">Explore More Communities</h3>
          <div className="grid grid-cols-2 gap-6">
            {unjoinedCommunities.map((c) => renderCommunityCard(c, false))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCommunity && (
        <JoinCommunityModal
          isOpen={!!selectedCommunity}
          onClose={() => setSelectedCommunity(null)}
          onConfirm={confirmJoin}
          communityName={selectedCommunity.title}
        />
      )}
    </div>
  );
}
