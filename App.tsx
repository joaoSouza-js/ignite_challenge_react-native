import { Loader } from '@components/Loader';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { Sign } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { AppContainer } from '@styles/app';
import { theme } from '@styles/theme';
import { NativeBaseProvider, StatusBar} from 'native-base'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [fontIsLoading] =  useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <AppContainer>
        {fontIsLoading ? <SignUp />: <Loader/> }
    
      </AppContainer>

    </NativeBaseProvider>
  );
}

