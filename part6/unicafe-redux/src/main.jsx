import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);

const App = ({ state }) => {
  return (
    <div>
      <div>
        Good: {state.good} OK: {state.ok} Bad: {state.bad}
      </div>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App state={store.getState()} />);
}

renderApp();
store.subscribe(renderApp);
