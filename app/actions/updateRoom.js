"use server";

import { createSessionClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

async function updateRoom(roomId, formData) {
  const sessionCookie = (await cookies()).get("appwrite-session")?.value;
  if (!sessionCookie) {
    return {
      error: "You must be logged in to update a room",
    };
  }

  try {
    const { account, databases, storage } = await createSessionClient(
      sessionCookie
    );

    // Get user's ID
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in to update a room",
      };
    }

    // Verify the room belongs to the user
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId
    );

    if (room.user_id !== user.id) {
      return {
        error: "You are not authorized to update this room",
      };
    }

    // Handle image update
    let imageID = room.image; // Keep existing image by default
    const image = formData.get("image");

    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        // Delete existing image if it exists
        if (imageID) {
          await storage.deleteFile(
            process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
            imageID
          );
        }
        // Upload new image
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
          ID.unique(),
          image
        );
        imageID = response.$id;
      } catch (error) {
        console.log("Error handling image update:", error);
        return {
          error: "Error uploading image",
        };
      }
    }

    // Update room document
    const updatedRoom = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId,
      {
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        capacity: formData.get("capacity"),
        location: formData.get("location"),
        address: formData.get("address"),
        availability: formData.get("availability"),
        price_per_hour: formData.get("price_per_hour"),
        amenities: formData.get("amenities"),
        image: imageID,
      }
    );

    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to update room:", error);
    return {
      error: error.response?.message || "An unexpected error occurred",
    };
  }
}

export default updateRoom;
