import React from 'react';

import './styles.css';

const PageWrapper = ({ children }) => {
  return (
    <main className="page">
      <div className="page__content">
        {children}
      </div>
    </main>
  )
}

export default PageWrapper;