'use client';

import { FC, ReactElement, ReactNode } from 'react';

export interface IButtonProps {
  label?: string | ReactNode;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  id?: string;
  className?: string;
  role?: string;
  onClick?: (event?: any) => void;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = (props): ReactElement => {
  const { id, label, icon, className, disabled, role, type, onClick } = props;

  return (
    <button
      id={id}
      type={type}
      className={className}
      role={role}
      disabled={disabled}
      onClick={onClick}
    >
      {icon} {label}
    </button>
  )
}

export default Button;
