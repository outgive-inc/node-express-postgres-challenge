import React from 'react';

function CheckButton({checked, handleCheck}) {
  return (
    <input type="checkbox" onChange={handleCheck} checked={checked}/>
  );
}

export default CheckButton
