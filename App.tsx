import { NativeBaseProvider, StatusBar} from 'native-base'
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { theme } from '@styles/theme';
import { AppContainer } from '@styles/app';
import { Loader } from '@components/Loader';

import { Router } from '@routes/index';
import { Home } from '@screens/Home';
import { QueryClientProvider } from '@tanstack/react-query';
import { AnnouncementDetails } from '@screens/AnnouncementDetails';
import { UserAnnouncements } from '@screens/UserAnnouncements';
import { CreateAnnouncement } from '@screens/CreateAnnouncement';
import { queryClient } from '@libs/reactQuery';
import { AuthContextProvider } from '@context/AuthContext';

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
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppContainer> 
            {fontIsLoading ? <Router />: <Loader/> }
          </AppContainer>
        </AuthContextProvider>
      </QueryClientProvider>

    </NativeBaseProvider>
  );
}

