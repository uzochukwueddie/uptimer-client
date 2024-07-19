import Button from '@/components/Button';
import { ISSLMonitorDocument, SSLModalDataProp } from '@/interfaces/ssl.interface';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSSLInfoModal } from '../hooks/useSSLInfoModal';

type SSLInfoModalProp = { monitor: ISSLMonitorDocument; onClose: () => void };

const SSLInfoModal: FC<SSLInfoModalProp> = ({ monitor, onClose }): ReactElement => {
  const {
    sslInfo,
    hostInfo,
    subjectInfo,
    issuerInfo,
    validityInfo,
    formatDate
  } = useSSLInfoModal(monitor);

  const renderMessage = (): JSX.Element => {
    if (sslInfo.type === 'success') {
      return <>{`The certificate is valid until ${formatDate(sslInfo.info.validTo!)}`}</>
    }
    if (sslInfo.type === 'expiring soon') {
      return <>{`The certificate will expire in ${sslInfo.info.daysLeft} day(s).`}</>
    }
    return <>{'The certificate is either expired or invalid.'}</>
  }

  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 h-full w-full z-50 overflow-hidden">
      <div className="py-2 z-10 absolute top-0 right-0 left-0 bottom-0 bg-black/[.65]">
        <div className="fixed  bottom-0 left-0 right-0 top-0 flex items-center justify-center">
          <div className="relative min-w-[60%] bottom-auto left-auto right-auto top-auto max-h-[90vh] bg-white p-4 text-[#404145]">
            <div className="mb-[10px] w-ful text-left">
              <h4 className="text-[17px] font-bold">SSL Certificate Details</h4>
            </div>
            <div className="w-full text-left flex items-center gap-1">
              <FaCheckCircle
                className={clsx('', {
                  'text-green-400': sslInfo.type === 'success',
                  'text-red-400': sslInfo.type === 'danger' || sslInfo.type === '--' || sslInfo.type === 'expired',
                  'text-yellow-400': sslInfo.type === 'expiring soon'
                })}
              />
              <div className="text-sm">
                {renderMessage()}
              </div>
            </div>
            <div className="container mx-auto py-4">
              <div className="mx-auto p-4 border rounded-xl my-4">
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-12 border-b mb-3">
                  {CertInfo({ title: 'Host', body: hostInfo })}
                  {CertInfo({ title: 'Subject', body: subjectInfo })}
                </div>
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-12 mt-3">
                  {CertInfo({ title: 'Issuer', body: issuerInfo })}
                  {CertInfo({ title: 'Validity', body: validityInfo })}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                className="rounded bg-gray-200 px-6 py-3 text-center text-sm font-bold text-black focus:outline-none md:px-4 md:py-2 md:text-base"
                label="Close"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertInfo = ({ title, body }: {title: string, body: SSLModalDataProp[]}): ReactElement => {
  return (
    <div className="overflow-scroll h-48">
      <div className="font-semibold">{title}</div>
      {body.map((data: SSLModalDataProp, index: number) => (
        <div key={index} className="md:flex md:justify-between text-sm">
          <div className="py-3 w-[30%]">{data.key}:</div>
          <div className="py-3 w-[60%]">{data.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SSLInfoModal;
