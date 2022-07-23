import React from 'react';

import './styles.css';

const Input = ({
  type,
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  min,
  max,
}) => (
  <>
    {label ?
      (
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      ) : null
    }

    <input
      type={type}
      className="input"
      id={id}
      name={name}
      placeholder={placeholder}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      required={required}
    />
  </>
);

export default Input;