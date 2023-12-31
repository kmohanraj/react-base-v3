import React, { FC, useState } from 'react';
import CONSTANTS from 'constants/constants';
import 'styles/checkbox.scss';

export interface CheckboxProps {
  type: string;
  inputId: string;
  defaultChecked?: boolean;
  label: any;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const { BRAND_CLASS } = CONSTANTS.CLASS_NAMES;

const Checkbox: FC<CheckboxProps> = ({
  type,
  inputId,
  value,
  defaultChecked,
  label,
  onChange,
  disabled
}) => {
  const [checked, setChecked] = useState(defaultChecked ? true : false);
  const [checkboxValue, setCheckboxValue] = useState<string>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setCheckboxValue(e.target.value);
    onChange(e);
  };

  console.log('checkboxValue', checkboxValue && checkboxValue);

  return (
    <div className={`${BRAND_CLASS}-checkbox`}>
      <input
        id={inputId}
        type={type}
        checked={checked}
        value={value}
        onChange={handleOnChange}
        disabled={disabled}
      />
      <label htmlFor={inputId}>
        {inputId === 'status' && checked ? 'Active' : label}
      </label>
    </div>
  );
};
export default Checkbox;
