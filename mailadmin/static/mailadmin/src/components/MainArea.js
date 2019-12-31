import React from 'react';
// import { parseEmails } from '../utils';

const ListCreate = () => {
  return (
    <div className="new-list-container">
      <button type="button" className="btn btn-default new-list-btn">
        <span className="fas fa-plus" aria-hidden="true" /> Opprett ny liste
      </button>
      <div className="new-list fwdlist" data-list-name="newlist@example.com"></div>
      <div className="new-list-result"></div>
    </div>
  );
};

const Forwards = () => {
  return (
    <div className="forwards-container">
      <span className="fas fa-refresh spin" aria-hidden="true" /> Laster...
    </div>
  );
};

const MainArea = () => {
  return (
    <div className="col-sm-8">
      <div className="orgunit-select-container"></div>
      <ListCreate />
      <Forwards />
    </div>
  );
};
export default MainArea;
