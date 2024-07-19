import { ISSLInfo, ISSLMonitorDocument, IUseSSLInfoModal, sslDefaultInfoData, SSLModalDataProp } from "@/interfaces/ssl.interface";
import dayjs from "dayjs";

export const useSSLInfoModal = (monitor: ISSLMonitorDocument): IUseSSLInfoModal => {
  const sslInfo: ISSLInfo = monitor.info ? JSON.parse(monitor.info) : sslDefaultInfoData;
  const hostInfo: SSLModalDataProp[] = [{key: 'Name', value: sslInfo.host ?? '-'}];
  const subjectInfo: SSLModalDataProp[] = [
    {key: 'Valid for Domains', value: sslInfo.subject.common_name ?? '-'},
    {key: 'Subject Alternative Name (SAN)', value: sslInfo.subject.sans ?? '-'},
  ];
  const issuerInfo: SSLModalDataProp[] = [
    {key: 'Common Name (CN)', value: sslInfo.issuer.common_name ?? '-'},
    {key: 'Organization (O)', value: sslInfo.issuer.org ?? '-'},
    {key: 'Country (C)', value: sslInfo.issuer.country ?? '-'}
  ];
  const validityInfo: SSLModalDataProp[] = [
    {key: 'Issue Date', value: formatDate(sslInfo.info.validFrom!)},
    {key: 'Expiry Date', value: formatDate(sslInfo.info.validTo!)},
    {key: 'Days Left', value: `${sslInfo.info.daysLeft}` ?? '-'},
  ];

  function formatDate(date: string): string {
    if (!date || date === '--') {
      return '--';
    }
    return dayjs(date).format('MMM D, YYYY h:mm A');
  }

  return {
    sslInfo,
    hostInfo,
    subjectInfo,
    issuerInfo,
    validityInfo,
    formatDate
  };
}