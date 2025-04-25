import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CoursesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  // Course data based on the image
  const courses = [
    {
      id: 1,
      title: "Managing Postpartum Hypertension: A Comprehensive Guide",
      image: "/doctor-image.jpg",
      category: "Hypertension",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
    {
      id: 2,
      title: "A course on Managing Urinary Incontinence",
      image: "/doctor-image.jpg",
      category: "Urinary Incontinence",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
    {
      id: 3,
      title: "Managing Depression: A complete course",
      image: "/doctor-image.jpg",
      category: "Depression",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
    {
      id: 4,
      title: "A Complete Course to manage Postpartum Anxiety",
      image: "/doctor-image.jpg",
      category: "Postpartum Anxiety",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
    {
      id: 5,
      title: "To overcome Secondary Infertility: Full Course",
      image: "/doctor-image.jpg",
      category: "Secondary Infertility",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
    {
      id: 6,
      title: "To recover from Pelvic Organ Prolapse with best practices",
      image: "/doctor-image.jpg",
      category: "Pelvic Organ Prolapse",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
    {
      id: 7,
      title: "A course to overcome Dyspareunia",
      image: "/doctor-image.jpg",
      category: "Dyspareunia",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
    {
      id: 8,
      title: "Comprehensive course to reduce Obesity",
      image: "/doctor-image.jpg",
      category: "Obesity",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
    {
      id: 9,
      title: "A full course on Practical tips to reduce Backpain",
      image: "/doctor-image.jpg",
      category: "Backpain",
      instructorName: "LifeCourse",
      type: "Course",
      level: "How to train healthcare providers",
    },
  ];

  // Filter categories based on the image
  const categories = [
    { id: "all", name: "All" },
    { id: "hypertension", name: "Hypertension" },
    { id: "urinary-incontinence", name: "Urinary Incontinence" },
    { id: "depression", name: "Depression" },
    { id: "postpartum-anxiety", name: "Postpartum Anxiety" },
    { id: "secondary-infertility", name: "Secondary Infertility" },
    { id: "pelvic-organ-prolapse", name: "Pelvic Organ Prolapse" },
    { id: "dyspareunia", name: "Dyspareunia" },
    { id: "obesity", name: "Obesity" },
    { id: "backpain", name: "Backpain" },
    { id: "anal-incontinence", name: "Anal Incontinence" },
  ];

  // Filter courses based on selected category
  const filteredCourses = activeFilter === "all" 
    ? courses 
    : courses.filter(course => course.category.toLowerCase() === activeFilter.replace("-", " "));

  return (
    <div className="flex h-screen overflow-hidden max-w-[1920px] max-h-[1080px] mx-auto bg-[#F5F6FF]">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-[220px] z-20 bg-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-[220px]">
        {/* Header */}
        <div className="fixed top-0 left-[220px] right-0 z-10 bg-[#F5F6FF]">
          <Header />
        </div>

        <div className="pt-20 px-8 pb-12 overflow-y-auto">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category.id
                    ? "bg-[#6A4BFF] text-white"
                    : "bg-white text-[#6A4BFF] hover:bg-[#E9E9FF]"
                } border border-[#6A4BFF]`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Courses grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Course image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/api/placeholder/400/300" 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Course content */}
                <div className="p-4">
                  {/* Category with heart icon */}
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 mr-2">
                      <svg className="w-full h-full text-[#6A4BFF]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-[#6A4BFF]">{course.category}</p>
                  </div>
                  
                  {/* Course title */}
                  <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                  
                  {/* Instructor info */}
                  <div className="flex items-center mb-2">
                    <p className="text-xs text-gray-600">
                      <span className="text-[#6A4BFF] font-medium">LifeCourse</span> • <span className="text-gray-500">Course</span>
                    </p>
                  </div>
                  
                  {/* Level info */}
                  <p className="text-xs text-gray-400 mb-4">How to train healthcare providers</p>
                  
                  {/* View course button */}
                  <button 
                    className="w-full bg-[#6A4BFF] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#5A3BFF] transition-colors flex items-center justify-center"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    VIEW FULL COURSE →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}