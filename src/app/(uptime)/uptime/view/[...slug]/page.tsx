'use client';

import StatusButtonGroup from '@/app/(uptime)/components/StatusButtonGroup';
import StatusTable from '@/app/(uptime)/components/StatusTable';
import { useUptimeView } from '@/app/(uptime)/hooks/useUptimeView';
import Button from '@/components/Button';
import PageLoader from '@/components/PageLoader';
import Paginate from '@/components/Paginate';
import ResponseChart from '@/components/ResponseChart';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';

type ViewProp = {
  params: {
    slug: string[];
  };
};

const View: FC<ViewProp> = ({ params }): ReactElement => {
  const {
    limit,
    duration,
    monitor,
    heartbeatsData,
    statusResponse,
    updateLimit,
    toggleUserMonitor,
    editMonitor,
    deleteUserMonitor,
    setQueryDuration
  } = useUptimeView(params);

  return (
    <>
      {monitor ? (
        <div className="m-auto px-6 relative min-h-screen xl:container">
          <div className="flex h-32 items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[20px] font-bold text-[#333333]">{monitor.name}</span>
              <a className="text-base font-normal cursor-pointer text-[#1e8dee] hover:underline" target="_blank" href={monitor.url}>
                {monitor.url}
              </a>
            </div>
            <div className="flex flex-col gap-y-2">
              <div
                className={clsx('px-4 py-2 text-sm font-semibold text-white rounded', {
                  'bg-green-400': monitor.active && monitor.status === 0,
                  'bg-yellow-400': !monitor.active,
                  'bg-red-400': monitor.active && monitor.status === 1
                })}
              >
                Status: {monitor.active ? 'Running' : 'Paused'}
              </div>
              <StatusButtonGroup
                monitor={monitor}
                toggleUserMonitor={toggleUserMonitor}
                editMonitor={editMonitor}
                deleteUserMonitor={deleteUserMonitor}
              />
            </div>
          </div>
          <div className="h-20 flex items-center gap-2">
            <Button
              type="button"
              onClick={() => setQueryDuration('24')}
              label="24 HOURS"
              className={clsx(
                'mr-1 inline-flex gap-2 items-center px-4 py-2 text-sm font-bold text-white  rounded hover:bg-green-400 hover:text-white',
                {
                  'bg-green-400': duration === '24',
                  'bg-gray-400': duration !== '24'
                }
              )}
            />
            <Button
              type="button"
              onClick={() => setQueryDuration('12')}
              label="12 HOURS"
              className={clsx(
                'mr-1 inline-flex gap-2 items-center px-4 py-2 text-sm font-bold text-white  rounded hover:bg-green-400] hover:text-white',
                {
                  'bg-green-400': duration === '12',
                  'bg-gray-400': duration !== '12'
                }
              )}
            />
            <Button
              label="6 HOURS"
              type="button"
              onClick={() => setQueryDuration('6')}
              className={clsx(
                'mr-1 inline-flex gap-2 items-center px-4 py-2 text-sm font-bold text-white  rounded hover:bg-green-400] hover:text-white',
                {
                  'bg-green-400': duration === '6',
                  'bg-gray-400': duration !== '6'
                }
              )}
            />
          </div>
          <div className="my-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col border h-48 justify-center">
                <span className="text-[20px] font-bold text-[#333333] text-center">Latest Response</span>
                <span className="text-[18px] text-[#333333] text-center">{statusResponse.latestResponse}ms</span>
              </div>
              <div className="flex flex-col border h-48 justify-center">
                <span className="text-[20px] font-bold text-[#333333] text-center">Avg. Response {duration}-hour</span>
                <span className="text-[18px] text-[#333333] text-center">{statusResponse.averageResponse.toFixed(2)}ms</span>
              </div>
              <div className="flex flex-col border h-48 justify-center">
                <span className="text-[20px] font-bold text-[#333333] text-center">Uptime {duration}-hour</span>
                <span className="text-[18px] text-[#333333] text-center">{statusResponse.uptime.toFixed(2)}%</span>
              </div>
            </div>
          </div>
          {heartbeatsData.length > 0 ? (
            <div className="my-4">
              <ResponseChart heartBeats={heartbeatsData} />
            </div>
          ) : (
            <></>
          )}
          <div className="my-10">
            <div className="text-[#333333] text-[20px] font-bold mb-2">Latest Tests</div>
            <StatusTable limit={limit} heartBeats={heartbeatsData} monitor={monitor} />
            {heartbeatsData.length > 0 ? (
              <Paginate updateLimit={updateLimit} length={heartbeatsData.length} defaultLimit={limit.end} />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default View;
