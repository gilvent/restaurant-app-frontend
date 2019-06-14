import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import getStore from 'app/redux/store';

import MainRoutes  from './routes';

const {store,persistor} = getStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
            <Switch>
                  <MainRoutes />
            </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
