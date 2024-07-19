"use client";

import Assertions from "@/app/(uptime)/components/Assertions";
import FormButtons from "@/app/(uptime)/components/FormButtons";
import HttpMonitorBaseInfo from "@/app/(uptime)/components/HttpMonitorBaseInfo";
import MonitorItem from "@/app/(uptime)/components/MonitorItem";
import { useHttpEdit } from "@/app/(uptime)/hooks/useHttpMonitor";
import PageLoader from "@/components/PageLoader";
import UptimeGroupBtn from "@/components/UptimeGroupBtn";
import { EditMonitorProps } from "@/interfaces/monitor.interface";
import { EXCLUDED_HTTP_METHODS, HTTP_METHODS } from "@/utils/utils";
import clsx from "clsx";
import { toLower, upperCase } from "lodash";
import { ChangeEvent, FC, ReactElement } from "react";

const EditHttpMonitor: FC<EditMonitorProps> = ({ params }): ReactElement => {
  const {
    loading,
    monitorInfo,
    notifications,
    validationErrors,
    setMonitorInfo,
    onHandleSubmit,
  } = useHttpEdit(params.monitorId);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <form action={onHandleSubmit} className="m-auto relative min-h-screen xl:container">
          <div className="py-2 text-base lg:text-xl font-bold m-auto mt-4 w-[80%]">
            Edit HTTP Monitor
          </div>
          <div className="p-6 m-auto mt-4 border w-[80%] bg-lightGray">
            <HttpMonitorBaseInfo
              monitorInfo={monitorInfo}
              validationErrors={validationErrors}
              notifications={notifications}
              setMonitorInfo={setMonitorInfo}
            />
            <div className="mt-5">
              <UptimeGroupBtn
                buttonsText={HTTP_METHODS}
                labelText="HTTP Verb"
                type="string"
                selectedItem={monitorInfo.method}
                onClick={(event: string) => {
                  setMonitorInfo({ ...monitorInfo, method: toLower(event) });
                }}
              />
            </div>
            <MonitorItem
              id="headers"
              type="textarea"
              topClass="mt-5"
              labelStart="Request Headers (optional)"
              className={clsx(
                "bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                {
                  "border border-red-400": validationErrors!.headers,
                }
              )}
              labelEnd="Headers to be attached to your endpoint request."
              inputValue={monitorInfo.headers}
              placeholder="Example: { 'key': value }. Key must always be in double quotes."
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({ ...monitorInfo, headers: JSON.stringify(value) });
              }}
            />
            <MonitorItem
              id="body"
              type="textarea"
              topClass="mt-5"
              labelStart="Request Body (optional)"
              className={clsx(
                "bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                {
                  "pointer-events-none bg-gray opacity-5": !EXCLUDED_HTTP_METHODS.includes(upperCase(monitorInfo.method)),
                  "border border-red-400": validationErrors!.headers,
                }
              )}
              labelEnd="Headers to be attached to your endpoint request."
              inputValue={monitorInfo.body}
              placeholder="Example: { 'key': value }. Key must always be in double quotes."
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({ ...monitorInfo, body: JSON.stringify(value) });
              }}
            />
            <div className="mt-5">
              <label htmlFor="auth" className="block mb-2 text-medium font-medium text-gray-900">
                Authentication (optional)
              </label>
              <select
                id="auth"
                name="auth"
                className={clsx(
                  'bg-white border border-black text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
                  {
                    'border border-red-400': validationErrors!.basicAuthUser || validationErrors!.basicAuthPass
                  }
                )}
                value={monitorInfo.httpAuthMethod}
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement).value;
                  setMonitorInfo({ ...monitorInfo, httpAuthMethod: value });
                }}
              >
                <option value="none">None</option>
                <option value="basic">HTTP Basic Auth</option>
                <option value="token">Bearer Token</option>
              </select>
              {monitorInfo.httpAuthMethod && monitorInfo.httpAuthMethod !== 'none' && (
                <div className="mt-4 border p-4">
                  {monitorInfo.httpAuthMethod === 'basic' && (
                    <>
                      <MonitorItem
                        id="text"
                        type="username"
                        topClass="mb-2"
                        labelStart="Username"
                        className={clsx(
                          'bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
                          {
                            'border border-red-400': validationErrors!.basicAuthUser
                          }
                        )}
                        inputValue={monitorInfo.basicAuthUser}
                        placeholder="Username"
                        onChange={(event: ChangeEvent) => {
                          const value: string = (event.target as HTMLInputElement).value;
                          setMonitorInfo({ ...monitorInfo, basicAuthUser: value });
                        }}
                      />
                      <MonitorItem
                        id="password"
                        type="password"
                        topClass="mb-2"
                        labelStart="Password"
                        className={clsx(
                          'bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
                          {
                            'border border-red-400': validationErrors!.basicAuthPass
                          }
                        )}
                        inputValue={monitorInfo.basicAuthPass}
                        placeholder="Password"
                        onChange={(event: ChangeEvent) => {
                          const value: string = (event.target as HTMLInputElement).value;
                          setMonitorInfo({ ...monitorInfo, basicAuthPass: value });
                        }}
                      />
                    </>
                  )}
                  {monitorInfo.httpAuthMethod === 'token' && (
                    <>
                      <MonitorItem
                        id="token"
                        type="text"
                        topClass="mb-2"
                        labelStart="Token"
                        className={clsx(
                          'bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
                          {
                            'border border-red-400': validationErrors!.bearerToken
                          }
                        )}
                        inputValue={monitorInfo.bearerToken}
                        placeholder="Bearer token"
                        onChange={(event: ChangeEvent) => {
                          const value: string = (event.target as HTMLInputElement).value;
                          setMonitorInfo({ ...monitorInfo, bearerToken: value });
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
            <MonitorItem
              id="timeout"
              type="number"
              topClass="mt-5"
              labelStart="Request Timeout (Default is 10 seconds)"
              inputValue={monitorInfo.timeout}
              placeholder="Request timeout"
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({ ...monitorInfo, timeout: !isNaN(parseInt(value)) ? parseInt(value) : '' });
              }}
            />
            <MonitorItem
              id="redirects"
              type="number"
              topClass="mt-5"
              labelStart="Maximum Redirects (Default is 0)"
              labelEnd="Maximum number of redirects to follow. Set to 0 to disable redirects."
              inputValue={monitorInfo.redirects}
              placeholder="Redirects"
              onChange={(event: ChangeEvent) => {
                const value: string = (event.target as HTMLInputElement).value;
                setMonitorInfo({ ...monitorInfo, redirects: !isNaN(parseInt(value)) ? parseInt(value) : '' });
              }}
            />
            <Assertions>
              <MonitorItem
                id="responseTime"
                type="number"
                topClass="mb-4"
                labelStart="When response time is less than (Default is 2000ms)"
                inputValue={monitorInfo.responseTime}
                placeholder="Default is 2000 ms"
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement).value;
                  setMonitorInfo({ ...monitorInfo, responseTime: !isNaN(parseInt(value)) ? parseInt(value) : '' });
                }}
              />
              <MonitorItem
                id="status"
                type="textarea"
                topClass="mb-4"
                labelStart="And the status code is"
                labelEnd="Enter all codes and separate by comma."
                inputValue={monitorInfo.statusCode}
                placeholder="Enter all codes and separate by comma. Default is 200."
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement).value;
                  setMonitorInfo({ ...monitorInfo, statusCode: value });
                }}
              />
              <MonitorItem
                id="contentType"
                type="text"
                topClass="mb-4"
                labelStart="And header content-type should include (optional)"
                labelEnd="Enter all content-types and separate by comma."
                inputValue={monitorInfo.contentType}
                placeholder="Example: text/html; charset=utf-8, application/json"
                onChange={(event: ChangeEvent) => {
                  const value: string = (event.target as HTMLInputElement).value;
                  setMonitorInfo({ ...monitorInfo, contentType: value });
                }}
              />
            </Assertions>
          </div>
          <FormButtons href="/status" buttonLabel="Update Monitor" />
        </form>
      )}
    </>
  );
};

export default EditHttpMonitor;
