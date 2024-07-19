import { ReactElement, ReactNode, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Sidebar from "./sidebar/Sidebar";
import clsx from "clsx";
import HomeHeader from "./headers/HomeHeader";

const LayoutBody = ({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);

  return (
    <div className="h-screen relative">
      <div
        className={clsx("grid", {
          "grid-cols-5": toggleSidebar,
          "grid-cols-1": !toggleSidebar,
        })}
      >
        {toggleSidebar && (
          <div
            className={clsx(
              "top-0 bottom-0 h-auto p-0 text-center border-r border-[#e5f3ff] hidden lg:flex",
              {
                "col-span-1": toggleSidebar,
                "col-span-0": !toggleSidebar,
              }
            )}
          >
            <Sidebar type="sidebar" />
          </div>
        )}

        <div
          className={clsx("col-span-5 lg:col-span-4", {
            "col-span-4": toggleSidebar,
            "col-span-1": !toggleSidebar,
          })}
        >
          <HomeHeader />
          {children}
        </div>
      </div>
      <div className="hidden absolute bottom-auto p-4 cursor-pointer lg:flex" onClick={() => setToggleSidebar(!toggleSidebar)}>
        {!toggleSidebar ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
      </div>
    </div>
  );
};

export default LayoutBody;
