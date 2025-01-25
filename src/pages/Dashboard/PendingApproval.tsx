import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";

const PendingApproval = () => {
  const groups = [
    {
      id: 1,
      title: "Mental Health in Preconception",
      image: "/api/placeholder/64/64",
      category: "Preconception",
      price: "10$",
      createdAt: "2024-12-12",
      type: "Paid",
    },
    {
      id: 2,
      title: "Nutrition for Preconception",
      image: "/api/placeholder/64/64",
      category: "Preconception",
      type: "Free",
      createdAt: "2024-12-10",
    },
    {
      id: 3,
      title: "Healthy Pregnancy and Beyond",
      image: "https://via.placeholder.com/300x200",
      category: "Pregnancy",
      type: "Paid",
      price: "20$",
      createdAt: "2024-01-10",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="p-8">
          {/* Section Title */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#A32E76] font-bold text-3xl">
              Pending Approval Requests
            </h2>
          </div>

          {/* Responsive Group Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {groups.map((group) => (
              <div
                key={group.id}
                className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={group.image}
                    alt={group.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Pending Approval
                  </div>
                </div>

                {/* Group Details */}
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-base line-clamp-2 mb-2">
                    {group.title}
                  </h3>
                  <div className="text-sm text-gray-500 flex flex-col gap-1">
                    <p>Category: {group.category}</p>
                    <p>Requested on: {new Date(group.createdAt).toLocaleDateString()}</p>
                    <p>
                      Type: {group.type}
                      {group.type === "Paid" && ` (${group.price})`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
