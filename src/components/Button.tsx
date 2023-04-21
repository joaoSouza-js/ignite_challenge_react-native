import {Button  as NativeBaseButton, IButtonProps} from 'native-base'

interface ButtonProps extends IButtonProps{
    variant?: 'primary' | 'secundary' | 'tertiary'
}

export function Button({ variant='primary', ...props }: ButtonProps){
    if(variant === 'tertiary'){
        return (

            <NativeBaseButton
                width={'full'}
                height={42}
                rounded={'md'}
                backgroundColor={'blue.400'}
                _text={{
                    color: 'gray.100',
                    fontSize: 'sm',
                    fontFamily: 'heading'
                    }
                }
                _loading={{
                    opacity: 1,
                    backgroundColor: 'blue.500',
                    _spinner: {
                        color: 'gray.100'
                    }
                }}
                {...props}
            />
        )

   
        
        }
    return (
        <NativeBaseButton
            width={'full'}
            rounded={'md'}
            
            backgroundColor={variant === 'primary' ? 'gray.900': 'gray.400'}
            _text={{
                color: variant === 'primary' ? 'gray.100' : 'gray.800',
                fontSize: 'sm',
                fontFamily: 'heading'
            }
            }
            _loading={{
                opacity: 1,
                backgroundColor: variant === 'primary' ? 'gray.900': 'gray.500',
                _spinner: {
                    color: variant === 'primary' ? 'gray.100' : 'gray.700',
                }
            }}
            {...props}
        />

     
    )
}