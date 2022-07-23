import React from 'react';

import './styles.css';

const getVariant = variant => `button--${variant}`;
const getSize = size => `button--${size}`;
const getMargin = margin => `button--margin-${margin}`;

const Button = ({
  size = 'full-width',
  margin = 'none',
  variant = 'primary',
  type = 'submit',
  disabled,
  onClick,
  children
}) => (
  <button
    className={`button ${getVariant(variant)} ${getSize(size)} ${getMargin(margin)}`}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;