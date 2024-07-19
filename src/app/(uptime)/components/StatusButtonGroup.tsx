import Button from '@/components/Button';
import { IStatusPageButtonGroup } from '@/interfaces/monitor.interface';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { FaPause, FaPencilAlt, FaPlay, FaTrashAlt } from 'react-icons/fa';

const StatusButtonGroup: FC<IStatusPageButtonGroup> = ({ monitor, toggleUserMonitor, editMonitor, deleteUserMonitor }): ReactElement => {
  return (
    <>
      {monitor && (
        <div className="inline-flex shadow-sm" role="group">
          <Button
            type="button"
            label="Edit"
            onClick={editMonitor}
            icon={<FaPencilAlt />}
            className="mr-1 inline-flex gap-2 items-center justify-center px-4 py-2 text-sm font-bold text-white bg-green-400 rounded border border-green-400 hover:bg-green-40 hover:text-white"
          />
          <Button
            type="button"
            onClick={toggleUserMonitor}
            label={monitor.active ? 'Pause' : 'Resume'}
            icon={monitor.active ? <FaPause /> : <FaPlay />}
            className={clsx('mr-1 inline-flex gap-2 items-center justify-center px-4 w-44 py-2 text-sm font-bold text-white rounded border hover:text-white', {
              'bg-green-400 border-green-400 hover:bg-green-400': monitor.active,
              'bg-yellow-400 border-yellow-400 hover:bg-yellow-400': !monitor.active,
            })}
          />
          <Button
            type="button"
            onClick={deleteUserMonitor}
            label="Delete"
            icon={<FaTrashAlt />}
            className="mr-1 inline-flex gap-2 items-center justify-center px-4 py-2 text-sm font-bold text-white rounded bg-red-600 hover:bg-red-400 hover:text-white"
          />
        </div>
      )}
    </>
  );
};

export default StatusButtonGroup;
