import { useState } from "react";
import Sidebar from "./Sidebar"
import { FcFlowChart } from "react-icons/fc";
import { TbPasswordFingerprint } from "react-icons/tb";
import { Outlet } from "react-router-dom";

export type SideElementsProp = {
  title: string,
  path: string,
  logo: React.ReactNode;
}

const Dashboard = () => {
  const sideElements: SideElementsProp[] = [
    { title: "Flow Chart", path: '/workflows', logo: <FcFlowChart /> },
    { title: "Credentials", path: '/credentials', logo: <TbPasswordFingerprint /> },
  ]
  const [currentTitle, setCurrentTitle] = useState(() => {
    const found = sideElements.find(
      (sideElement) => sideElement.path === window.location.pathname
    );
    return found ? found.title : "";
  });

  return (
    <div className="grid grid-cols-[250px_1fr] w-full h-screen">
      <Sidebar
        sideElements={sideElements}
        currentTitle={currentTitle}
        setCurrentTitle={setCurrentTitle}
      />

      <div className="flex flex-col h-full">
        <div className="border-b text-2xl font-semibold p-4">
          {currentTitle}
        </div>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
