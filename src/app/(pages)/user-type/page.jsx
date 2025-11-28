"use client";
import { NAVIGATION_ROUTES } from "@/app/constant";
import BackArrow from "@/components/custom/back_arrow";
import { Typography } from "@/components/custom/typography";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckUser() {
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  const handleRoleChange = (role) => {
    setUserRole(userRole === role ? null : role);
  };

  const handleSubmit = () => {
    if (userRole) {
      // Save to localStorage
      localStorage.setItem("userRole", userRole);

      // Show success toast
      if (userRole === "tenant") {
        toast.success("Role Selected! USER", {
          description: "Redirecting to browse rooms...",
        });

        // Redirect to UI page for tenants
        setTimeout(() => {
          router.push(NAVIGATION_ROUTES.UIPAGE);
        }, 1000);
      } else if (userRole === "host") {
        toast.success("Role Selected! HOST", {
          description: "Redirecting to add rooms...",
        });

        // Redirect to add room page for hosts
        setTimeout(() => {
          router.push(NAVIGATION_ROUTES.ADD_ROOM);
        }, 1000);
      }
    } else {
      // Show error toast if no role selected
      toast.error("No Role Selected", {
        description: "Please select a role to continue.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10 text-center">
      <BackArrow />
      <div className="max-w-4xl w-full">
        <Typography variant="h2" className="text-center mb-20">
          Which kind of role are you looking for?
        </Typography>

        <div className="grid md:grid-cols-2 gap-6 m-8">
          {/* Tenant Option */}
          <button
            onClick={() => handleRoleChange("tenant")}
            className={`
              relative h-auto min-h-[200px] cursor-pointer text-left
              flex flex-col items-start gap-4 rounded-lg border-2 p-6
              transition-all duration-200 hover:shadow-lg overflow-hidden
              ${
                userRole === "tenant"
                  ? "border-blue-600 bg-blue-50 shadow-md dark:border-blue-700 dark:bg-blue-950"
                  : "border-blue-600 bg-blue-400 hover:border-blue-700 dark:border-blue-700 dark:bg-blue-900"
              }
            `}
          >
            {userRole === "tenant" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="bg-blue-600/20 rounded-full p-4 animate-in zoom-in duration-300">
                  <Check className="w-24 h-24 text-black-600 stroke-[4]" />
                </div>
              </div>
            )}

            <div className="relative grid gap-2 w-full z-10">
              <Typography variant="h4" className="text-lg font-semibold">
                I am looking for rental rooms
              </Typography>
              <Typography
                variant="paraPrimary"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                You can search and browse properties available for rent.
              </Typography>
            </div>
          </button>

          {/* Host Option */}
          <button
            onClick={() => handleRoleChange("host")}
            className={`
              relative h-auto min-h-[200px] cursor-pointer text-left
              flex flex-col items-start gap-4 rounded-lg border-2 p-6
              transition-all duration-200 hover:shadow-lg overflow-hidden
              ${
                userRole === "host"
                  ? "border-red-600 bg-red-50 shadow-md dark:border-red-700 dark:bg-red-950"
                  : "border-gray-200 bg-red-400 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              }
            `}
          >
            {userRole === "host" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="bg-red-600/20 rounded-full p-4 animate-in zoom-in duration-300">
                  <Check className="w-24 h-24 text-black-600 stroke-[4]" />
                </div>
              </div>
            )}

            <div className="relative grid gap-2 w-full z-10 ">
              <Typography variant="h4" className="text-lg font-semibold">
                I want to add/host rooms
              </Typography>
              <Typography
                variant="paraPrimary"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                You can list and manage properties you want to rent out.
              </Typography>
            </div>
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!userRole}
            className="px-8 py-6 text-lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
