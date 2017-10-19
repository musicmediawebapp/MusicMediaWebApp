import React from 'react';

// This is rendered by <Field /> so it comes with passed in props
// Give the props.input object to our <input /> element. That way it can behave as redux form expects it to.
export default ({ input, label, meta }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
            {meta.error}
        </div>
    );
};