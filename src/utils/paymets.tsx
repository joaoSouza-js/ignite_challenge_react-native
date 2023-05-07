import { Barcode, QrCode, Money, CreditCard, Bank,  IconProps } from "phosphor-react-native";

export const paymentsForm = [
    {
        name: 'boleto',
        label: 'Boleto',
        Icon: (props?: IconProps) => (<Barcode {...props}/>)
    },
    {
        name: 'pix',
        label: 'pix',
        Icon: (props?: IconProps) => (<QrCode {...props} />)
    },

    {
        name: 'card',
        label: 'Cartão de Crédito',
        Icon: (props?: IconProps) => (<CreditCard {...props} />)
    },

    {
        name: 'cash',
        label: 'Dinheiro',
        Icon: (props?: IconProps) => (<Money {...props} />)
    },


    {
        name: 'deposit',
        label: 'Depósito Bancário',
        Icon: (props?: IconProps) => (<Bank {...props} />)
    },
    
]

