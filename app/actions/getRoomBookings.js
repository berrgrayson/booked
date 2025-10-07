"use server";

import { createSessionClient, createAdminClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";

async function getRoomBookings(roomId) {
  const sessionCookie = (await cookies()).get("appwrite-session")?.value;
  if (!sessionCookie) {
    redirect("/login");
  }

  // Debug: Log roomId
  console.log("getRoomBookings: roomId =", roomId);

  if (!roomId) {
    return {
      error: "Room ID is missing",
    };
  }

  try {
    const { databases } = await createSessionClient(sessionCookie);

    // Get user's ID
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in to view room bookings",
      };
    }

    // Verify the user owns the room
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId
    );

    if (room.user_id !== user.id) {
      return {
        error: "You are not authorized to view bookings for this room",
      };
    }

    // Fetch bookings for the room
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal("room_id", roomId)]
    );

    // Fetch user details for each booking
    const bookingsWithUserDetails = await Promise.all(
      bookings.map(async (booking) => {
        try {
          const { users } = await createAdminClient();
          const user = await users.get(booking.user_id);
          return {
            ...booking,
            userName: user.name || "Unknown User",
            userEmail: user.email || "N/A",
          };
        } catch (error) {
          console.log(
            `Failed to get user details for user ID ${booking.user_id}:`,
            error
          );
          return {
            ...booking,
            userName: "Unknown User",
            userEmail: "N/A",
          };
        }
      })
    );

    return bookingsWithUserDetails;
  } catch (error) {
    console.log("Failed to get room bookings:", error);
    return {
      error: error.message || "Failed to get room bookings",
    };
  }
}

export default getRoomBookings;
