import { MonitorContext } from '@/context/MonitorContext';
import { IHeartbeat, IMonitorDocument, IPagination } from '@/interfaces/monitor.interface';
import { GET_HEART_BEATS } from '@/queries/heartbeats';
import { GET_SINGLE_MONITOR, TOGGLE_MONITOR, DELETE_MONITOR, GET_USER_MONITORS } from '@/queries/status';
import { usePagination } from '@/utils/usePagination';
import { showErrorToast, uptimePercentage } from '@/utils/utils';
import { useQuery, useMutation } from '@apollo/client';
import { filter, sumBy } from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState, useCallback, useEffect } from 'react';

interface IStatusResponse {
  latestResponse: number;
  averageResponse: number;
  uptime: number;
}

interface IUseUptimeView {
  limit: IPagination;
  duration: string;
  monitor: IMonitorDocument;
  heartbeatsData: IHeartbeat[];
  statusResponse: IStatusResponse;
  updateLimit: (newLimit: IPagination) => void;
  toggleUserMonitor: () => Promise<void>;
  editMonitor: () => Promise<void>;
  deleteUserMonitor: () => Promise<void>;
  setQueryDuration: (duration: string) => void;
}

export const useUptimeView = (params: { slug: string[] }): IUseUptimeView => {
  const {
    state: { monitor: monitorData },
    dispatch
  } = useContext(MonitorContext);
  const [limit, updateLimit] = usePagination(0, 10);
  const [heartbeatsData, setHeartbeatsData] = useState<IHeartbeat[]>([]);
  const [monitor, setMonitor] = useState<IMonitorDocument>(monitorData!);
  const [statusResponse, setStatusResponse] = useState<IStatusResponse>({
    latestResponse: 0,
    averageResponse: 0,
    uptime: 0
  });
  const { slug } = params;
  const type: string = slug[0];
  const monitorId: string = slug[1];
  const duration: string = slug[2];
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: singleMonitorData } = useQuery(GET_SINGLE_MONITOR, {
    fetchPolicy: 'no-cache',
    variables: { monitorId }
  });

  const { data } = useQuery(GET_HEART_BEATS, {
    /**
     * For the view's page, we always want to make a network request to get new data
     * for a monitor heartbeats.
     * If the monitor is active, make a network request and don't save the data in the cache.
     * If the monitor is inactive, check the cache first if the data exist, else make a network request.
     */
    fetchPolicy: JSON.parse(`${searchParams.get('active')}`) ? 'no-cache' : 'cache-first',
    variables: { type, monitorId, duration }
  });
  const [toggleMonitor] = useMutation(TOGGLE_MONITOR, {
    update(_, { data: { toggleMonitor } }) {
      const monitors = filter(
        toggleMonitor.monitors,
        (monitor: IMonitorDocument) => parseInt(`${monitor.id}`) === parseInt(`${monitorId}`, 10)
      );
      setMonitor(monitors[0]);
    }
  });
  const [deleteMonitor, { data: deletedData }] = useMutation(DELETE_MONITOR, {
    update(cache, { data: { deleteMonitor } }) {
      const { getUserMonitors } = cache.readQuery({ query: GET_USER_MONITORS, variables: { userId: `${monitor.userId}` } }) as any;
      const monitors = filter(
        getUserMonitors.monitors,
        (monitor: IMonitorDocument) => parseInt(`${monitor.id}`) !== parseInt(deleteMonitor.id)
      );
      cache.writeQuery({
        query: GET_USER_MONITORS,
        variables: { userId: `${monitor.userId}` },
        data: {
          getUserMonitors: {
            __typename: 'MonitorResponse',
            message: getUserMonitors.message,
            monitors: [...monitors]
          }
        }
      });
    }
  });

  const mappedHeartbeats = useCallback((): void => {
    if (data) {
      const result = data.getHeartbeats.heartbeats;
      setHeartbeatsData(result);
      if (result.length > 0) {
        const firstHeartbeat: IHeartbeat = result[0];
        const sum = sumBy(result, (heartbeat: IHeartbeat) => heartbeat.responseTime);
        const uptime: number = uptimePercentage(result);
        setStatusResponse({
          ...statusResponse,
          latestResponse: firstHeartbeat.responseTime / 1000,
          averageResponse: sum / result.length,
          uptime
        });
      } else {
        setStatusResponse({
          latestResponse: 0,
          averageResponse: 0,
          uptime: 0
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const toggleUserMonitor = async (): Promise<void> => {
    const active: boolean = !monitor.active!;
    const params: URLSearchParams = new URLSearchParams(searchParams.toString());
    params.set('active', JSON.stringify(active));
    router.push(`/uptime/view/${monitor.type}/${monitorId}/${duration}?${params}`);
    try {
      toggleMonitor({
        variables: {
          monitor: {
            monitorId: monitor.id,
            userId: monitor.userId,
            name: monitor.name,
            active
          }
        }
      });
    } catch (error) {
      showErrorToast(`Error ${active ? 'activating' : 'pausing'} monitor.`);
    }
  };

  const editMonitor = async (): Promise<void> => {
    if (monitor.active) {
      alert('Please pause monitor before editing.');
    } else {
      router.push(`/uptime/${monitor.type}/edit/${monitor.id}`);
    }
  };

  const deleteUserMonitor = async (): Promise<void> => {
    try {
      if (monitor.active) {
        alert('Please pause monitor before deleting.');
      } else {
        const response = window.confirm('Are you sure you want to delete?');
        if (response) {
          await deleteMonitor({
            variables: {
              monitorId: parseInt(`${monitor.id}`),
              userId: parseInt(`${monitor.userId}`),
              type: monitor.type
            }
          });
        }
      }
    } catch (error) {
      showErrorToast('Error deleting monitor.');
    }
  };

  const setQueryDuration = (duration: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('active', JSON.stringify(monitor.active));
    router.push(`/uptime/view/${monitor.type}/${monitorId}/${duration}?${params}`);
    setMonitor(monitor);
  };

  useEffect(() => {
    mappedHeartbeats();
  }, [mappedHeartbeats, searchParams]);

  useEffect(() => {
    if (deletedData) {
      router.push('/status');
    }
    if (singleMonitorData) {
      const { monitors } = singleMonitorData.getSingleMonitor;
      setMonitor(monitors[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedData, singleMonitorData]);

  return {
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
  };
};
