import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import AppState from './context/AppState';

ReactDOM.render(
	<React.StrictMode>
		<AppState>
			<App />
		</AppState>
	</React.StrictMode>,
	document.getElementById('root')
);
