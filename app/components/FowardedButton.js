import React, { forwardRef } from 'react';
import { Button } from 'react-native';

const ForwardedButton = forwardRef((props, ref) => (
  <Button {...props} ref={ref} />
));

export default ForwardedButton;