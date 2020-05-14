import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';

import InputForm from './components/InputForm/InputForm';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <InputForm />
      </div>
    </Provider>
  );
}

export default App;
