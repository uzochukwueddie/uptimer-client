import { IHeartbeat } from '@/interfaces/monitor.interface';
import clsx from 'clsx';
import React, { FC, ReactElement } from 'react';

interface HealthBarProps {
  heartBeats: IHeartbeat[];
  size: string;
}

const HealthBar: FC<HealthBarProps> = ({ heartBeats, size}): ReactElement => {
  return (
    <div
      className={clsx('flex items-center', {
        'gap-[3px]': size === 'large',
        'gap-1': size === 'small',
      })}
    >
      {heartBeats && heartBeats.map((beat: IHeartbeat, index: number) => (
        <div
          key={index}
          title="testing"
          className={clsx(
            'rounded-full transition-transform hover:scale-150',
            {
              'h-4 w-[5px]': size === 'small',
              'h-8 w-2': size === 'large',
              'bg-green-500': beat.status === 0,
              'bg-red-500': beat.status === 1,
            }
          )}
        >

        </div>
      ))}
    </div>
  )
}

export default HealthBar;