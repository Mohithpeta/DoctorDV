import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { CheckCircle } from "lucide-react";
import { cn } from "../utils/cn";

type Step = 1 | 2 | 3 | 4;

export function Register() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    workExperience: "",
    clinicName: "",
    verificationFile: null as File | null,
    interests: [] as string[],
  });

  const handleNext = () => {
    setStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
    } else {
      console.log("Submit:", formData);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto" >

        <div className="bg-white p-8 rounded-3xl shadow-lg w-full">
          {step < 5 ? (
            <>
              {/* Progress Dots */}
              <div className="mb-8">
                <div className="flex justify-center items-center mb-4 gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={cn(
                        "w-3 h-3 rounded-full transition-colors",
                        s === step
                          ? "bg-[#a32e76]"
                          : s < step
                          ? "bg-[#a32e76] opacity-50"
                          : "bg-gray-200"
                      )}
                    />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <h2 className="text-xl font-medium text-center mb-6">
                      To Join as our Lifecourse Experts!
                      <br />
                      <span className="text-[#a32e76]">Signup!</span>
                    </h2>
                    <Input
                      type="email"
                      placeholder="Enter E-mail id"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="rounded-xl px-4 py-3 border-gray-200"
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="rounded-xl px-4 py-3 border-gray-200"
                      required
                    />
                    <Button
                      type="submit"
                      fullWidth
                      className="bg-[#a32e76] hover:bg-[#821e5e] text-white rounded-xl py-3"
                    >
                      Next
                    </Button>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                      </div>
                    </div>
                    <Button
                      variant="google"
                      fullWidth
                      className="rounded-xl py-3 border border-gray-200"
                    >
                      <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="w-5 h-5 mr-2"
                      />
                      Continue with Google
                    </Button>
                    <p className="text-center text-sm mt-6">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-[#a32e76] hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-xl font-medium text-center mb-6">
                      Complete Your Registration
                      <br />
                      <span className="text-[#a32e76] text-sm">
                        Please provide accurate details for verification
                      </span>
                    </h2>
                    <Input
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="rounded-xl px-4 py-3 border-gray-200"
                      required
                    />
                    <Input
                      placeholder="Enter Medical Registration Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="rounded-xl px-4 py-3 border-gray-200"
                      required
                    />
                    <select
                      className="w-full rounded-xl px-4 py-3 border border-gray-200 bg-white"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select Motherhood Stage
                      </option>
                      <option value="postpartum">Postpartum</option>
                      <option value="preconception">Preconception</option>
                      <option value="pregnancy">Pregnancy</option>
                      <option value="parenting">Parenting</option>
                    </select>
                    <Button
                      type="submit"
                      fullWidth
                      className="bg-[#a32e76] hover:bg-[#821e5e] text-white rounded-xl py-3 mt-4"
                    >
                      Next
                    </Button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-xl font-medium text-center mb-6">
                      Let Lifecourse Know about You
                      <br />
                        You'll know everything through the course
                    </h2>
                    <Input
                      placeholder="Enter years in numbers"
                      label="Years of work experience"
                      value={formData.workExperience}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= 100) {
                          setFormData({
                            ...formData,
                            workExperience: e.target.value,
                          });
                        }
                      }}
                      type="number"
                      min="0"
                      max="100"
                      className="rounded-xl px-4 py-3 border-gray-200"
                      required
                    />
                    <Input
                      placeholder="Enter Hospital / Clinic Name"
                      label="Hospital / Clinic Name"
                      value={formData.clinicName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clinicName: e.target.value,
                        })
                      }
                      className="rounded-xl px-4 py-3 border-gray-200"
                      required
                    />
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
                          className="cursor-pointer text-[#a32e76] hover:underline"
                        >
                          Upload Verification Documents (e.g., license, Aadhar ID)
                        </label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      fullWidth
                      className="bg-[#a32e76] hover:bg-[#821e5e] text-white rounded-xl py-3 mt-4"
                    >
                      Submit for Verification
                    </Button>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="text-center mb-8">
                      <CheckCircle className="h-16 w-16 text-[#a32e76] mx-auto mb-4" />
                      <h2 className="text-xl font-medium text-[#a32e76]">
                        Verification typically takes 2-3 business days...
                      </h2>
                      <p className="text-sm text-gray-600 mt-2">
                        You will receive an email upon approval
                      </p>
                    </div>
                    <Link to="/login" >
                    <Button
                      type="submit"
                      fullWidth
                      className="bg-[#a32e76] hover:bg-[#821e5e] text-white rounded-xl py-3"
                    >
                      SUBMITTED SUCCESSFULLY
                    </Button>
                    </Link>
                  </>
                )}
              </form>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-[#a32e76] mx-auto mb-4" />
              <h2 className="text-xl font-medium text-[#a32e76] mb-2">
                Registration Completed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your account is being processed. Verification may take up to 24
                hours.
              </p>
              <Link to="/login">
                <Button
                  fullWidth
                  className="bg-[#a32e76] hover:bg-[#821e5e] text-white rounded-xl py-3"
                >
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
