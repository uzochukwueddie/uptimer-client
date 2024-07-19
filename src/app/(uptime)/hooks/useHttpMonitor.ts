import { MonitorContext } from '@/context/MonitorContext';
import {
  IMonitorDocument,
  IMonitorErrorMessage,
  IUseUptime,
  monitorErrorMessage,
} from '@/interfaces/monitor.interface';
import { showErrorToast, showSuccessToast } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useTransition } from 'react';
import { httpSchemaValidation } from '../components/validations/http';
import { FetchResult, useMutation, useQuery } from '@apollo/client';
import {
  CREATE_MONITOR,
  GET_SINGLE_MONITOR,
  GET_USER_MONITORS,
  UPDATE_MONITOR,
} from '@/queries/status';
import { upperCase } from 'lodash';

export const useHttpCreate = (): IUseUptime => {
  const {
    state: { user, notifications },
  } = useContext(MonitorContext);
  const [validationErrors, setValidationErrors] =
    useState<IMonitorErrorMessage>(monitorErrorMessage);
  const [isPending, startTransition] = useTransition();
  const [monitorInfo, setMonitorInfo] = useState<IMonitorDocument>({
    name: '',
    userId: user?.id!,
    notificationId: 0,
    active: true,
    status: 0,
    frequency: 30,
    url: '',
    method: 'GET',
    type: 'http',
    alertThreshold: 0,
    body: '',
    headers: '',
    httpAuthMethod: '',
    basicAuthUser: '',
    basicAuthPass: '',
    bearerToken: '',
    timeout: 10,
    redirects: 0,
    responseTime: 2000,
    statusCode: '',
    contentType: '',
    connection: '',
  });
  const router = useRouter();
  const [createMonitor] = useMutation(CREATE_MONITOR, {
    update(cache, { data: { createMonitor } }) {
      const { getUserMonitors } = cache.readQuery({
        query: GET_USER_MONITORS,
        variables: { userId: `${user?.id}` },
      }) as any;
      const newMonitor = createMonitor.monitors[0];
      const monitors = [newMonitor, ...getUserMonitors.monitors];
      cache.writeQuery({
        query: GET_USER_MONITORS,
        variables: { userId: `${user?.id}` },
        data: {
          getUserMonitors: {
            __typename: 'MonitorResponse',
            monitors,
          },
        },
      });
    },
  });

  const updateMonitorValues = (): IMonitorDocument => {
    return {
      ...monitorInfo,
      userId: user?.id!,
      statusCode:
        monitorInfo.statusCode!.length > 0
          ? JSON.stringify(monitorInfo.statusCode?.split(',').map(Number))
          : JSON.stringify([200]),
      responseTime:
        parseInt(`${monitorInfo.responseTime}`) > 0
          ? JSON.stringify(monitorInfo.responseTime)
          : JSON.stringify(2000),
      contentType:
        monitorInfo.contentType!.length > 0
          ? JSON.stringify(monitorInfo.contentType?.split(','))
          : '',
    };
  };

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        const resultSchema = httpSchemaValidation(monitorInfo);
        setValidationErrors(resultSchema);
        if (!Object.values(resultSchema).length) {
          const updatedMonitor: IMonitorDocument = updateMonitorValues();
          const result: FetchResult = await createMonitor({
            variables: { monitor: updatedMonitor },
          });
          if (result) {
            router.push('/status');
            showSuccessToast('Created HTTP monitor successfully.');
          }
        }
      } catch (error) {
        showErrorToast('Error creating HTTP Monitor.');
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

export const useHttpEdit = (monitorId: string): IUseUptime => {
  const {
    state: { user, notifications },
  } = useContext(MonitorContext);
  const [validationErrors, setValidationErrors] =
    useState<IMonitorErrorMessage>(monitorErrorMessage);
  const [isPending, startTransition] = useTransition();
  const [monitorInfo, setMonitorInfo] = useState<IMonitorDocument>({
    name: '',
    userId: user?.id!,
    notificationId: 0,
    active: true,
    status: 0,
    frequency: 30,
    url: '',
    method: 'GET',
    type: 'http',
    alertThreshold: 0,
    body: '',
    headers: '',
    httpAuthMethod: '',
    basicAuthUser: '',
    basicAuthPass: '',
    bearerToken: '',
    timeout: 10,
    redirects: 0,
    responseTime: 2000,
    statusCode: '',
    contentType: '',
    connection: '',
  });
  const router = useRouter();
  const { data: monitorData } = useQuery(GET_SINGLE_MONITOR, {
    fetchPolicy: 'no-cache',
    variables: { monitorId },
  });
  const [updateMonitor] = useMutation(UPDATE_MONITOR);

  const updateMonitorValues = (): IMonitorDocument => {
    return {
      ...monitorInfo,
      userId: user?.id!,
      statusCode:
        monitorInfo.statusCode!.length > 0
          ? JSON.stringify(monitorInfo.statusCode?.split(',').map(Number))
          : JSON.stringify([200]),
      responseTime:
        parseInt(`${monitorInfo.responseTime}`) > 0
          ? JSON.stringify(monitorInfo.responseTime)
          : JSON.stringify(2000),
      contentType:
        monitorInfo.contentType!.length > 0
          ? JSON.stringify(monitorInfo.contentType?.split(','))
          : '',
    };
  };

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        const resultSchema = httpSchemaValidation(monitorInfo);
        setValidationErrors(resultSchema);
        if (!Object.values(resultSchema).length) {
          const updatedMonitor: IMonitorDocument = updateMonitorValues();
          const result: FetchResult = await updateMonitor({
            variables: {
              monitorId: updatedMonitor.id,
              userId: updatedMonitor.userId,
              monitor: updatedMonitor,
            },
          });
          if (result) {
            router.push('/status');
            showSuccessToast('Updated HTTP monitor successfully.');
          }
        }
      } catch (error) {
        showErrorToast('Error updating HTTP Monitor.');
      }
    });
  };

  useEffect(() => {
    if (monitorData) {
      const { monitors } = monitorData.getSingleMonitor;
      setMonitorInfo({
        id: monitors[0]?.id,
        name: monitors[0]?.name,
        userId: user?.id!,
        notificationId: parseInt(`${monitors[0]?.notifications?.id}`) ?? 0,
        status: monitors[0]?.status,
        frequency: monitors[0]?.frequency,
        url: monitors[0]?.url,
        method: upperCase(monitors[0]?.method),
        type: 'http',
        alertThreshold: monitors[0]?.alertThreshold,
        body: monitors[0]?.body,
        headers: monitors[0]?.headers,
        httpAuthMethod: monitors[0]?.httpAuthMethod,
        basicAuthUser: monitors[0]?.basicAuthUser,
        basicAuthPass: monitors[0]?.basicAuthPass,
        bearerToken: monitors[0]?.bearerToken,
        timeout: monitors[0]?.timeout,
        redirects: monitors[0]?.redirects,
        responseTime: monitors[0]?.responseTime,
        statusCode: monitors[0]?.statusCode
          ? JSON.parse(monitors[0]?.statusCode).join(',')
          : '',
        contentType: monitors[0]?.contentType
          ? JSON.parse(`${monitors[0]?.contentType}`).join(',')
          : '',
      });
    }
  }, [monitorData, user?.id]);

  return {
    loading: isPending,
    monitorInfo,
    notifications,
    validationErrors,
    setMonitorInfo,
    onHandleSubmit,
  };
};
