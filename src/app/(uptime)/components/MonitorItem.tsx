import TextAreaInput from '@/components/TextAreaInput';
import TextInput from '@/components/TextInput';
import { MonitorItemProps } from '@/interfaces/monitor.interface';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';

const MonitorItem: FC<MonitorItemProps> = ({
  id,
  type,
  requiredIcon,
  topClass,
  className,
  labelStart,
  labelEnd,
  placeholder,
  inputValue,
  readonly,
  onChange
}): ReactElement => {
  return (
    <>
      <div className={topClass}>
        <label htmlFor={id} className="block mb-2 text-sm text-gray-600">
          {labelStart}{requiredIcon && <sup className="text-red-400">*</sup>}
        </label>
        {type !== 'textarea' ? (
          <TextInput
            type={type}
            name={id}
            id={id}
            readOnly={readonly}
            className={clsx(`${className !== '' ? className : ''}`, {
              'bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5': !className,
              'bg-gray-300 border-none': readonly
            })}
            placeholder={placeholder}
            value={inputValue}
            onChange={onChange}
          />
        ) : (
          <TextAreaInput
            rows={8}
            id={id}
            name={id}
            className={
              className
                ? className
                : 'bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            }
            placeholder={placeholder}
            value={inputValue}
            onChange={onChange}
          />
        )}
        {labelEnd && (
          <label htmlFor={labelEnd} className="block my-1 text-xs text-gray-500">
            {labelEnd}
          </label>
        )}
      </div>
    </>
  );
};

export default MonitorItem;
