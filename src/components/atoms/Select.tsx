import { FC, useEffect, useRef, useState } from 'react';
import arrowDown from 'assets/images/arrow-down.svg';
import Close from 'assets/images/close.svg';
import cx from 'classnames';
import 'styles/select.scss';
import EllipsisLoader from './EllipsisLoader';

type OptionType = {
  id: any;
  label: string;
};

type SelectProps = {
  value: any;
  inputId?: string;
  placeholder: string;
  required?: boolean;
  options: any[];
  onSelect: (option: OptionType) => void;
  isMulti?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
};

const Select: FC<SelectProps> = ({
  value,
  inputId,
  placeholder,
  required,
  options,
  onSelect,
  isMulti,
  isSearchable,
  isDisabled,
  isLoading,
  isClearable,
}) => {
  const initialState = isMulti ? ([] as any) : ({} as any);
  const [searchValue, setSearchValue] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const removeRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log('___________VALUE', value, options)
  const [selectedValue, setSelectedValue] = useState( value ? options.filter((ele: any) => ele.id === value) : initialState);
  console.log('__________SELECTED_VALUE', selectedValue)
  const inputRef = useRef<HTMLInputElement>(null);
  const selectClass = cx('select_control',{ 'is-focused': isMenuOpen },{ 'is-disabled': isDisabled });
  const selectValueClass = cx('select__values',{ 'is-multi': isMulti },{ 'is-single': !isMulti });
  const hasValueClass = cx(
    {
      'is-focus':
        isMenuOpen &&
        searchValue.length === 0 &&
        Object.keys(selectedValue).length === 0,
    },
    { 'has-value': Object.keys(selectedValue).length || searchValue }
  );
  const suffixIConClass = cx('suffix-icon', { 'is-open': isMenuOpen });

  const handleOnChange = (e: any) => {
    setSearchValue(e.target.value);
    setIsMenuOpen(true);
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsMenuOpen(false);
        setSearchValue('');
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  const handleOnKeyDown = (e: any) => {
    const keyCode = e.keyCode;
    if (searchValue.length < 1 && keyCode === 8 && !isMulti) {
      setSelectedValue('');
    }
  };

  const removeOption = (option: OptionType) => {
    return selectedValue.filter(
      (opt: OptionType) => opt.label !== option.label
    );
  };

  const handleOnRemoveItem = (option: OptionType) => {
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onSelect(newValue);
  };

  const handleOnSelect = (option: OptionType) => {
    let newValue;

    if (isMulti) {
      if (
        selectedValue.findIndex((opt: any) => opt.label === option.label) >= 0
      ) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onSelect(newValue);
  };

  const filterOptions = () => {
    if (!searchValue) {
      return options;
    }
    return (
      options &&
      options.filter(
        (option: any) =>
          option.label.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >=
          0
      )
    );
  };

  const handleOnSelectBox = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (isDisabled) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const checkSelectionOption = () => {
    return (
      <>
        {!searchValue && isMulti ? (
          selectedValue &&
          selectedValue.map((opt: OptionType) => (
            <div key={opt.id} className='select__multi__value'>
              <div className='select__multi__value__label'>{opt.label}</div>
              <div
                className='select__multi__value__remove'
                ref={removeRef}
                onClick={() => !isDisabled && handleOnRemoveItem(opt)}
              >
                x
              </div>
            </div>
          ))
        ) : (
          <span className='select__value'>{selectedValue.label}</span>
        )}
      </>
    );
  };

  const checkSelectedItem = (option: OptionType, index: number) => {
    const multipleOptions =
      isMulti && selectedValue && !selectedValue.includes(option);
    const checkIsMulti = isMulti ? multipleOptions : true;
    if (checkIsMulti) {
      return (
        <div
          key={index}
          className={`select__option ${
            !isMulti && selectedValue.id === option.id ? 'is-selected' : ''
          }`}
          onClick={() => handleOnSelect(option)}
        >
          {multipleOptions ? option.label : option.label}
        </div>
      );
    }
  };

  return (
    <div className='company-select'>
      <div className={selectClass} ref={selectRef} onClick={handleOnSelectBox}>
        <div className='select_value_container'>
          <div className={selectValueClass}>
            {checkSelectionOption()}
            <input
              autoCapitalize='none'
              autoComplete='off'
              id={inputId}
              type='text'
              aria-autocomplete='list'
              value={searchValue}
              className='select_input__field'
              onChange={handleOnChange}
              onKeyUp={handleOnKeyDown}
              readOnly={isSearchable}
              disabled={isDisabled}
              ref={inputRef}
            />
          </div>
          <label className={hasValueClass}>
            {placeholder} {required && '*'}
          </label>

          <div className='right-section'>
            {isLoading && (
              <span className='loader'>
                <EllipsisLoader color='dark' />
              </span>
            )}
            {(isClearable && (selectedValue.length > 0 ||
              Object.keys(selectedValue).length > 0)) && (
              <img
                src={Close}
                alt=''
                className='clear-all'
                onClick={() =>
                  !isDisabled && setSelectedValue(isMulti ? [] : '')
                }
              />
            )}
            <img
              className={suffixIConClass}
              src={arrowDown}
              alt=''
              role='presentation'
            />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className='select__menu'>
          <div className='select__menu-list'>
            {filterOptions().length === selectedValue.length ||
            filterOptions().length === 0 ? (
              <div className='no-options'>No Options</div>
            ) : (
              filterOptions()?.map((option: any, index: number) =>
                checkSelectedItem(option, index)
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
