import React from 'react';
import './RenderField.css';

// This is rendered by <Field /> so redux-form will pass in default props
// Give the props.input object to our <input /> element. That way it can behave as redux form expects it to.
var RenderField = ({ input, label, type, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type} value={input.value} className="mb-0" />
            <span className="red-text">
                {touched && error}
            </span>
        </div>
    );
};

export default RenderField;