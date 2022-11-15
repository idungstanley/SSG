import React from 'react';
import Nav from '../nav/Nav';

function Notification() {
  return (
    <>
      <Nav
        navName="Notification"
        newd="New"
        Cleared="Clear"
        buttonLabel="All"
        Assigned="Assigned to me"
      />
      <p>This is notification page</p>
    </>
  );
}

export default Notification;
