"use server";

import Heading from "@/components/Heading";
import getRoomBookings from "@/app/actions/getRoomBookings";
import getRoomName from "@/app/actions/getRoomName";
import RoomBookingCard from "@/components/RoomBookingCard";
import Link from "next/link";
import { cookies } from "next/headers";
import { FaChevronLeft } from "react-icons/fa";

export default async function RoomBookingsPage({ params, searchParams }) {
  const { id } = await params; // Unwrap room ID from params
  const { success } = await searchParams; // Unwrap searchParams
  const sessionCookie = (await cookies()).get("appwrite-session")?.value;
  const bookings = await getRoomBookings(id); // Pass id directly

  // Check for error response
  if ("error" in bookings) {
    return <p className="text-red-600 mt-4">{bookings.error}</p>;
  }

  // Fetch room name
  const roomName = await getRoomName(id, sessionCookie);

  return (
    <>
      <Link
        href="/rooms/my"
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <FaChevronLeft className="inline mr-1" />
        Back to My Rooms
      </Link>
      <Heading title={`Bookings for ${roomName}`} />
      {success === "true" && (
        <p className="text-green-600 mb-4">Booking canceled successfully!</p>
      )}
      {bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">No bookings for this room</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.$id}>
            <RoomBookingCard booking={booking} />
          </div>
        ))
      )}
    </>
  );
}
