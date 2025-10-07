"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import cancelRoomBooking from "@/app/actions/cancelRoomBooking";
import { useEffect } from "react";

const CancelRoomBookingButton = ({ bookingId, roomId }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(async (prevState, formData) => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return { error: "Cancellation aborted" };
    }
    return await cancelRoomBooking(bookingId, roomId);
  }, {});

  // Handle form state feedback
  useEffect(() => {
    if (state.success) {
      toast.success("Booking cancelled successfully");
      router.push(`/bookings/${roomId}?success=true`);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router, roomId]);

  return (
    <form action={formAction}>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
      >
        Cancel Booking
      </button>
    </form>
  );
};

export default CancelRoomBookingButton;
