import Button from "@/components/Button";
import { IMonitorDocument } from "@/interfaces/monitor.interface";
import React, { FC, ReactElement } from "react";
import { FaPause, FaPlay, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useHomeTableBtnGroup } from "../hooks/useHomeTableBtnGroup";

interface HomeTableBtnGroupProps {
  monitor: IMonitorDocument;
}

const HomeTableBtnGroup: FC<HomeTableBtnGroupProps> = ({
  monitor,
}): ReactElement => {
  const {
    toggleUserMonitor,
    editMonitor,
    deleteUserMonitor
  } = useHomeTableBtnGroup({ monitor });

  return (
    <div className="inline-flex shadow-sm" role="group">
      <Button
        onClick={toggleUserMonitor}
        icon={monitor.active ? <FaPause /> : <FaPlay />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-[#1e8dee] rounded border border-[#1e8dee] hover:bg-[#1e8dee] hover:text-white"
      />
      <Button
        onClick={editMonitor}
        icon={<FaPencilAlt />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-[#1e8dee] rounded border border-[#1e8dee] hover:bg-[#1e8dee] hover:text-white"
      />
      <Button
        onClick={deleteUserMonitor}
        icon={<FaTrashAlt />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded bg-red-600 hover:bg-red-400 hover:text-white"
      />
    </div>
  );
};

export default HomeTableBtnGroup;
