import { useState, useRef, useEffect, useMemo, MouseEvent, useCallback } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Plus, SlidersHorizontal, X, Upload } from "lucide-react";

interface CreateGroupForm {
  name: string;
  description: string;
  topic: string;
  isPrivate: boolean;
  type: 'free' | 'paid';
  price: string;
  image: File | null;
  rules: string;
}

export function Community() {
  const themeColor = "#A32E76";
  const [showFilters, setShowFilters] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterModalRef = useRef<HTMLDivElement>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]); // New state for active filters
  const [activeTypeFilters, setActiveTypeFilters] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CreateGroupForm>({
    name: '',
    description: '',
    topic: '',
    isPrivate: false,
    type: 'free',
    price: '',
    image: null,
    rules: ''
  });

  const categories = [
    { name: "Preconception", count: 10 }, // Added "count" for each category
    { name: "Pregnancy", count: 0 }, // Added "count" for each category
    { name: "Postpartum", count: 0 }, // Added "count" for each category
  ];

  const groups = useMemo(() => [
    {
      id: 1,
      title: "Mental Health in Preconception",
      image: "/api/placeholder/64/64",
      description: "This is a group to help people improve their mental health",
      category: "Preconception",
      price:"10$",
      createdAt: "12/12/2024",
      type: "Paid",
    },
    {
      id: 2,
      title: "Nutrition for Preconception",
      description: "This is a group to help people improve their nutrition",
      image: "/api/placeholder/64/64",
      category: "Preconception",
      type: "Free",
      createdAt: "10/12/2024",
    },
    {
      id: 3,
      title: "Healthy Pregnancy",
      description:"A group that helps pregnant women to be healthy",
      image: "/api/placeholder/64/64",
      category: "Pregnancy",
      type: "Paid",
      price:"20$",
      createdAt: "10/01/2024",
    },
  ], []);


  const toggleFilter = (categoryName: string) => {
    setActiveFilters((prevFilters) => {
      if (prevFilters.includes(categoryName)) {
        return prevFilters.filter((c) => c !== categoryName);
      } else {
        return [...prevFilters, categoryName];
      }
    });
  };
  const toggleTypeFilter = (filter: string) => {
    setActiveTypeFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

    // Close filters when clicking outside
    const handleOutsideClick = useCallback((event: globalThis.MouseEvent) => {
      if (
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    }, []);
  
    useEffect(() => {
      if (showFilters) {
        document.addEventListener("click", handleOutsideClick);
      } else {
        document.removeEventListener("click", handleOutsideClick);
      }
  
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, [showFilters, handleOutsideClick]);


  

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseTitle = group.title.toLowerCase();
      const lowerCaseDescription = group.description.toLowerCase();
      
      const matchesFilters = activeFilters.length === 0 || activeFilters.includes(group.category);
      const matchesTypeFilters = activeTypeFilters.length === 0 || activeTypeFilters.includes(group.type.toLowerCase());
      return (
        (lowerCaseTitle.includes(lowerCaseSearchQuery) || lowerCaseDescription.includes(lowerCaseSearchQuery))&&matchesFilters && matchesTypeFilters
      );
    });
  }, [groups, searchQuery, activeFilters, activeTypeFilters]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      // Close the modal when the "Escape" key is pressed
      if (e.key === 'Escape') {
        setShowCreateModal(false);
      }
    };

    if (showCreateModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showCreateModal]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG and PNG files are allowed');
        return;
      }
      setFormData({ ...formData, image: file }); // Update the form data with the new image
    }
  };

  // Function to handle clicking outside of the modal to close it
  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const isModalBackground = target.classList.contains('modal-background');

    if (isModalBackground) {
      // Close the modal if clicked outside
      setShowCreateModal(false);
    }
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setShowCreateModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setFormData({
        name: '',
        description: '',
        topic: '',
        isPrivate: false,
        type: 'free',
        price: '',
        image: null,
        rules: ''
      });
    }, 2000);
  };

  const CreateGroupModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 modal-background" onClick={handleModalClick}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[450px] max-h-[80vh] overflow-y-auto p-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Create New Group</h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleCreateGroup} className="space-y-6">
            <div>
            {/* Group Name */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Name
              </label>
              <input
                type="text"
                maxLength={50}
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter group name"
              />
            </div>

            <div>
              {/* Group Description */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Description
              </label>
              <textarea
                required
                maxLength={500}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="Write Description in maximum 50 words"
              />
            </div>

            <div>
               {/* Group Image */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Profile Photo
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept=".jpg,.jpeg,.png"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#A32E76] transition-colors"
              >
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="max-h-32 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, image: null });
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Click to upload photo from gallery</p>
                  </div>
                )}
              </div>
            </div>

            <div>
               {/* Group Type */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Type
                <span className="inline-block ml-1 text-gray-400">(i)</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={formData.type === 'free'}
                    onChange={() => setFormData({ ...formData, type: 'free', price: '' })}
                    className="text-[#A32E76] focus:ring-[#A32E76]"
                  />
                  <span>Free (Open to all users without any subscription fees)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={formData.type === 'paid'}
                    onChange={() => setFormData({ ...formData, type: 'paid' })}
                    className="text-[#A32E76] focus:ring-[#A32E76]"
                  />
                  <span>Paid (Requires members to pay a fee for access to this group)</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: themeColor }}

              className="w-full px-4 py-3 text-white rounded-lg hover:opacity-90"
            >
              Create group in preconception
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-50">
      <div className="text-center p-8">
        <div className="w-32 h-32 mx-auto mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#A32E76]">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
            <path
              d="M25,50 L45,70 L75,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[#A32E76]">Group Created Successfully</h3>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header
          placeholder="Search group"
          onSearch={(query) => {
            setSearchQuery(query);
            console.log("Search query:", query);
          }}
          username="Anjali Kumar"
          avatarUrl="/path-to-avatar.jpg"
        />
        <div className="flex-1 p-6">
          <div className="flex gap-4 mb-6">
            <button 
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm"
              style={{ backgroundColor: themeColor }}
            >
              Community
            </button>
            <button 
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm"
              style={{ backgroundColor: "#f8f8f8", color: themeColor }}
            >
              Group Management
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => toggleFilter(category.name)} // Use toggleFilter
                  className={`px-6 py-2.5 rounded-full text-sm ${
                    activeFilters.includes(category.name)
                      ? "bg-[#941E67] text-white"
                      : "bg-[#F8F8F8] text-[#A32E76]"
                  }`}
                >


                  {category.name}
                  {category.count > 0 && (
                    <span className="ml-1">({category.count})</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button
                ref={filterButtonRef}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm"
                style={{ backgroundColor: "#f8f8f8", color: themeColor }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm text-white"
                style={{ backgroundColor: themeColor }}
              >
                <Plus className="w-4 h-4" />
                Create Group
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm"
              >
                <img
                  src={group.image}
                  alt={group.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  
                  <h3 className="font-medium text-gray-800">{group.title}</h3>
                  <p className="text-sm text-gray-500">
                    Created on {group.createdAt}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    group.type === "Paid"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {group.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {showCreateModal && <CreateGroupModal />}
        {showSuccessModal && <SuccessModal />}


         {showFilters && (
            <div
              ref={filterModalRef}
              className="absolute top-20 right-6 bg-white shadow-lg p-6 rounded-lg z-50 w-64"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {/* Free Group */}
                  <button
                    onClick={() => toggleTypeFilter("free")}
                    className={`px-4 py-2 rounded-full text-sm ${activeTypeFilters.includes("free") ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    Free
                  </button>
                  {/* Paid Group */}
                  <button onClick={() => toggleTypeFilter("paid")} className={`px-4 py-2 rounded-full text-sm ${activeTypeFilters.includes("paid") ? "bg-orange-50 text-orange-600" : "bg-gray-100 text-gray-600"}`}>
                    Paid
                  </button>
                </div>
              </div>
            </div>

        )}
      </main>
    </div>
  );
}