// Import necessary modules and component
// s
"use client";
// Import global styles

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow p-4 bg-gray-100">{children}</main>

      {/* Optional Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        Dashboard Footer &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
