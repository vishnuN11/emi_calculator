import React from 'react';

export const TextInput = ({ title, state, setState, maxValue }) => {
  const handleChange = (e) => {
    let value = e.target.value;

    // Convert value to number and apply maxValue condition if provided
    if (maxValue !== undefined && Number(value) > maxValue) {
      value = maxValue;
    }

    setState(value);
  };

  return (
    <React.Fragment>
      <span className="title">{title}</span>
      <input
        type="number"
        value={state}
        onChange={handleChange}
        placeholder={title}
      />
    </React.Fragment>
  );
};
