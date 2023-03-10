export interface ShoppingCartPickListLineItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    swatchColor: string;
    swatchTitle: string;
    estimatedDeliveryDate?: string;
}