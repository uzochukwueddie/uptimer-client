import {
  IMonitorDocument,
  IMonitorState,
  IPagination,
} from "@/interfaces/monitor.interface";
import { Dispatch, FormEvent, SetStateAction } from "react";
import HomeButtonGroup from "./HomeButtonGroup";
import Button from "@/components/Button";
import clsx from "clsx";
import { FaBorderAll, FaCheckCircle, FaPause, FaPlay } from "react-icons/fa";
import TextInput from "@/components/TextInput";
import HomeTable from "./HomeTable";
import HomeGrid from "./HomeGrid";
import { setLocalStorageItem } from "@/utils/utils";
import { filter, some, toLower } from "lodash";
import Paginate from "@/components/Paginate";

export const renderCreateButton = (monitorState: IMonitorState, setMonitorState: Dispatch<SetStateAction<IMonitorState>>): JSX.Element => {
  return (
    <div className="h-[50%] flex flex-col items-center justify-center">
      <FaCheckCircle className="text-[60px] text-green-400" />
      <p className="text-base lg:text-lg py-2">You have no uptime tests.</p>
      <Button
        onClick={() => setMonitorState({...monitorState, showModal: true})}
        className="inline-flex items-center px-4 py-2 text-base font-medium text-white rounded bg-green-400"
        label="New Uptime Test"
      />
    </div>
  );
};

export const renderButtons = (
  monitors: IMonitorDocument[],
  monitorState: IMonitorState,
  setMonitorState: Dispatch<SetStateAction<IMonitorState>>
): JSX.Element => {
  return (
    <div className="h-20 flex flex-col gap-y-3 mb-4 mt-2 md:items-center md:justify-between md:flex-row md:mb-0 md:mt-0">
      <HomeButtonGroup monitors={monitors} />
      <Button
        onClick={() => setMonitorState({ ...monitorState, showModal: true })}
        label="New Uptime Test"
        className="inline-flex px-4 py-2 text-base font-medium text-white rounded bg-green-400 md:items-center"
      />
    </div>
  );
};

export const renderRefreshButtons = (
  view: string,
  isRefreshed: boolean,
  monitorsRef: IMonitorDocument[],
  monitors: IMonitorDocument[],
  setView: Dispatch<SetStateAction<string>>,
  setMonitors: Dispatch<SetStateAction<IMonitorDocument[]>>,
  refreshMonitors: () => void,
  enableAutoRefresh: () => void,
): JSX.Element => {
  const hasActiveMonitors: boolean = some(monitors, (monitor: IMonitorDocument) => monitor.active);
  let refreshed: boolean = isRefreshed;
  if (isRefreshed && !hasActiveMonitors) {
    refreshed = false;
    setLocalStorageItem('refresh', JSON.stringify(false));
  }
  return (
    <div className="h-44 flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-between lg:h-20">
      <Button
        onClick={refreshMonitors}
        label="Refresh"
        className={clsx(
          "inline-flex items-center px-4 py-2 cursor-pointer text-base font-medium text-white rounded mb-3 lg:mb-0",
          {
            "cursor-none pointer-events-none bg-green-200": refreshed,
            "bg-green-400": !refreshed,
          }
        )}
      />
      <div className="flex flex-col justify-start gap-3 lg:flex-row lg:justify-end lg:w-full ">
        <div className="flex items-center gap-2 px-2 min-w-52 cursor-pointer rounded bg-[#9DFFE4]"
          onClick={() => {
            const item = view === 'box' ? 'list' : 'box';
            setLocalStorageItem('view', JSON.stringify(item));
            setView(item);
          }}
        >
          <FaBorderAll />
          <Button
            label={view === "box" ? "List View" : "Box View"}
            className="text-base font-bold px-4 py-2 lg:p-0"
          />
        </div>
        <div onClick={enableAutoRefresh} className="flex items-center gap-2 px-2 min-w-52 cursor-pointer rounded bg-[#9DFFE4]">
          {!refreshed ? <FaPlay /> : <FaPause />}
          <Button
            label={
              !refreshed ? "Enable Auto Refresh" : "Disable Auto Refresh"
            }
            className="text-base font-bold px-4 py-2 lg:p-0"
          />
        </div>
        <div className="w-full lg:w-[30%]"
          onChange={(event: FormEvent) => {
            const value: string = (event.target as HTMLInputElement).value;
            const results: IMonitorDocument[] = filter(monitors, (monitor: IMonitorDocument) => {
              return toLower(monitor.name).includes(toLower(value)) || toLower(monitor.type).includes(toLower(value))
            });
            setMonitors(!value || !results.length ? monitorsRef : results);
          }}
        >
          <TextInput
            type="text"
            name="search"
            className="border border-black text-gray-900 text-sm rounded-lg focus:ring-[#1e8dee] focus:border-[#1e8dee] block w-full p-2.5"
            placeholder="Search by name"
          />
        </div>
      </div>
    </div>
  );
};

export const renderTableAndPagination = (
  view: string,
  limit: IPagination,
  autoRefreshLoading: boolean,
  monitors: IMonitorDocument[],
  updateLimit: (newLimit: IPagination) => void
): JSX.Element => {
  return (
    <>
      <div className="my-4">
        {view === 'box' ? (
          <HomeTable limit={limit} monitors={monitors} autoRefreshLoading={autoRefreshLoading} />
        ) : (
          <HomeGrid limit={limit} monitors={monitors} autoRefreshLoading={autoRefreshLoading} />
        )}
      </div>
      <div className="my-4">
        {monitors.length > 0 ? <Paginate updateLimit={updateLimit} length={monitors.length} defaultLimit={limit.end} /> : <></>}
      </div>
    </>
  );
}
