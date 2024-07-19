import Button from '@/components/Button';
import { FC, ReactElement } from 'react';
import { FaArrowDown, FaArrowUp, FaExclamationTriangle } from 'react-icons/fa';
import { filter } from 'lodash';
import { ISSLInfo, ISSLMonitorDocument, sslDefaultInfoData } from '@/interfaces/ssl.interface';

interface SSLButtonGroupProps {
  sslMonitors: ISSLMonitorDocument[];
}

const SSLButtonGroup: FC<SSLButtonGroupProps> = ({ sslMonitors }): ReactElement => {
  const monitorInfoData = (monitor: ISSLMonitorDocument): ISSLInfo => (monitor.info ? JSON.parse(monitor.info) : sslDefaultInfoData);

  const count = (type: string): number => {
    let sum = 0;
    if (type === 'success') {
      sum = filter(sslMonitors, (monitor: ISSLMonitorDocument) => monitorInfoData(monitor).type === 'success').length;
    }
    if (type === 'danger') {
      sum = filter(sslMonitors, (monitor: ISSLMonitorDocument) => monitorInfoData(monitor).type === 'danger' || monitorInfoData(monitor).type === 'expired').length;
    }
    if (type === 'expiring soon') {
      sum = filter(sslMonitors, (monitor: ISSLMonitorDocument) => monitorInfoData(monitor).type === 'expiring soon').length;
    }
    return sum;
  }

  return (
    <div className="inline-flex" role='group'>
      <Button
        label={`Valid: ${count('success')}`}
        icon={<FaArrowUp className='mr-1' />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded bg-green-400"
      />
      <Button
        label={`Expiring soon: ${count('expiring soon')}`}
        icon={<FaExclamationTriangle className='mr-1' />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded bg-yellow-400"
      />
      <Button
        label={`Expired / Invalid: ${count('danger')}`}
        icon={<FaArrowDown className='mr-1' />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded bg-red-400"
      />
    </div>
  )
}

export default SSLButtonGroup;
