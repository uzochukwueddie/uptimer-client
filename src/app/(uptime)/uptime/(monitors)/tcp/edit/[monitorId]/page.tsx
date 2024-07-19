"use client";

import Assertions from "@/app/(uptime)/components/Assertions";
import FormButtons from "@/app/(uptime)/components/FormButtons";
import MonitorBaseInfo from "@/app/(uptime)/components/MonitorBaseInfo";
import MonitorItem from "@/app/(uptime)/components/MonitorItem";
import { useTCPEdit } from "@/app/(uptime)/hooks/useTCPMonitor";
import PageLoader from "@/components/PageLoader";
import { EditMonitorProps } from "@/interfaces/monitor.interface";
import clsx from "clsx";
import { ChangeEvent, FC, ReactElement } from "react";

const EditTCPMonitor: FC<EditMonitorProps> = ({ params }): ReactElement => {
  const {
    loading,
    monitorInfo,
    notifications,
    validationErrors,
    setMonitorInfo,
    onHandleSubmit,
  } = useTCPEdit(params.monitorId);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <form
          action={onHandleSubmit}
          className="m-auto relative min-h-screen xl:container"
        >
          <div className="py-2 text-base lg:text-xl font-bold m-auto mt-4 w-[80%]">
            Edit TCP Monitor
          </div>
          <div className="p-6 m-auto mt-4 border w-[80%] bg-lightGray">
            <MonitorBaseInfo
              buttonsText={["TCP"]}
              urlLabel="Hostname"
              type="tcp"
              urlPlaceholder="Enter hostname"
              monitorInfo={monitorInfo}
              validationErrors={validationErrors}
              notifications={notifications}
              setMonitorInfo={setMonitorInfo}
            />
            <MonitorItem
              id="timeout"
              type="text"
              requiredIcon={true}
              topClass="mt-5"
              labelStart="Timeout (Default is 3 seconds)"
              className={clsx(
                "bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                {
                  "border border-red-400": validationErrors!.timeout,
                }
              )}
              inputValue={monitorInfo.timeout}
              placeholder="Request timeout"
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({
                  ...monitorInfo,
                  timeout: !isNaN(parseInt(value)) ? parseInt(value) : "",
                });
              }}
            />
            <Assertions>
              <MonitorItem
                id="responseTime"
                type="number"
                topClass="mb-4"
                labelStart="When response time is less than (Default is 2000ms)"
                inputValue={monitorInfo.responseTime}
                placeholder="Default is 2000ms"
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement)
                    .value;
                  setMonitorInfo({
                    ...monitorInfo,
                    responseTime: !isNaN(parseInt(value))
                      ? parseInt(value)
                      : "",
                  });
                }}
              />
              <div className="mb-4">
                <div className="block mb-2 text-medium font-medium ">
                  And connection is (Default is established)
                </div>
                <select
                  id="connection"
                  name="connection"
                  className="bg-white border border-black text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={monitorInfo.connection}
                  onChange={(event: ChangeEvent) => {
                    const value: string = (event.target as HTMLInputElement)
                      .value;
                    setMonitorInfo({ ...monitorInfo, connection: value });
                  }}
                >
                  <option value="none">Select</option>
                  <option value="established">Established</option>
                  <option value="refused">Refused</option>
                </select>
              </div>
            </Assertions>
          </div>
          <FormButtons href="/status" buttonLabel="Update Monitor" />
        </form>
      )}
    </>
  );
};

export default EditTCPMonitor;
