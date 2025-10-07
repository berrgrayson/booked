import Link from "next/link";
import CancelRoomBookingButton from "./CancelRoomBookingButton";

const RoomBookingCard = ({ booking }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <p className="text-sm text-gray-600">
          <strong>Booked by:</strong> {booking.userName} ({booking.userEmail})
        </p>
        <p className="text-sm text-gray-600">
          <strong>Check In:</strong> {formatDate(booking.check_in)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Check Out:</strong> {formatDate(booking.check_out)}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${booking.room_id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Room
        </Link>
        <CancelRoomBookingButton
          bookingId={booking.$id}
          roomId={booking.room_id}
        />
      </div>
    </div>
  );
};

export default RoomBookingCard;
