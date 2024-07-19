import { MonitorContext } from "@/context/MonitorContext";
import { IMonitorDocument } from "@/interfaces/monitor.interface";
import { DELETE_MONITOR, GET_USER_MONITORS, TOGGLE_MONITOR } from "@/queries/status";
import { showErrorToast } from "@/utils/utils";
import { useMutation } from "@apollo/client";
import { filter } from "lodash";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface IUserHomeTableBtnGroupProps {
  toggleUserMonitor: () => Promise<void>;
  editMonitor: () => void;
  deleteUserMonitor: () => Promise<void>;
}

export const useHomeTableBtnGroup = ({ monitor }: { monitor: IMonitorDocument }): IUserHomeTableBtnGroupProps => {
  const { state: { user } } = useContext(MonitorContext);
  const [toggleMonitor] = useMutation(TOGGLE_MONITOR);
  const [deleteMonitor] = useMutation(DELETE_MONITOR, {
    update(cache, { data: { deleteMonitor } }) {
      const { getUserMonitors } = cache.readQuery({ query: GET_USER_MONITORS, variables: { userId: `${user?.id}`} }) as any;
      const monitors = filter(getUserMonitors.monitors, (monitor: IMonitorDocument) => parseInt(`${monitor.id}`) !== parseInt(deleteMonitor.id));
      cache.writeQuery({
        query: GET_USER_MONITORS,
        variables: { userId: `${user?.id}`},
        data: {
          getUserMonitors: {
            __typename: "MonitorResponse",
            monitors
          }
        }
      });
    }
  });
  const router = useRouter();

  const toggleUserMonitor = async (): Promise<void> => {
    const active: boolean = !monitor.active;
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
  }

  const editMonitor = (): void => {
    if (monitor.active) {
      alert('Please pause monitor before editing.');
    } else {
      router.push(`/uptime/${monitor.type}/edit/${monitor.id}`);
    }
  }

  const deleteUserMonitor = async (): Promise<void> => {
    try {
      if (monitor.active) {
        alert('Please pause monitor before deleting.');
      } else {
        const response = window.confirm('Are you sure you want to delete?');
        if (response) {
          await deleteMonitor({
            variables: {
              monitorId: `${monitor.id}`,
              userId: `${monitor.userId}`,
              type: monitor.type
            }
          });
        }
      }
    } catch (error) {
      showErrorToast('Error deleting monitor.');
    }
  }

  return {
    toggleUserMonitor,
    editMonitor,
    deleteUserMonitor
  };
}
