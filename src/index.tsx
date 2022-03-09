import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import Routes from 'components/Routes';
import reportWebVitals from './reportWebVitals';

import 'config/api';
import 'scss/application.scss';

ReactDOM.render(
  <StrictMode>
    <Routes />
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
