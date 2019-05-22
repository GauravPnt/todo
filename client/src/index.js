import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Entry Point for Client
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
