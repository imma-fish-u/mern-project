import React  from 'react';

const SaveBar = ({ onDiscardAction, open, onSaveAction }) => (
  open &&
      <div className="SaveBar">
        <span>Seems like you modified something, want to save it ?</span>
        <button onClick={onDiscardAction}>DISCARD</button>
        <button onClick={onSaveAction}>SAVE</button>
      </div>
);

export default SaveBar;