import { MonitorContext } from '@/context/MonitorContext';
import { ISSLMonitorDocument, IUseSSLTable } from '@/interfaces/ssl.interface';
import {
  DELETE_SSL_MONITOR,
  GET_USER_SSL_MONITORS,
  TOGGLE_SSL_MONITOR,
} from '@/queries/sslStatus';
import { showErrorToast } from '@/utils/utils';
import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { filter } from 'lodash';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export const useSSLTable = (): IUseSSLTable => {
  const {
    state: { user },
  } = useContext(MonitorContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectMonitor, setSelectedMonitor] = useState<ISSLMonitorDocument>();

  const [toggleSSLMonitor] = useMutation(TOGGLE_SSL_MONITOR);
  const [deleteSSLMonitor] = useMutation(DELETE_SSL_MONITOR, {
    update(cache, { data: { deleteSSLMonitor } }) {
      const { getUserSSLMonitors } = cache.readQuery({
        query: GET_USER_SSL_MONITORS,
        variables: { userId: `${user?.id}` },
      }) as any;
      const sslMonitors = filter(
        getUserSSLMonitors.sslMonitors,
        (monitor: ISSLMonitorDocument) =>
          parseInt(`${monitor.id}`) !== parseInt(deleteSSLMonitor.id)
      );
      cache.writeQuery({
        query: GET_USER_SSL_MONITORS,
        variables: { userId: `${user?.id}` },
        data: {
          getUserSSLMonitors: {
            __typename: 'SSLMonitorResponse',
            sslMonitors,
          },
        },
      });
    },
  });
  const router = useRouter();

  const formatSSLDate = (date: string): string => {
    if (date === '--' || !date) {
      return '--';
    }
    return dayjs(date).format('YYYY-MM-DD');
  };

  const toggleUserMonitor = async (
    monitor: ISSLMonitorDocument
  ): Promise<void> => {
    const active: boolean = !monitor.active;
    try {
      toggleSSLMonitor({
        variables: {
          monitor: {
            monitorId: monitor.id,
            userId: monitor.userId,
            name: monitor.name,
            active,
          },
        },
      });
    } catch (error) {
      showErrorToast(`Error ${active ? 'activating' : 'pausing'} monitor.`);
    }
  };

  const editMonitor = (monitor: ISSLMonitorDocument): void => {
    if (monitor.active) {
      alert('Please pause monitor before editing.');
    } else {
      router.push(`/ssl/edit/${monitor.id}`);
    }
  };

  const deleteUserMonitor = async (
    monitor: ISSLMonitorDocument
  ): Promise<void> => {
    try {
      if (monitor.active) {
        alert('Please pause monitor before deleting.');
      } else {
        const response = window.confirm('Are you sure you want to delete?');
        if (response) {
          await deleteSSLMonitor({
            variables: {
              monitorId: monitor.id,
              userId: monitor.userId,
            },
          });
        }
      }
    } catch (error) {
      showErrorToast('Error deleting monitor.');
    }
  };

  return {
    showModal,
    selectMonitor,
    setShowModal,
    setSelectedMonitor,
    formatSSLDate,
    toggleUserMonitor,
    editMonitor,
    deleteUserMonitor,
  };
};
