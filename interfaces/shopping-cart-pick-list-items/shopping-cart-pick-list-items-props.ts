import { ShoppingCartPickListLineItem } from "./shopping-cart-pick-list-item";


export interface ShoppingCartPickListItemsProps {
    shoppingCartPickListLineItems: Array<ShoppingCartPickListLineItem>;
    onRemoveShoppingCartLineItem: Function;
}