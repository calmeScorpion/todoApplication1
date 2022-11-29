import React, { useEffect } from 'react';
import { useFormik } from 'formik';

const Form = ({
  onFormSubmit,
  selectedPostDetails,
  onCancel,
  onSumbitLoading,
}) => {
  console.log(selectedPostDetails);
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Title Required';
    }

    if (!values.description) {
      errors.description = 'Description Required';
    }
    return errors;
  };

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values, // use this if you want controlled components
    errors,
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      onFormSubmit(values);
    },
  });

  useEffect(() => {
    if (selectedPostDetails) {
      setFieldValue('title', selectedPostDetails.title);
      setFieldValue('description', selectedPostDetails.body);
    }
  }, []);

  return (
    <div style={{ margin: '50px 50px 50px 50px' }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
        </div>
        <p>
          {' '}
          {touched.title && errors.title ? <span>{errors.title}</span> : null}
        </p>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="description"
            rows="3"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          ></textarea>
          <p>
            {' '}
            {touched.description && errors.description ? (
              <span>{errors.description}</span>
            ) : null}
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
          {onSumbitLoading ? (
            <div
              class="spinner-grow spinner-grow-sm"
              style={{ marginLeft: '5px' }}
            ></div>
          ) : null}
        </button>
        <button type="button" className="btn btn-light" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Form;
