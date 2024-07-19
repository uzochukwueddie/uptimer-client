import UptimeGroupBtn from '@/components/UptimeGroupBtn';
import { MonitorBaseInfoProps } from '@/interfaces/monitor.interface';
import { FREQUENCIES } from '@/utils/utils';
import clsx from 'clsx';
import React, { ChangeEvent, FC, ReactElement } from 'react';
import MonitorItem from './MonitorItem';
import { INotification } from '@/interfaces/notification.interface';

const HttpMonitorBaseInfo: FC<MonitorBaseInfoProps> = ({ monitorInfo, notifications, validationErrors, setMonitorInfo }): ReactElement => {
  return (
    <>
      <UptimeGroupBtn buttonsText={['HTTP']} labelText="Monitor Type" type="string" />
      <MonitorItem
        id="name"
        requiredIcon={true}
        type="text"
        topClass="mt-5"
        labelStart="Display Name"
        className={clsx(
          'bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
          {
            'border border-red-400': validationErrors!.name
          }
        )}
        inputValue={monitorInfo.name}
        placeholder="Enter a friendly name"
        onChange={(event: ChangeEvent) => {
          const value: string = (event.target as HTMLInputElement).value;
          setMonitorInfo({ ...monitorInfo, name: value });
        }}
      />
      <MonitorItem
        id="url"
        requiredIcon={true}
        type="text"
        topClass="mt-5"
        labelStart="URL"
        className={clsx(
          'bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
          {
            'border border-red-400': validationErrors!.url
          }
        )}
        inputValue={monitorInfo.url}
        placeholder="Enter http(s) URL"
        onChange={(event: ChangeEvent) => {
          const value: string = (event.target as HTMLInputElement).value;
          setMonitorInfo({ ...monitorInfo, url: value });
        }}
      />
      <div className="mt-5">
        <label htmlFor="notificationGroup" className="block mb-2 text-medium font-medium text-gray-900">
          Notification Group<sup className="text-red-400">*</sup>
        </label>
        <select
          id="notificationGroup"
          name="notificationGroup"
          className={clsx(
            'bg-white border border-black cursor-pointer text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
            {
              'border border-red-400': validationErrors!.notificationId
            }
          )}
          value={!isNaN(monitorInfo.notificationId!) ? monitorInfo.notificationId : 0}
          onChange={(event: ChangeEvent) => {
            const value: string = (event.target as HTMLInputElement).value;
            setMonitorInfo({ ...monitorInfo, notificationId: parseInt(value) });
          }}
        >
          <option value="0">Select</option>
          {notifications &&
            notifications.map((notification: INotification, index: number) => (
              <option key={index} value={parseInt(`${notification.id}`)}>
                {notification.groupName}
              </option>
            ))}
        </select>
      </div>
      <MonitorItem
        id="alertThreshold"
        requiredIcon={true}
        type="number"
        topClass="mt-5"
        labelStart="Alert Threshold"
        labelEnd="Number of errors that has to occur before sending a notification. Add 0 if no error notification is required."
        className={clsx(
          'bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
          {
            'border border-red-400': validationErrors!.alertThreshold
          }
        )}
        inputValue={monitorInfo.alertThreshold}
        placeholder="Enter notification alert threshold"
        onChange={(event: ChangeEvent) => {
          const value = (event.target as HTMLInputElement).value;
          setMonitorInfo({ ...monitorInfo, alertThreshold: !isNaN(parseInt(value)) ? parseInt(value) : '' });
        }}
      />
      <div className="mt-5">
        <UptimeGroupBtn
          buttonsText={FREQUENCIES}
          labelText="Heartbeat Frequency"
          type="object"
          selectedItem={`${monitorInfo.frequency}`}
          onClick={(event: string) => {
            setMonitorInfo({ ...monitorInfo, frequency: parseInt(event, 10) });
          }}
        />
      </div>
    </>
  );
};

export default HttpMonitorBaseInfo;
