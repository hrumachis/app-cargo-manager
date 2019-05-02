import React from 'react';
import ReactDOM from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'

import App from './view/app/App';
import './default.scss';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={ store }>
        <DragDropContextProvider backend={ HTML5Backend }>
            <App />
        </DragDropContextProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

// ReactDOM.render( <App />, document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
