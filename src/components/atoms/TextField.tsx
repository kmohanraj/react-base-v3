import React, { FC, useState } from 'react';
import cx from 'classnames';
import 'styles/text-field.scss';
import CONSTANTS from 'constants/constants';
import Select from './Select';
// import Select from './Select';


export interface TextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message?: string;
  error?: string;
  placeholder: string;
  inputId: string;
  required?: boolean;
  customClass?: string;
  preFixIcon?: any;
  altName?: string;
  inputType?: string;
  isSelect?: boolean
  selectOptions?: any,
  onSelect?: any;
  onBlur?: () => void;
}

const { BRAND_CLASS } = CONSTANTS.CLASS_NAMES;

const TextField: FC<TextFieldProps> = ({
  value,
  onChange,
  message,
  error,
  placeholder,
  inputId,
  required,
  customClass,
  preFixIcon,
  altName,
  inputType,
  isSelect,
  selectOptions,
  onSelect,
  onBlur
}) => {
  const [isShow, setIsShow] = useState(false)
  const errorClass = cx('message', { error: error });
  const labelClass = cx({
    'has-value': value,
    error: error,
    'has-prefix': preFixIcon,
  });
  const inputClass = cx(customClass, {
    error: error,
    'has-prefix': preFixIcon,
  });

  const handleOnBlur = () => {
    console.log('sss-----', inputId)
    setIsShow(false)
  }

  const handleOnFocus = () => {
    setIsShow(!isShow)
  }
  return (
    <span className={`${BRAND_CLASS}-text-field`}>
      <span className={`${BRAND_CLASS}-text-field__input-wrapper`}>
        {preFixIcon && (
          <img
            className='prefix-icon'
            src={preFixIcon}
            alt={altName}
            role='presentation'
          />
        )}
        <input
          name={inputId}
          className={inputClass}
          id={inputId}
          value={value}
          required={required}
          aria-required={required}
          onChange={onChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          autoComplete='off'
          type={inputType}
        />
        <label className={labelClass} htmlFor={inputId}>
          {placeholder}
          {required && '*'}
        </label>
        {/* {isSelect && <Select options={selectOptions} onSelect={onSelect && onSelect } inputId={inputId} isShow={isShow} /> } */}
      </span>
      {message && <span className='message'>{message}</span>}
      {error && <span className={errorClass}>{error}</span>}
    </span>
  );
};

export default TextField;
