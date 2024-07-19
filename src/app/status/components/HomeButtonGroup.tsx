import Button from '@/components/Button';
import { IMonitorDocument } from '@/interfaces/monitor.interface';
import { FC, ReactElement } from 'react';
import { FaArrowDown, FaArrowUp, FaPlay } from 'react-icons/fa';
import { filter } from 'lodash';

interface HomeButtonGroupProps {
  monitors: IMonitorDocument[];
}

const HomeButtonGroup: FC<HomeButtonGroupProps> = ({ monitors }): ReactElement => {
  const count = (type: string): number => {
    let sum = 0;
    if (type === 'active') {
      sum = filter(monitors, (monitor: IMonitorDocument) => monitor.active && monitor.status === 0).length;
    }
    if (type === 'inactive') {
      sum = filter(monitors, (monitor: IMonitorDocument) => !monitor.active).length;
    }
    if (type === 'error') {
      sum = filter(monitors, (monitor: IMonitorDocument) => monitor.active && monitor.status === 1).length;
    }
    return sum;
  }

  return (
    <div className="inline-flex" role='group'>
      <Button
        label={count('active')}
        icon={<FaArrowUp className='mr-1' />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded bg-green-400"
      />
      <Button
        label={count('error')}
        icon={<FaArrowDown className='mr-1' />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded bg-red-400"
      />
      <Button
        label={count('inactive')}
        icon={<FaPlay className='mr-1' />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded bg-yellow-400"
      />
    </div>
  )
}

export default HomeButtonGroup;
