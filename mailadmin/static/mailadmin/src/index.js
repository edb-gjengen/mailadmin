import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

import React from 'react';
import { render } from 'react-dom';

import './index.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';

const el = document.getElementById('app');
render(<App />, el);
