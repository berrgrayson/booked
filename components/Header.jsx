"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import {
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaBuilding,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import destroySession from "@/app/actions/destroySession";
import { useAuth } from "@/context/authContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    const { success, error } = await destroySession();
    if (success) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      toast.error(error || "Logout failed");
    }
  };

  return (
    <header className="bg-gray-100 border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                className="h-10 w-10 rounded-full"
                src={logo}
                alt="Booked"
                priority
              />
              <span className="ml-3 text-xl font-semibold text-gray-900 hidden sm:block">
                Booked
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition"
            >
              Rooms
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/bookings"
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Bookings
                </Link>
                <Link
                  href="/rooms/add"
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Add Room
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 flex items-center gap-1 font-medium"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  href="/register"
                  className="text-gray-700 hover:text-gray-900 flex items-center gap-1 font-medium"
                >
                  <FaUser /> Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/rooms/my"
                  className="text-gray-700 hover:text-gray-900 flex items-center gap-1 font-medium"
                >
                  <FaBuilding /> My Rooms
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 flex items-center gap-1 font-medium transition"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="space-y-1 px-4 py-3">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rooms
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    href="/bookings"
                    className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bookings
                  </Link>
                  <Link
                    href="/rooms/add"
                    className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add Room
                  </Link>
                  <Link
                    href="/rooms/my"
                    className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Rooms
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
