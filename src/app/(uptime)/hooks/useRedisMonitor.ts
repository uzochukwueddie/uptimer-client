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
import { FetchResult, useMutation, useQuery } from '@apollo/client';
import {
  CREATE_MONITOR,
  GET_SINGLE_MONITOR,
  GET_USER_MONITORS,
  UPDATE_MONITOR,
} from '@/queries/status';
import { redisSchemaValidation } from '../components/validations/redis';

export const useRedisCreate = (): IUseUptime => {
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
    type: 'redis',
    alertThreshold: 0,
    connection: ''
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
      connection: monitorInfo.connection === 'none' || monitorInfo.connection === '' ? 'estbalished' : monitorInfo.connection
    };
  };

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        const resultSchema = redisSchemaValidation(monitorInfo);
        setValidationErrors(resultSchema);
        if (!Object.values(resultSchema).length) {
          const updatedMonitor: IMonitorDocument = updateMonitorValues();
          const result: FetchResult = await createMonitor({
            variables: { monitor: updatedMonitor },
          });
          if (result) {
            showSuccessToast('Created Redis monitor successfully.');
            router.push('/status');
          }
        }
      } catch (error) {
        showErrorToast('Error creating Redis Monitor.');
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

export const useRedisEdit = (monitorId: string): IUseUptime => {
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
    type: 'redis',
    alertThreshold: 0,
    connection: ''
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
      connection: monitorInfo.connection === 'none' || monitorInfo.connection === '' ? 'estbalished' : monitorInfo.connection
    };
  };

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        const resultSchema: IMonitorErrorMessage = redisSchemaValidation(monitorInfo);
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
            showSuccessToast('Updated Redis monitor successfully.');
            router.push('/status');
          }
        }
      } catch (error) {
        showErrorToast('Error updating Redis Monitor.');
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
        type: 'redis',
        alertThreshold: monitors[0]?.alertThreshold,
        connection: monitors[0]?.connection
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
