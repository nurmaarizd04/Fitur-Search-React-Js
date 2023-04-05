import React from "react";
import Form from "react-bootstrap/Form";

function Forms({ label, type, placeholder, onChange, message, value, name }) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
        <p className="text-red-500 italic">{message}</p>
      </Form.Group>
    </Form>
  );
}

export default Forms;
