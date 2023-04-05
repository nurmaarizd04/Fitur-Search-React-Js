import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function InputSearch({ className, handleChange, placeholder }) {
  return (
    <InputGroup className={className}>
      <Form.Control
        aria-label="Example text with button addon"
        aria-describedby="basic-addon1"
        onChange={handleChange}
        placeholder={placeholder}
      />
    </InputGroup>
  );
}

export default InputSearch;
