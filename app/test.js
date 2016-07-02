import React from 'react';

window.React = React;

const context = require.context('../test', true, /\.spec\./);

context.keys().forEach(context);
