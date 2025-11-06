import React from 'react';

// In a real app, this would be a more complex layout with authentication,
// a real sidebar, header, etc. For this task, it's a simple structural wrapper.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#E0E0E0]">
      {/* Placeholder for a real sidebar */}
      <aside className="w-64 bg-[#D8D8D8] shadow-[inset_-4px_0_8px_rgba(163,163,163,0.2)] p-6 hidden lg:block">
        <img src="https://gemsweb.xyz/wp-content/uploads/2025/10/Nangula-logo.png" alt="Nangula AI" className="h-10 w-auto" />
        <nav className="mt-10">
          <p className="text-sm font-bold text-gray-500">MENU</p>
          <a href="#" className="mt-4 flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg text-white" style={{background: 'linear-gradient(135deg, #FFB347 0%, #F4A460 50%, #E67E22 100%)'}}>
            Knowledge Base
          </a>
          <a href="#" className="mt-2 flex items-center px-4 py-2.5 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-300">
            Analytics
          </a>
          <a href="#" className="mt-2 flex items-center px-4 py-2.5 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-300">
            Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
