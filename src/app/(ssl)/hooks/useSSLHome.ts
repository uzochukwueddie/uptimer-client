import { MonitorContext } from '@/context/MonitorContext';
import { ISSLMonitorDocument, IUseSSLHome } from '@/interfaces/ssl.interface';
import { GET_USER_SSL_MONITORS } from '@/queries/sslStatus';
import { usePagination } from '@/utils/usePagination';
import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';

export const useSSLHome = (): IUseSSLHome => {
  const {
    state: { user },
  } = useContext(MonitorContext);
  const [monitors, setMonitors] = useState<ISSLMonitorDocument[]>([]);
  const [limit, updateLimit] = usePagination(0, 10);
  const { loading, data } = useQuery(GET_USER_SSL_MONITORS, {
    fetchPolicy: 'network-only',
    variables: { userId: `${user?.id}` },
  });

  useEffect(() => {
    if (data) {
      setMonitors(data.getUserSSLMonitors.sslMonitors);
    }
  }, [data]);

  return {
    loading,
    monitors,
    limit,
    updateLimit,
  };
};
