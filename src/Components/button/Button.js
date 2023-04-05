import React from "react";
import Button from "react-bootstrap/Button";

function Buttons({ text, variant, size, onClick, type }) {
  return (
    <Button variant={variant} size={size} onClick={onClick} type={type}>
      {text}
    </Button>
  );
}

export default Buttons;
