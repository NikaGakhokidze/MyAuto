/* eslint-disable prettier/prettier */
 
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Provider as PaperProvider  } from 'react-native-paper';
import { HomePage } from './src/components/HomePage';

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    paddingHorizontal: 8,
  };

  return (
    <PaperProvider>
      <SafeAreaView style={backgroundStyle}>
        <ScrollView
          contentInsetAdjustmentBehavior="always"
          style={backgroundStyle}>
          <HomePage />
        </ScrollView>

      </SafeAreaView>
    </PaperProvider >
  );
};

export default App;
