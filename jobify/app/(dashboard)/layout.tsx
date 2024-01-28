import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import React from "react";
const DasboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}): React.ReactElement => {
  return (
    <main className="grid lg:custom-grid">
      {/* first-col hide sidebar on md screen */}
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      {/* second-col hide dropdown on md screen */}
      <div className="lg:col-span-4">
        <Navbar />
        <div className="py-16 px-4 sm:px-8 lg:px-16 max-w-[1280px] xl:mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DasboardLayout;
