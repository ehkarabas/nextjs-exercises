import Sidebar from "@/components/Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";

const DashboardLayout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Drawer Content */}
        <label
          htmlFor="my-drawer-2"
          className="drawer-button cursor-pointer lg:hidden fixed top-2 right-8 z-10"
        >
          <FaBarsStaggered className="w-8 h-8 text-primary " />
        </label>
        <div className="bg-base-200 px-1 py-12 lg:px-8 min-h-screen">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        {/* Drawer Overlay On Small Screens */}
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Drawer Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
