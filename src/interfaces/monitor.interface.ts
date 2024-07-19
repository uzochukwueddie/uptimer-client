import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from 'react';
import { INotification } from './notification.interface';

export interface IMonitorDocument {
  id?: number | string;
  monitorId?: number;
  notificationId?: number;
  name: string;
  active?: boolean;
  status?: number;
  userId: number;
  frequency: number;
  alertThreshold: number | string;
  url?: string;
  type: string;
  lastChanged?: Date | string;
  timeout?: number | string;
  uptime?: number;
  redirects?: number | string;
  method?: string;
  headers?: string;
  body?: string;
  httpAuthMethod?: string;
  basicAuthUser?: string;
  basicAuthPass?: string;
  bearerToken?: string;
  contentType?: string;
  statusCode?: string;
  responseTime?: string | number;
  connection?: string;
  port?: number | string;
  heartbeats?: IHeartbeat[];
  notifications?: INotification;
}

export interface IMonitorErrorMessage {
  [x: string]: string | undefined;
  notificationId?: string;
  name?: string;
  frequency?: string;
  alertThreshold?: string;
  url?: string;
  timeout?: string;
  redirects?: string;
  method?: string;
  headers?: string;
  body?: string;
  httpAuthMethod?: string;
  basicAuthUser?: string;
  basicAuthPass?: string;
  bearerToken?: string;
  contentType?: string;
  statusCode?: string;
  responseTime?: string;
  connection?: string;
  port?: string;
}

export const monitorErrorMessage = {
  notificationId: '',
  name: '',
  frequency: '',
  alertThreshold: '',
  url: '',
  timeout: '',
  redirects: '',
  method: '',
  headers: '',
  body: '',
  httpAuthMethod: '',
  basicAuthUser: '',
  basicAuthPass: '',
  bearerToken: '',
  contentType: '',
  statusCode: '',
  responseTime: '',
  connection: '',
  port: ''
};

export interface IHeartbeat {
  id?: number;
  monitorId: number;
  status: number;
  code: number;
  message: string;
  timestamp: number | string;
  reqHeaders?: string;
  resHeaders?: string;
  reqBody?: string;
  resBody?: string;
  responseTime: number;
  connection?: string;
}

export interface IPagination {
  start: number;
  end: number;
}

export interface HomeTableProps {
  monitors: IMonitorDocument[];
  limit: IPagination;
  autoRefreshLoading?: boolean;
}

export interface MonitorBaseInfoProps {
  monitorInfo: IMonitorDocument;
  notifications: INotification[];
  type?: string;
  urlLabel?: string;
  urlPlaceholder?: string;
  buttonsText?: string[];
  validationErrors?: IMonitorErrorMessage;
  setMonitorInfo: Dispatch<SetStateAction<IMonitorDocument>>;
}

export interface MonitorItemProps {
  id: string;
  requiredIcon?: boolean;
  type?: string;
  topClass?: string;
  className?: string;
  inputValue?: string | number | undefined;
  labelStart?: string;
  labelEnd?: string;
  placeholder: string;
  readonly?: boolean;
  onChange: (event: ChangeEvent) => void;
}

export interface IStatusPage {
  monitor: IMonitorDocument;
  heartBeats: IHeartbeat[];
  limit: IPagination;
}

export interface IMonitorState {
  showModal: boolean;
  enableRefresh: boolean;
  autoRefreshLoading: boolean;
}

export interface IStatusPageButtonGroup {
  monitor: IMonitorDocument;
  toggleUserMonitor: () => Promise<void>;
  editMonitor: () => Promise<void>;
  deleteUserMonitor: () => Promise<void>;
}

export interface IViewOverlay {
  heartbeat: IHeartbeat;
  monitor: IMonitorDocument;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  side: string;
}

export interface EditMonitorProps {
  params: {
    monitorId: string;
  };
}

export interface IUseUptime {
  loading?: boolean;
  notifications: INotification[];
  monitorInfo: IMonitorDocument;
  validationErrors: IMonitorErrorMessage;
  setMonitorInfo: Dispatch<SetStateAction<IMonitorDocument>>;
  onHandleSubmit: () => void;
}

export interface IUseHome {
  monitorState: IMonitorState,
  monitors: IMonitorDocument[],
  limit: IPagination,
  isRefreshed: boolean | null,
  autoMonitorsRef: MutableRefObject<IMonitorDocument[]>,
  monitorsRef: MutableRefObject<IMonitorDocument[]>,
  openModal: boolean | null,
  view: string,
  loading: boolean,
  setView: Dispatch<SetStateAction<string>>,
  setMonitors: Dispatch<SetStateAction<IMonitorDocument[]>>,
  updateLimit: (newLimit: IPagination) => void,
  setMonitorState: Dispatch<SetStateAction<IMonitorState>>,
  refreshMonitors: () => Promise<void>;
  enableAutoRefresh: () => Promise<void>;
  closeUptimeModal: () => void;
}
