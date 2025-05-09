import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import { Provider } from 'react-redux';
import { store } from 'store';

import 'react-native-gesture-handler';

const Appliaction = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Appliaction);
