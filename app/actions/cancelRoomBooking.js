"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import checkAuth from "./checkAuth";

async function cancelRoomBooking(bookingId, roomId) {
  const sessionCookie = (await cookies()).get("appwrite-session")?.value;
  if (!sessionCookie) {
    return {
      error: "You must be logged in to cancel a booking",
    };
  }

  try {
    const { databases } = await createSessionClient(sessionCookie);

    // Get user's ID
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in to cancel a booking",
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
        error: "You are not authorized to cancel bookings for this room",
      };
    }

    // Verify the booking exists and belongs to the room
    const booking = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    if (booking.room_id !== roomId) {
      return {
        error: "This booking does not belong to the specified room",
      };
    }

    // Delete the booking
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to cancel room booking:", error);
    return {
      error: error.message || "Failed to cancel booking",
    };
  }
}

export default cancelRoomBooking;
