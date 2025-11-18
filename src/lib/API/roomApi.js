const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function getAllRooms() {
  try {
    const response = await fetch(`${baseUrl}/rooms`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch rooms");
    }

    return response.json();
  } catch (error) {
    console.error("Get all rooms error:", error);
    throw error;
  }
}

export async function getRoomById(id) {
  try {
    const response = await fetch(`${baseUrl}/rooms/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch room");
    }

    return response.json();
  } catch (error) {
    console.error("Get room by ID error:", error);
    throw error;
  }
}

export async function addRoom(formData) {
  try {
    console.log("📤 ═══════════════════════════════════════");
    console.log("📤 Sending room data to:", `${baseUrl}/rooms`);

    // Log FormData contents
    console.log("📤 FormData contents:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `  ${key}: [File] ${value.name} (${value.type}, ${value.size} bytes)`
        );
      } else {
        console.log(`  ${key}:`, value);
      }
    }
    console.log("📤 ═══════════════════════════════════════");

    const response = await fetch(`${baseUrl}/rooms`, {
      method: "POST",
      // CRITICAL: Don't set Content-Type header for FormData!
      // Browser will automatically set it with the correct boundary
      body: formData,
    });

    console.log("📥 Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Server error:", errorData);
      throw new Error(errorData.message || "Failed to add room");
    }

    const data = await response.json();
    console.log("✅ Success:", data);
    return data;
  } catch (error) {
    console.error("❌ Add room error:", error);
    throw error;
  }
}

export async function updateRoom(id, roomData) {
  try {
    const response = await fetch(`${baseUrl}/rooms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update room");
    }

    return response.json();
  } catch (error) {
    console.error("Update room error:", error);
    throw error;
  }
}

export async function deleteRoom(id) {
  try {
    const response = await fetch(`${baseUrl}/rooms/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete room");
    }

    return response.json();
  } catch (error) {
    console.error("Delete room error:", error);
    throw error;
  }
}
