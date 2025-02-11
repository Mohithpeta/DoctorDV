import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { CheckCircle } from "lucide-react";
import { cn } from "../utils/cn";
import axios from "axios";

type Step = 1 | 2 | 3 | 4 | 5;

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    medicalID: "", // Using this for medical registration number
    workExperience: "",
    clinicName: "",
    motherhoodStage: "",
    role: "doctor", // Added role as doctor
    // Removed verificationFile as it's commented out in the second file
  });

  const handleNext = () => {
    setStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    if (step < 4) {
      handleNext();
    } else {
      try {
        const response = await axios.post("http://localhost:8000/auth/signup/doctor", formData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Doctor signed up:", response.data);
        setStep(5);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl border-2 border-[#A32E76]">
        {step < 5 ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "h-2 flex-1 rounded-full",
                      s <= step ? "bg-[#A32E76]" : "bg-gray-200",
                      s !== 4 && "mr-2"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-center text-gray-500">Step {step} of 4</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-semibold text-center text-[#A32E76] mb-6">
                    To Join as our Lifecourse Experts!
                  </h2>
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <Button
                    variant="google"
                    fullWidth
                    className="mt-4 border-[#A32E76] text-[#A32E76]"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    Continue with Google
                  </Button>
                  <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#A32E76] hover:text-[#871c5b]">
                      Login
                    </Link>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-semibold text-center text-[#A32E76] mb-6">
                    Complete Your Registration
                  </h2>
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Medical Registration Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                  <label className="block">
                    <span className="text-[#A32E76] font-medium">
                      Select Motherhood Stage Specialization
                    </span>
                    <select
                      value={formData.motherhoodStage}
                      onChange={(e) =>
                        setFormData({ ...formData, motherhoodStage: e.target.value })
                      }
                      className="mt-2 block w-full rounded-md border border-[#A32E76] bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A32E76] focus:ring-opacity-50 text-lg py-2 px-2"
                      required
                    >
                      <option value="" disabled>Select Motherhood Stage</option>
                      <option value="postpartum">Postpartum</option>
                      <option value="preconception">Preconception</option>
                      <option value="pregnancy">Pregnancy</option>
                      <option value="parenting">Parenting</option>
                    </select>
                  </label>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-2xl font-semibold text-center text-[#A32E76] mb-6">
                    Professional Information
                  </h2>
                  <Input
                    label="Years of Experience"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.workExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, workExperience: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Hospital / Clinic Name"
                    value={formData.clinicName}
                    onChange={(e) =>
                      setFormData({ ...formData, clinicName: e.target.value })
                    }
                    required
                  />
                  {/* Commented out file upload as per second file
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setFormData({ ...formData, verificationFile: file });
                        }}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-[#A32E76] hover:underline"
                      >
                        Upload Verification Documents (e.g., license, Aadhar ID)
                      </label>
                    </div>
                  </div>
                  */}
                </>
              )}

              {step === 4 && (
                <>
                  <div className="text-center mb-8">
                    <CheckCircle className="h-16 w-16 text-[#A32E76] mx-auto mb-4" />
                    <h2 className="text-xl font-medium text-[#A32E76]">
                      Verification typically takes 2-3 business days...
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                      You will receive an email upon approval
                    </p>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    className="bg-[#A32E76] hover:bg-[#871c5b] text-white"
                  >
                    Complete Registration
                  </Button>
                </>
              )}

              {step < 4 && (
                <Button
                  type="submit"
                  fullWidth
                  className="bg-[#A32E76] hover:bg-[#871c5b] text-white"
                >
                  Next
                </Button>
              )}
            </form>
          </>
        ) : (
          // Success Screen (Step 5)
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-[#A32E76] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#A32E76] mb-2">
              Registration Completed!
            </h2>
            <p className="text-gray-600 mb-6">
              Your account is being processed. Verification may take up to 24 hours.
            </p>
            <Link
              to="/login"
              className="block w-full text-center bg-[#A32E76] hover:bg-[#871c5b] text-white py-2 rounded-lg"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}