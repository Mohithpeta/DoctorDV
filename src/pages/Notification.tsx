import { SetStateAction, useState } from "react";
import { Check, X, Bell } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

const Notification = () => {
  const themeColor = "#a32e76"; // Define theme color
  const notificationsData = [
    {
      id: 1,
      user: "DEEPA SANKAR",
      type: "request",
      time: "2 days ago",
      content: "I'm trying to conceive and thought your group will be useful for guidance.",
      hasReadMore: true,
    },
    {
      id: 2,
      user: "DEEPA SANKAR",
      type: "mention",
      time: "3 days ago",
      content: "Mentioned you in a comment",
    },
    {
      id: 3,
      user: "LifeCourse Admin",
      type: "approval",
      time: "4 days ago",
      content: "Congratulations! DR. Anjali Kumar. Your video is approved.",
    },
    {
      id: 4,
      user: "LifeCourse Admin",
      type: "denial",
      time: "5 days ago",
      content: "Need some changes in content. 1) point out the changes",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const handleSearch = (query: string) => setSearchQuery(query.toLowerCase());
  const handleTabChange = (tab: SetStateAction<string>) => setActiveTab(tab);

  // Filter notifications based on the active tab and search query
  const filteredNotifications = notificationsData.filter((notification) => {
    const matchesSearch =
      notification.user.toLowerCase().includes(searchQuery) ||
      notification.content.toLowerCase().includes(searchQuery);

    const matchesCategory =
      activeTab === "All" ||
      (activeTab === "Group joining request" && notification.type === "request") ||
      (activeTab === "Mentions" && notification.type === "mention") ||
      (activeTab === "Approved video" && notification.type === "approval") ||
      (activeTab === "Pending video" && notification.type === "denial");

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Render Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Render Header */}
        <Header onSearch={handleSearch} />

        {/* Notification Content */}
        <div className="p-4">
          {/* Tab Buttons */}
          <div className="mb-6 flex space-x-4">
            {["All", "Mentions", "Approved video", "Pending video", "Group joining request"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2.5 rounded-full text-sm ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-700 hover:bg-opacity-90"
                  }`}
                  style={{
                    backgroundColor: activeTab === tab ? themeColor : "#f8f8f8",
                  }}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab === "All" && <Bell className="w-4 h-4" />}
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-5 border rounded-xl shadow-sm flex justify-between items-start hover:shadow-md transition-shadow"
                >
                  {/* Notification Details */}
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-800">{notification.user}</div>
                      <div className="text-sm text-gray-500">
                        {notification.type === "request" ? "Requested" : "Mentioned"} {notification.time}
                      </div>
                      <div className="mt-2 text-gray-700">{notification.content}</div>
                      {notification.hasReadMore && (
                        <button
                          className="text-sm mt-2 hover:underline"
                          style={{ color: themeColor }}
                        >
                          Read more...
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {notification.type === "request" && (
                      <>
                        <button
                          className="p-2.5 rounded-full hover:bg-red-50 transition-colors"
                          style={{
                            backgroundColor: "#f8f8f8",
                            color: "#ff5a5a",
                          }}
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <button
                          className="p-2.5 rounded-full hover:bg-green-50 transition-colors"
                          style={{
                            backgroundColor: "#f8f8f8",
                            color: "#28a745",
                          }}
                        >
                          <Check className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    <button
                      className="px-6 py-2 rounded-full text-white text-sm hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: themeColor }}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">
                No notifications match your search or filter criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
