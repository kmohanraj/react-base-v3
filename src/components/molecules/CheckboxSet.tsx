import { FC } from "react";
import Checkbox from "components/atoms/Checkbox";
import 'styles/checkbox-set.scss';
import CONSTANTS from "constants/constants";

export interface CheckboxSetProps {
  type: string
  title: string,
  desc?: string,
  isHorizontal?: boolean,
  options: {
    id: string,
    label: string
  }[]
}

const { BRAND_CLASS } = CONSTANTS.CLASS_NAMES

const CheckboxSet: FC<CheckboxSetProps> = ({ type, title, desc, options, isHorizontal }) => {
  return (
    <div className={`${BRAND_CLASS}-checkbox-set ${isHorizontal ? 'horizontal' : 'vertical'}`}>
      <h3 className="title">{title}</h3>
      {desc && <p>{desc}</p>}
      { !isHorizontal ? (
        <ul>
          {options.map((option, i) => (
            <li key={i}>
              <Checkbox
                type={type}
                inputId={option.id}
                label={option.label}
                value={option.label}
                onChange={() => {}}
              />
            </li>
          ))}
        </ul>
      ) : (
        options.map((option, i) => (
          <span key={i}>
            <Checkbox
              type={type}
              inputId={option.id}
              label={option.label}
              value={option.label}
              onChange={() => {}}
            />
          </span>
        ))
      )}
    </div>
  );
};
export default CheckboxSet;
