import React from 'react';

/* React DOM's whole purpose is to make sure React can be rendered on the DOM */
import ReactDOM from 'react-dom';

import App from './components/App';

/* Param1: Root React component instance, Param2: index.html reference that hosts these components */
ReactDOM.render(<App />, document.querySelector('#root'));