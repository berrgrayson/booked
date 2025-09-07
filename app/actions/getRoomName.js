"use server";

import { createSessionClient } from "@/config/appwrite";

async function getRoomName(roomId, sessionCookie) {
  try {
    const { databases } = await createSessionClient(sessionCookie);
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId
    );
    return room.name || "Unknown Room"; // Return name or fallback
  } catch (error) {
    console.log(`Failed to get room name for ID ${roomId}:`, error);
    return "Unknown Room"; // Fallback for errors or missing room
  }
}

export default getRoomName;
