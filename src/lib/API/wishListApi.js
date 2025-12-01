const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

/**
 * Get user's wishlist
 */
export const getWishlist = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    // Removed /api from path below
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch wishlist");
    }

    return data;
  } catch (error) {
    console.error("Get wishlist error:", error);
    throw error;
  }
};


/**
 * Add room to wishlist
 */
export const addToWishlist = async (roomId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    // Removed /api from path below
    const response = await fetch(`${API_BASE_URL}/wishlist/add/${roomId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add to wishlist");
    }

    return data;
  } catch (error) {
    console.error("Add to wishlist error:", error);
    throw error;
  }
};

// Similarly update other fetch calls...

export const removeFromWishlist = async (roomId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/wishlist/remove/${roomId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove from wishlist");
    }

    return data;
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    throw error;
  }
};

export const clearWishlist = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/wishlist/clear`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to clear wishlist");
    }

    return data;
  } catch (error) {
    console.error("Clear wishlist error:", error);
    throw error;
  }
};

export const checkInWishlist = async (roomId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/wishlist/check/${roomId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to check wishlist");
    }

    return data;
  } catch (error) {
    console.error("Check wishlist error:", error);
    throw error;
  }
};

/**
 * Toggle wishlist status
 */
export const toggleWishlist = async (roomId, isInWishlist) => {
  try {
    if (isInWishlist) {
      return await removeFromWishlist(roomId);
    } else {
      return await addToWishlist(roomId);
    }
  } catch (error) {
    console.error("Toggle wishlist error:", error);
    throw error;
  }
};

export default {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkInWishlist,
  toggleWishlist,
};
