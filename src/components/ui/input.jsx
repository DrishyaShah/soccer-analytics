import React from 'react';

const Input = React.forwardRef(({ type = 'text', ...props }, ref) => (
  <input type={type} ref={ref} {...props} />
));

Input.displayName = 'Input';

export { Input };
