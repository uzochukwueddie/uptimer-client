import { MonitorContext } from '@/context/MonitorContext';
import {
  IMonitorErrorMessage,
  monitorErrorMessage,
} from '@/interfaces/monitor.interface';
import { ISSLMonitorDocument, IUseSSL } from '@/interfaces/ssl.interface';
import { CREATE_SSL_MONITOR, GET_SINGLE_SSL_MONITOR, GET_USER_SSL_MONITORS, UPDATE_SSL_MONITOR } from '@/queries/sslStatus';
import { FetchResult, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useTransition } from 'react';
import { sslSchemaValidation } from '../components/validations/ssl';
import { showErrorToast, showSuccessToast } from '@/utils/utils';

export const useSSLCreate = (): IUseSSL => {
  const {
    state: { user, notifications },
  } = useContext(MonitorContext);
  const [validationErrors, setValidationErrors] =
    useState<IMonitorErrorMessage>(monitorErrorMessage);
  const [isPending, startTransition] = useTransition();
  const [monitorInfo, setMonitorInfo] = useState<ISSLMonitorDocument>({
    name: '',
    userId: user?.id!,
    notificationId: 0,
    active: true,
    status: 0,
    frequency: 30,
    url: '',
    alertThreshold: 0,
  });
  const router = useRouter();
  const [createSSLMonitor] = useMutation(CREATE_SSL_MONITOR, {
    update(cache, { data: { createSSLMonitor } }) {
      const { getUserSSLMonitors } = cache.readQuery({
        query: GET_USER_SSL_MONITORS,
        variables: { userId: `${user?.id}` },
      }) as any;
      const newMonitor = createSSLMonitor.sslMonitors[0];
      const sslMonitors = [newMonitor, ...getUserSSLMonitors.sslMonitors];
      cache.writeQuery({
        query: GET_USER_SSL_MONITORS,
        variables: { userId: `${user?.id}` },
        data: {
          getUserMonitors: {
            __typename: 'SSLMonitorResponse',
            sslMonitors,
          },
        },
      });
    },
  });

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        const resultSchema: IMonitorErrorMessage =
          sslSchemaValidation(monitorInfo);
        setValidationErrors(resultSchema);
        if (!Object.values(resultSchema).length) {
          const result: FetchResult = await createSSLMonitor({
            variables: { monitor: { ...monitorInfo, userId: user?.id } },
          });
          if (result) {
            router.push('/ssl');
            showSuccessToast('Created SSL monitor successfully.');
          }
        }
      } catch (error) {
        showErrorToast('Error creating SSL Monitor.');
      }
    });
  };

  return {
    loading: isPending,
    monitorInfo,
    notifications,
    validationErrors,
    setMonitorInfo,
    onHandleSubmit,
  };
};

export const useSSLEdit = (monitorId: string): IUseSSL => {
  const {
    state: { user, notifications },
  } = useContext(MonitorContext);
  const [validationErrors, setValidationErrors] =
    useState<IMonitorErrorMessage>(monitorErrorMessage);
  const [isPending, startTransition] = useTransition();
  const [monitorInfo, setMonitorInfo] = useState<ISSLMonitorDocument>({
    name: '',
    userId: user?.id!,
    notificationId: 0,
    active: true,
    status: 0,
    frequency: 30,
    url: '',
    alertThreshold: 0,
  });
  const router = useRouter();
  const { loading, data: monitorData } = useQuery(GET_SINGLE_SSL_MONITOR, {
    fetchPolicy: 'no-cache',
    variables: { monitorId }
  });
  const [updateSSLMonitor] = useMutation(UPDATE_SSL_MONITOR);

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        const resultSchema: IMonitorErrorMessage = sslSchemaValidation(monitorInfo);
        setValidationErrors(resultSchema);
        if (!Object.values(resultSchema).length) {
          const result: FetchResult = await updateSSLMonitor({
            variables: { monitorId: monitorInfo.id, userId: monitorInfo.userId, monitor: { ...monitorInfo, userId: user?.id } },
          });
          if (result) {
            router.push('/ssl');
            showSuccessToast('Updated SSL monitor successfully.');
          }
        }
      } catch (error) {
        showErrorToast('Error updating SSL Monitor.');
      }
    });
  };

  useEffect(() => {
    if (monitorData) {
      const { sslMonitors } = monitorData.getSingleSSLMonitor;
      setMonitorInfo({
        id: parseInt(`${sslMonitors[0]?.id}`),
        name: sslMonitors[0]?.name,
        userId: user?.id!,
        notificationId: parseInt(`${sslMonitors[0]?.notifications?.id}`) ?? 0,
        status: sslMonitors[0]?.status,
        frequency: sslMonitors[0]?.frequency,
        url: sslMonitors[0]?.url,
        alertThreshold: sslMonitors[0]?.alertThreshold
      });
    }
  }, [monitorData, user?.id]);

  return {
    loading: isPending || loading,
    monitorInfo,
    notifications,
    validationErrors,
    setMonitorInfo,
    onHandleSubmit,
  };
};
