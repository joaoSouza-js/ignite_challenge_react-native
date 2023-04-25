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
        name: 'creditcard',
        label: 'Cartão de Crédito',
        Icon: (props?: IconProps) => (<CreditCard {...props} />)
    },

    {
        name: 'money',
        label: 'Dinheiro',
        Icon: (props?: IconProps) => (<Money {...props} />)
    },


    {
        name: 'backDeposit',
        label: 'Depósito Bancário',
        Icon: (props?: IconProps) => (<Bank {...props} />)
    },
    
]

