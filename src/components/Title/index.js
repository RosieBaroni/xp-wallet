import React from 'react';

import './styles.css';

const getHighlight = highlight => highlight ? 'title--highlight' : '';

const Title = ({ as: Component = 'h2', highlight, children }) => (
  <Component
    className={`title ${getHighlight(highlight)}`}
  >
    {children}
  </Component>
);

export default Title;