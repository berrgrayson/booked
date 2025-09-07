# Room Booking App

## Overview

This is a full-stack web application built for booking meeting rooms, conference rooms, or co-working spaces. It allows users to browse available rooms, view details, book rooms based on availability, manage their own rooms (add, delete), and handle bookings (view, cancel). The app uses a modern tech stack with Next.js for the frontend and Appwrite as the backend service for authentication, database management, storage, and more.

The project was developed incrementally through a series of commits, starting from initializing the Next.js app, setting up UI components, integrating backend services, implementing authentication and authorization, adding core features like room management and bookings, and finally deploying to Vercel.

Repository: [https://github.com/berrgrayson/booked](https://github.com/berrgrayson/booked)  
Live Demo: [https://booked-pearl.vercel.app/](https://booked-pearl.vercel.app/)

## Features

- **User Authentication**: Secure login, registration, and logout functionality with session management.
- **Room Browsing**: Homepage displays a list of available rooms with cards showing key details (e.g., name, description, capacity, image).
- **Room Details**: Dedicated page for each room, including images and availability checks.
- **Room Management**: Authenticated users can add new rooms with details and images, view their own rooms, and delete rooms they own.
- **Booking System**: Users can book rooms by submitting a form, check room availability to avoid conflicts, view their bookings, and cancel bookings.
- **Notifications**: Integrated toast notifications for user feedback (e.g., success messages, errors).
- **Protected Routes**: Middleware and authentication wrappers ensure only authorized users access certain pages (e.g., adding rooms, viewing bookings).
- **Data Persistence**: Rooms and bookings stored in a database with collections for rooms and bookings. Image uploads handled via storage buckets.
- **Responsive UI**: Components like headers, footers, headings, and cards for a clean, modular interface.

## Technologies Used

- **Frontend Framework**: Next.js (for server-side rendering, routing, and API routes).
- **Backend Service**: Appwrite (for database, authentication, storage, and permissions).
- **UI Components**: Custom React components (e.g., Header, Footer, RoomCard, Heading, DeleteRoomButton, BookedRoomCard, BookingForm, CancelBookingButton, MyRoomCard, AuthWrapper).
- **Notifications**: React Toastify for user-friendly alerts.
- **State Management**: Global authentication context for managing user sessions and auth state.
- **Data Fetching**: Appwrite clients for querying rooms, users, and bookings (e.g., get all rooms, get single room).
- **Environment Management**: Environment variables for secure configuration (e.g., API keys).
- **Deployment**: Vercel for hosting the application.
- **Other**: JSON data for initial prototyping (rooms.json), middleware for route protection, custom styles (globals.css).

## Project Structure

The app follows a standard Next.js structure with additional backend integration. Below is the project tree:

```
booked
├─ .gitignore
├─ README.md
├─ app
│  ├─ actions
│  ├─ bookings
│  ├─ login
│  ├─ register
│  └─ rooms
│     ├─ [id]
│     ├─ add
│     └─ my
├─ assets
├─ components
├─ config
├─ context
├─ data
├─ jsconfig.json
├─ middleware.js
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
└─ public
```

- **Pages**:

  - Homepage (`/`, page.jsx): Displays list of rooms.
  - Room Details (`/rooms/[id]`, page.jsx): Shows single room info and image.
  - Add Room (`/rooms/add`, page.jsx): Form for adding new rooms.
  - My Rooms (`/rooms/my`, page.jsx): List of user-owned rooms with delete options.
  - Bookings (`/bookings`, page.jsx): Page to view and manage bookings.
  - Login/Register (`/login`, `/register`, page.jsx): Authentication forms.

- **Components**: Reusable UI elements like AuthWrapper, BookedRoomCard, BookingForm, CancelBookingButton, DeleteRoomButton, Footer, Header, Heading, MyRoomCard, RoomCard.

- **Actions**: Server-side functions for operations like bookRoom, cancelBooking, checkAuth, checkRoomAvailability, createRoom, createSession, createUser, deleteRoom, destroySession, getAllRooms, getMyBookings, getMyRooms, getRoomName, getSingleRoom.

- **Config**: appwrite.js for Appwrite client setup.

- **Context**: authContext.js for global auth state management.

- **Data**: rooms.json for initial mocked room data.

- **Assets/Public**: Images (logo.png, no-image.jpg, room images), styles (globals.css).

- **Other**: middleware.js for route protection, next.config.mjs for Next.js config, jsconfig.json for JS config, postcss.config.mjs for PostCSS.

- **Database (Appwrite)**:
  - Collections: Rooms (attributes managed via Appwrite), Bookings.
  - Storage Buckets: For room images.

## Installation

To run the project locally, follow these steps:

1. **Clone the Repository**:

   ```
   git clone https://github.com/berrgrayson/booked.git
   cd booked
   ```

2. **Install Dependencies**:

   ```
   npm install
   ```

   This will install Next.js, Appwrite SDK, React Toastify, and other dependencies.

3. **Set Up Appwrite**:

   - Create an Appwrite project (via the Appwrite console).
   - Set up databases, collections (Rooms, Bookings), and attributes as needed.
   - Create storage buckets for image uploads (e.g., rooms bucket).
   - Generate API keys and set permissions for collections (e.g., read/write for authenticated users).

4. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your Appwrite credentials:

   ```
   NEXT_APPWRITE_KEY=
   NEXT_PUBLIC_APPWRITE_ENDPOINT=
   NEXT_PUBLIC_APPWRITE_PROJECT=
   NEXT_PUBLIC_APPWRITE_DATABASE=
   NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS=
   NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS=
   NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS=
   NEXT_PUBLIC_URL=
   ```

5. **Run the Development Server**:
   ```
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Usage

- **Browsing Rooms**: Visit the homepage to see available rooms. Click on a room card to view details.
- **Authentication**: Use the login/register pages to create an account or sign in. Navigation links update based on auth status.
- **Adding Rooms**: Logged-in users can add rooms via `/rooms/add`, including uploading images.
- **Booking Rooms**: On the room details page, submit a booking form after checking availability.
- **Managing Bookings**: View and cancel bookings on `/bookings`.
- **Deleting Rooms**: Owners can delete their rooms from `/rooms/my`.
- **Notifications**: Toast messages appear for actions like successful login, booking confirmation, or errors.

## Deployment

The app is deployed to Vercel. To deploy your own version:

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel via the Vercel dashboard.
3. Add environment variables in Vercel (same as `.env.local`).
4. Deploy – Vercel handles the build and hosting automatically.

Live Demo: [https://booked-pearl.vercel.app/](https://booked-pearl.vercel.app/)

## Development Process

This project was built commit-by-commit for incremental development:

- Initialized with Next.js and cleaned up defaults.
- Built core UI components (Header, Footer, RoomCard, Heading).
- Prototyped homepage with JSON data, then integrated dynamic room details.
- Set up Appwrite for backend (project, databases, collections, permissions, API keys).
- Implemented data operations (add/get rooms/users, image uploads).
- Added authentication (login/register, sessions, context, route protection via middleware).
- Integrated notifications with React Toastify.
- Added room management (add/delete) and pages (My Rooms).
- Set up bookings (collection, actions, form, viewing, canceling, availability checks).
- Finalized with Vercel deployment.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss.

## Contact

For questions or feedback, reach out via [berrgrayson@gmail.com](mailto:berrgrayson@gmail.com) or open an issue on GitHub.
