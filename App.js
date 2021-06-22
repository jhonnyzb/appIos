import 'react-native-gesture-handler';
import React from 'react';
import { AppProvider } from './contexts/app-Context';
import AppSecondary from './components/AppSecondary'



const App = () => {

  return (
    <AppProvider>
      <AppSecondary />
    </AppProvider>
  )
}

export default App;
