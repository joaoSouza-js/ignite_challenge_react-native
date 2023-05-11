interface productOwnerProps {
    avatar: string,
}


export interface PRODUCT_IMAGES_DTO  {
    id: string,
    path: string,
}

export interface paymentMethodProps {
    key: string,
    name: string,
}


export interface ProductsProps { 
    accept_trade: boolean,
    id: string,
    name: string,
    price: number,
    is_new: boolean,
    payment_methods: paymentMethodProps[],
    product_images: PRODUCT_IMAGES_DTO[],
    user: productOwnerProps
}


