"use client";

import { getAllRooms } from "@/lib/API/roomApi";
import { Bath, Bed, MapPin, Heart, Home as HomeIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Typography } from "./typography";

// FINAL getImageUrl Function
const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") ||
    "https://rosca-be.vercel.app/";

  const cleanPath = image.startsWith("/") ? image.slice(1) : image;

  return `${baseUrl}/${cleanPath}`;
};

export default function Main() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in using authToken (matches your login/signup flow)
    const authToken = localStorage.getItem("authToken");
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    setIsLoggedIn(!!authToken && userLoggedIn === "true");
    
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await getAllRooms();

      if (response.success) {
        setRooms(response.data || []);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (roomId) => {
    if (!isLoggedIn) {
      toast.error("Please login to view room details", {
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
        duration: 4000,
      });
      return;
    }
    router.push(`/item-details/${roomId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <Typography variant="paraPrimary" className="mt-6 text-gray-700 font-medium">
            Loading amazing rooms...
          </Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <Typography variant="h2" className="text-red-600 mb-3">
            Error loading rooms
          </Typography>
          <Typography variant="paraPrimary" className="mb-6 text-gray-600">
            {error}
          </Typography>
          <Button onClick={fetchRooms} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <section className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Typography variant="h1" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Room
          </Typography>
          <Typography variant="paraPrimary" className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover comfortable and affordable rooms in prime locations
          </Typography>
        </div>

        {/* Login Banner for Non-logged Users */}
        {!isLoggedIn && (
          <div className="mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <Typography variant="h3" className="text-lg font-bold">
                    Want to see more details?
                  </Typography>
                  <Typography variant="paraPrimary" className="text-white/90 text-sm">
                    Login to view full room details and contact owners
                  </Typography>
                </div>
              </div>
              <Button 
                onClick={() => router.push("/login")}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                Login Now
              </Button>
            </div>
          </div>
        )}

        {rooms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HomeIcon className="h-12 w-12 text-gray-400" />
            </div>
            <Typography variant="h3" className="text-gray-800 text-2xl font-bold mb-3">
              No rooms available at the moment
            </Typography>
            <Typography variant="paraPrimary" className="text-gray-600">
              Check back later for new listings
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Room Image */}
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  {room.images && room.images.length > 0 ? (
                    <>
                      <Image
                        src={getImageUrl(room.images[0])}
                        alt={room.roomTitle}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized={process.env.NODE_ENV === "development"}
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Like Button */}
                      <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110">
                        <Heart className="h-5 w-5 text-gray-700" />
                      </button>

                      {/* Image Count Badge */}
                      {room.images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                          +{room.images.length} photos
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <HomeIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <span className="text-sm">No Image Available</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <div className="mb-3">
                    <Typography variant="h3" className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {room.roomTitle}
                    </Typography>

                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1.5 text-red-500 flex-shrink-0" />
                      <Typography
                        variant="paraSecondary"
                        className="line-clamp-1 text-sm"
                      >
                        {room.location}
                      </Typography>
                    </div>

                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {room.type}
                    </span>
                  </div>

                  {/* Facilities */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    <span className="flex items-center gap-1.5">
                      <Bed className="h-4 w-4 text-blue-600" /> 
                      <span className="font-medium">{room.beds || 1}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="h-4 w-4 text-purple-600" /> 
                      <span className="font-medium">{room.bathrooms || 1}</span>
                    </span>
                  </div>

                  {/* Amenities */}
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.slice(0, 2).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium border border-green-200"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 2 && (
                        <span className="text-xs text-gray-500 px-2.5 py-1 font-medium">
                          +{room.amenities.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <Typography
                        variant="h4"
                        className="text-2xl font-bold text-gray-900"
                      >
                        ₹{room.price}
                      </Typography>
                      <span className="text-sm text-gray-500">per month</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleViewDetails(room._id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {isLoggedIn ? "View Details" : "Login to View Details"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}