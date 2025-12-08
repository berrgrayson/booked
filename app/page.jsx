import Heading from "@/components/Heading";
import RoomCard from "@/components/RoomCard";
import getAllRooms from "./actions/getAllRooms";
import { FaWifi, FaPlug, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export const dynamic = "force-dynamic"; // This line forces dynamic rendering

export default async function Home() {
  const rooms = await getAllRooms();

  return (
    <>
      {/* === HERO / INTRO SECTION === */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Work Without Interruptions
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Find reliable workspaces across Bujumbura with stable electricity
            and fast internet. We connect you to places where you can stay
            focused and efficient.
          </p>

          {/* Feature Highlights – Optional but looks great */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <FaPlug className="text-3xl text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Stable Power
              </span>
            </div>
            <div className="flex flex-col items-center">
              <FaWifi className="text-3xl text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Fast Internet
              </span>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Bujumbura Wide
              </span>
            </div>
            <div className="flex flex-col items-center">
              <FaClock className="text-3xl text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Book by Hour
              </span>
            </div>
          </div>
        </div>
      </section>

      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} key={room.$id} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
}
