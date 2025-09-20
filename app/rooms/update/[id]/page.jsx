import Heading from "@/components/Heading";
import getSingleRoom from "@/app/actions/getSingleRoom";
import updateRoom from "@/app/actions/updateRoom";
import { redirect } from "next/navigation";

export default async function UpdateRoomPage({ params }) {
  const { id } = await params; // Unwrap params in server component
  const room = await getSingleRoom(id);

  if (!room) {
    redirect("/rooms/my");
  }

  async function handleFormAction(formData) {
    "use server";
    const result = await updateRoom(id, formData);
    if (result.success) {
      redirect("/rooms/my");
    }
    return result;
  }

  return (
    <>
      <Heading title={`Update Room: ${room.name}`} />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <form action={handleFormAction} encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Room Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter a name (Large Conference Room)"
              defaultValue={room.name}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border rounded w-full h-24 py-2 px-3"
              placeholder="Enter a description for the room"
              defaultValue={room.description}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="sqft"
              className="block text-gray-700 font-bold mb-2"
            >
              Square Meters
            </label>
            <input
              type="number"
              id="sqft"
              name="sqft"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter room size in m"
              defaultValue={room.sqft}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="capacity"
              className="block text-gray-700 font-bold mb-2"
            >
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              className="border rounded w-full py-2 px-3"
              placeholder="Number of people the room can hold"
              defaultValue={room.capacity}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price_per_hour"
              className="block text-gray-700 font-bold mb-2"
            >
              Price Per Hour
            </label>
            <input
              type="number"
              id="price_per_hour"
              name="price_per_hour"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter price per hour"
              defaultValue={room.price_per_hour}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter full address"
              defaultValue={room.address}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-bold mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="border rounded w-full py-2 px-3"
              placeholder="Location (Building, Floor, Room)"
              defaultValue={room.location}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="availability"
              className="block text-gray-700 font-bold mb-2"
            >
              Availability
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
              className="border rounded w-full py-2 px-3"
              placeholder="Availability (Monday - Friday, 9am - 5pm)"
              defaultValue={room.availability}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="amenities"
              className="block text-gray-700 font-bold mb-2"
            >
              Amenities
            </label>
            <input
              type="text"
              id="amenities"
              name="amenities"
              className="border rounded w-full py-2 px-3"
              placeholder="Amenities CSV (projector, whiteboard, etc.)"
              defaultValue={room.amenities}
              required
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="border rounded w-full py-2 px-3"
              accept="image/*"
            />
            {room.image && (
              <p className="text-sm text-gray-600 mt-2">
                Current image: {room.image} (uploading a new image will replace
                the current one)
              </p>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Room
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
