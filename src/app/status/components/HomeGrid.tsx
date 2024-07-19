import Button from "@/components/Button";
import {
  HomeTableProps,
  IMonitorDocument,
} from "@/interfaces/monitor.interface";
import clsx from "clsx";
import { FC, ReactElement, useContext } from "react";
import {
  FaArrowUp,
  FaPlay,
  FaArrowDown,
  FaCircleNotch,
} from "react-icons/fa";
import HomeTableBtnGroup from "./HomeTableBtnGroup";
import ResponseChart from "@/components/ResponseChart";
import { MonitorContext } from "@/context/MonitorContext";
import { useRouter, useSearchParams } from "next/navigation";

const DEFAULT_DURATION = 24;

const HomeGrid: FC<HomeTableProps> = ({
  monitors,
  limit,
  autoRefreshLoading,
}): ReactElement => {
  const { dispatch } = useContext(MonitorContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToStatusPage = (monitor: IMonitorDocument): void => {
    // 24 is the default duration
    const params = new URLSearchParams(searchParams.toString());
    params.set('active', JSON.stringify(monitor.active));
    router.push(`/uptime/view/${monitor.type}/${monitor.id}/${DEFAULT_DURATION}?${params}`);
    dispatch({
      type: 'monitor',
      payload: monitor
    });
  };

  const monitorIcon = (monitor: IMonitorDocument): JSX.Element => {
    if (monitor.active && monitor.status === 0) {
      return <FaArrowUp />;
    }
    if (!monitor.active) {
      return <FaPlay />;
    }
    return <FaArrowDown />;
  };

  return (
    <div className="grid gap-6 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {autoRefreshLoading ? (
        <div className="bg-white/[0.8] flex justify-center items-center z-50 left-0 top-0 absolute h-full w-full">
          <FaCircleNotch
            className="animate-spin h-10 w-10 mr-3"
            size={40}
            color="#50b5ff"
          />
        </div>
      ) : (
        <></>
      )}
      {monitors
        .slice(limit.start, limit.end)
        .map((monitor: IMonitorDocument, index: number) => (
          <div key={index} className="rounded border-2 border-blue-400 h-auto">
            <div className="flex flex-col px-4 py-4">
              <div
                className="font-bold text-blue-400 cursor-pointer"
                onClick={() => navigateToStatusPage(monitor)}
              >
                {monitor.name}
              </div>
              <div className="mt-3 w-fulls">
                <span className="font-bold text-sm mb-2">
                  Response Times (ms)
                </span>
                <ResponseChart heartBeats={monitor.heartbeats!} showLabel={false} />
              </div>
              <div className="mt-3">
                <Feature title="Status">
                  <Button
                    icon={monitorIcon(monitor)}
                    type="button"
                    className={clsx(
                      "inline-flex items-center px-2 py-2 text-sm font-bold text-white rounded",
                      {
                        "bg-green-400": monitor.active && monitor.status === 0,
                        "bg-yellow-400": !monitor.active,
                        "bg-red-400": monitor.active && monitor.status === 1,
                      }
                    )}
                  />
                </Feature>
                <Feature title="1 day uptime">
                  <span>{monitor.uptime}%</span>
                </Feature>
                <Feature title="Actions">
                  <HomeTableBtnGroup monitor={monitor} />
                </Feature>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const Feature = ({ title, children }: any): ReactElement => {
  return (
    <div className="flex justify-between my-6">
      <span className="font-bold text-base">{title}</span>
      {children}
    </div>
  );
};

export default HomeGrid;
