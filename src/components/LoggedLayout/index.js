import React from 'react';

import Header from '../Header';

const LoggedLayout = ({ children }) => {
  return (
    <>
      <Header />

      {children}
    </>
  )
}

export default LoggedLayout;