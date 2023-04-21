import {extendTheme} from 'native-base'
export const theme = extendTheme( {
    colors:  {
        gray: {
            900: '#1A181B', 
            800: '#3E3A40', 
            700: '#5F5B62',
            600: '#9F9BA1',
            400: '#D9D8DA' ,
            300: '#EDECEE',
            100: '#F7F7F8'
        },
        blue: {
            500: '#364D9D',
            400: '#647AC7',
        },
        red: {
            400: '#EE7979',
        }
        
    },

    fonts: {
        heading: 'Karla_700Bold',
        body: 'Karla_400Regular',
    },
    sizes: {
        1.5: 6,
        11: 44,
        12: 48,
         18: 72
    }
    
  
})