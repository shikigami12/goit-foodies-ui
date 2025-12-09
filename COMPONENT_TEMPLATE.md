# Component Template

Use this template when creating new components in the project.

## Component Structure

```
ComponentName/
├── ComponentName.jsx
├── ComponentName.module.css (optional)
└── index.js
```

## Basic Component Template

### ComponentName.jsx
```jsx
import styles from './ComponentName.module.css';

export const ComponentName = ({ prop1, prop2, children }) => {
  // Component logic here

  return (
    <div className={styles.container}>
      <h2>{prop1}</h2>
      <p>{prop2}</p>
      {children}
    </div>
  );
};
```

### index.js
```javascript
export { ComponentName } from './ComponentName';
```

## Component with State

```jsx
import { useState } from 'react';
import styles from './ComponentName.module.css';

export const ComponentName = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};
```

## Component with Redux

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { someAction } from '../../redux/slices/someSlice';
import styles from './ComponentName.module.css';

export const ComponentName = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.someSlice.data);

  const handleClick = () => {
    dispatch(someAction(payload));
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick}>
        Action
      </button>
      <div>{data}</div>
    </div>
  );
};
```

## Form Component with Formik

```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ComponentName.module.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
});

export const ComponentName = ({ onSubmit }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
```

## Component with API Call

```jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/slices/someSlice';
import styles from './ComponentName.module.css';

export const ComponentName = ({ id }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.someSlice);

  useEffect(() => {
    dispatch(fetchData(id));
  }, [dispatch, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className={styles.container}>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
};
```

## Component with Modal

```jsx
import { Modal } from '../common/Modal';
import { useModal } from '../../hooks';
import styles from './ComponentName.module.css';

export const ComponentName = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className={styles.container}>
      <button onClick={openModal} className={styles.button}>
        Open Modal
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className={styles.modalContent}>
          <h2>Modal Title</h2>
          <p>Modal content goes here</p>
        </div>
      </Modal>
    </div>
  );
};
```

## Best Practices

1. **Props**
   - Destructure props in function parameters
   - Use PropTypes or TypeScript for type checking
   - Provide default values when appropriate

2. **State**
   - Keep state as close to where it's used as possible
   - Use Redux for global state only
   - Use local state for UI-specific state

3. **Effects**
   - Always include dependencies array
   - Clean up side effects (event listeners, subscriptions)
   - Keep effects focused on a single concern

4. **Naming**
   - Use PascalCase for component names
   - Use camelCase for function names
   - Use descriptive names that reflect component purpose

5. **File Organization**
   - One component per file
   - Keep related styles in the same folder
   - Export through index.js for cleaner imports

6. **Styling**
   - Use CSS Modules for component-specific styles
   - Follow BEM naming convention
   - Keep styles close to components

7. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels when necessary
   - Ensure keyboard navigation works
   - Test with screen readers

8. **Performance**
   - Use React.memo for expensive components
   - Memoize callbacks with useCallback
   - Memoize computed values with useMemo
   - Avoid inline function definitions in JSX

## Testing Template (Future)

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName prop1="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Formik Documentation](https://formik.org)
- [React Router Documentation](https://reactrouter.com)
