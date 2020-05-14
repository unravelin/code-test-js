import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';

import InputForm from './components/InputForm/InputForm';
import SimilarRestaurantsGraph from './components/graphs/SimilarRestaurantsGraph';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <InputForm />
        <SimilarRestaurantsGraph data={[5,10,1,3]} size={[500,500]} />
      </div>
    </Provider>
  );
}

export default App;
