import Link from "next/link";
import React, { FC, Fragment, ReactElement, ReactNode, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface SubmenuTextProps {
  name: string;
  url?: string;
  onClick?: () => void;
}

interface SidebarMenuProps {
  menuText: string;
  icon?: ReactNode;
  submenuTexts: SubmenuTextProps[];
}

const SidebarMenu: FC<SidebarMenuProps> = ({
  menuText,
  submenuTexts,
  icon,
}): ReactElement => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setToggleMenu(!toggleMenu)}
        className="py-2.5 mt-3 flex items-center rounded-md duration-300 cursor-pointer text-[#333333] lg:px-4"
      >
        {icon}
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4 text-[#333333] font-bold">
            {menuText}
          </span>
          <span className="text-sm rotate-180">
            {toggleMenu ? <FaAngleDown /> : <FaAngleUp />}
          </span>
        </div>
      </div>
      {toggleMenu && (
        <div className="text-left text-sm flex flex-col w-4/5 mx-auto text-[#333333] font-normal">
          {submenuTexts.map((submenu: SubmenuTextProps, index: number) => (
            <Fragment key={index}>
              {submenu.url ? (
                <Link
                  href={submenu.url}
                  className="cursor-pointer py-2 ml-4 rounded-md mt-1"
                >
                  {submenu.name}
                </Link>
              ) : (
                <div onClick={submenu.onClick} className="cursor-pointer py-2 ml-4 rounded-md mt-1">
                  {submenu.name}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarMenu;
