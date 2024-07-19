import { IFrequency } from '@/utils/utils';
import { toLower } from 'lodash';
import React, { FC, ReactElement, useState } from 'react';

export type UptimeBtnItem = string | IFrequency;

interface UptimeGroupBtnProps {
  buttonsText: UptimeBtnItem[];
  labelText: string;
  type: string;
  selectedItem?: string;
  onClick?: (data: string) => void;
}

const UptimeGroupBtn: FC<UptimeGroupBtnProps> = ({ buttonsText, labelText, type, selectedItem, onClick }): ReactElement => {
  const [active, setActive] = useState<string>('');

  const setSelectedItem = (data: string | IFrequency, active: string): string => {
    if (type === 'string' && typeof data === 'string' && (active === toLower(data) || toLower(selectedItem) === toLower(data))) {
      return 'bg-[#e4f3ff]';
    }
    if (type === 'object' && typeof data !== 'string' && (active === toLower(`${data.value}`) || toLower(selectedItem) === toLower(`${data.value}`))) {
      return 'bg-[#e4f3ff]';
    }
    return '';
  }

  return (
    <div className="flex flex-col">
      <label htmlFor='group' className='block mb-2 text-medium font-medium text-gray-900'>
        {labelText}
      </label>
      <div className='flex flex-wrap gap-y-6'>
        {buttonsText.map((data: string | IFrequency, index: number) => (
          <div key={index} className='flex shadow-sm' role="group">
            <div
              className={`mr-2 inline-flex cursor-pointer items-center px-4 py-2 text-xs font-medium text-black rounded border border-black hover:bg-[#e4f3ff] ${setSelectedItem(data, active)}`}
              onClick={() => {
                if (type === 'string' && typeof data === 'string') {
                  onClick!(data);
                  setActive(toLower(data.toString()));
                }
                if (type !== 'string' && typeof data !== 'string') {
                  onClick!(`${data.value}`);
                  setActive(toLower(`${data.value}`));
                }
              }}
            >
              {type === 'string' && typeof data === 'string' ? data : typeof data !== 'string' ? data.name : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UptimeGroupBtn;
