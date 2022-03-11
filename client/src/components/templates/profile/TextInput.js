import React, { useEffect, useState, useRef } from 'react';

const TextInput = ({handleChange, title, value}) => {
  const inputRenameRef = useRef();

  return (
  <div>
    {title}
    <input
      ref={inputRenameRef}
      className="list__top__rename__input"
      type="text"
      defaultValue={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  </div>
)};

export default TextInput;