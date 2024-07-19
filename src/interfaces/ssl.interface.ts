import { Dispatch, SetStateAction } from 'react';
import { IMonitorErrorMessage, IPagination } from './monitor.interface';
import { INotification } from './notification.interface';

export interface ISSLMonitorDocument {
  id?: number;
  monitorId?: number;
  notificationId: number;
  userId: number;
  name: string;
  active?: boolean;
  status: number;
  frequency: number;
  alertThreshold: number | string;
  url: string;
  info?: string;
  notifications?: INotification;
}

export interface IUseSSL {
  loading: boolean;
  monitorInfo: ISSLMonitorDocument;
  validationErrors: IMonitorErrorMessage;
  notifications: INotification[];
  setMonitorInfo: Dispatch<SetStateAction<ISSLMonitorDocument>>;
  onHandleSubmit: () => void;
}

export interface ISSLInfo {
  host: string;
  type: string;
  reason?: string;
  validFor?: string[] | string;
  subject: SSLSubjectProps;
  issuer: SSLSubjectProps;
  info: SSLInfoProps;
}

export interface ISSLMonitorArgs {
  monitor?: ISSLMonitorDocument;
  monitorId?: string;
  userId?: string;
  name?: string;
  active?: boolean;
}

export interface IUseSSLHome {
  loading: boolean;
  monitors: ISSLMonitorDocument[];
  limit: IPagination;
  updateLimit: (newLimit: IPagination) => void;
}

export interface IUseSSLTable {
  showModal: boolean;
  selectMonitor: ISSLMonitorDocument | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedMonitor: Dispatch<SetStateAction<ISSLMonitorDocument | undefined>>;
  formatSSLDate: (date: string) => string;
  toggleUserMonitor: (monitor: ISSLMonitorDocument) => Promise<void>;
  editMonitor: (monitor: ISSLMonitorDocument) => void;
  deleteUserMonitor: (monitor: ISSLMonitorDocument) => Promise<void>;
}

export type SSLModalDataProp = { key: string; value: string };

export interface IUseSSLInfoModal {
  sslInfo: ISSLInfo;
  hostInfo: SSLModalDataProp[];
  subjectInfo: SSLModalDataProp[];
  issuerInfo: SSLModalDataProp[];
  validityInfo: SSLModalDataProp[];
  formatDate: (date: string) => string;
}

export const sslDefaultInfoData: ISSLInfo = {
  host: '--',
  type: '--',
  reason: '--',
  validFor: '--',
  subject: {
    org: '--',
    common_name: '--',
    sans: '--',
    country: '--'
  },
  issuer: {
    org: '--',
    common_name: '--',
    sans: '--',
    country: '--'
  },
  info: {
    validFrom: '--',
    validTo: '--',
    daysLeft: '--',
    backgroundClass: '--'
  }
};

interface SSLSubjectProps {
  org: string;
  common_name: string;
  sans?: string;
  country?: string;
}

interface SSLInfoProps {
  validFrom?: string;
  validTo?: string;
  daysLeft: number | string;
  backgroundClass: string;
}
