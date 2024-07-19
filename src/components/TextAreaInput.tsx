import { ITextInputProps } from '@/interfaces/input.interface';
import { FC, ReactElement } from 'react';

const TextAreaInput: FC<ITextInputProps> = (props): ReactElement => {
  return (
    <textarea
      id={props.id}
      name={props.name}
      value={props.value}
      readOnly={props.readOnly}
      className={props.className}
      maxLength={props.maxLength}
      style={props.style}
      rows={props.rows}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      autoComplete="false"
    />
  );
};

export default TextAreaInput;
