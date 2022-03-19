import React from 'react';
import './ButtonUI.css';

function ButtonUI({
  title, type, onClick, disabled,
}) {
  return type === 'primary' ? (
    <button
      className="primary"
      onClick={onClick}
    >
      {title}
    </button>
  )
    : (
      <button
        onClick={onClick}
        className="outline"
      >
        {title}
      </button>
    );
}

export default ButtonUI;
