"use server";

import Heading from "@/components/Heading";
import getMyBookings from "../actions/getMyBookings";
import getRoomName from "../actions/getRoomName";
import BookedRoomCard from "@/components/BookedRoomCard";
import { cookies } from "next/headers";

const BookingsPage = async () => {
  const sessionCookie = (await cookies()).get("appwrite-session")?.value;
  const bookings = await getMyBookings();

  // Check for error response
  if ("error" in bookings) {
    return <p className="text-red-600 mt-4">{bookings.error}</p>;
  }

  // Fetch room names for each booking
  const bookingsWithRoomNames = await Promise.all(
    bookings.map(async (booking) => ({
      ...booking,
      roomName: await getRoomName(booking.room_id, sessionCookie),
    }))
  );

  // console.log("Bookings with room names:", bookingsWithRoomNames);

  return (
    <>
      <Heading title="My Bookings" />
      {bookingsWithRoomNames.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no bookings</p>
      ) : (
        bookingsWithRoomNames.map((booking) => (
          <div key={booking.$id}>
            <BookedRoomCard key={booking.$id} booking={booking} />
          </div>
        ))
      )}
    </>
  );
};

export default BookingsPage;
