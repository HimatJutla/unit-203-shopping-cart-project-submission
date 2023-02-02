import { ShoppingCartPickListLineItem } from "@/interfaces/shopping-cart-pick-list-items/shopping-cart-pick-list-item";
import { ShoppingCartPickListItemsProps } from "@/interfaces/shopping-cart-pick-list-items/shopping-cart-pick-list-items-props";
import styled from 'styled-components';


// STYLED COMPONENTS

const ShoppingCartPickListContainerStyling = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ShoppingCartPickListItemStyling = styled.li`
.item-container {
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 5%;
    img {
        width: 200px;
    }
    .mb-5 {
        margin-bottom: 5%;
    }
    .ml-5 {
        margin-left: 5%;
    }
    .product-title {
        font-weight: 600;
    }
    .product-swatch {
        display: flex;
        align-items: center;
    }
    .mini-text {
        font-size: .75rem;
    }
    .flexed-end {
        display: flex;
        flex-direction: column;
        align-items: end;
        jutify-content: end;
        height: 100%;
    }
    .flexed-end-action-column {
        margin-top: 20%;
        display: flex;
        flex-direction: column;
        align-items: end;
        .buttons-container {
            display: flex;
            align-items: center;
            margin-top: 6%;
            .add-item-btn {
                padding: 3%;
                cursor: pointer;
            }
            .remove-item {
                margin-left: 10%;
                text-decoration-line: underline;
                cursor: pointer;
                border: none;
                background-color: white;
                color: black;
            }
        }
    }
  }
  }
`;

const ShoppingCartPickList = ({
    shoppingCartPickListLineItems,
    onRemoveShoppingCartLineItem,
    onAddShoppingCartLineItem
   }: ShoppingCartPickListItemsProps): any => {

    if (!shoppingCartPickListLineItems?.length) {
        return (
            <div>There are no items in your cart</div>
        );
    }

    const handleRemoveItemClick = (event: any) => {
        onRemoveShoppingCartLineItem(parseInt(event.target.value, 10));
    }

    const handleAddItemClick = (event: any) => {
        onAddShoppingCartLineItem(JSON.parse(event.target.value));
    }

    return (   
        <>
       <ShoppingCartPickListContainerStyling>
        {shoppingCartPickListLineItems.map((shoppingCartPickListLineItem: ShoppingCartPickListLineItem): any => (
            <ShoppingCartPickListItemStyling
                key={shoppingCartPickListLineItem.id}>
            <div
                className="item-container">
                <div>
                    <img src={shoppingCartPickListLineItem.image} alt={shoppingCartPickListLineItem.title} />
                </div>
                <div>
                    <h3 className="product-title mb-5">
                        {shoppingCartPickListLineItem.swatchTitle.toUpperCase()} /   {shoppingCartPickListLineItem.title} / {shoppingCartPickListLineItem.quantity}
                    </h3>
                    <div
                        className="product-swatch">
                        <span
                            style={{
                                width: '1.125rem',
                                height: '1.125rem',
                                background: `${shoppingCartPickListLineItem.swatchColor}`,
                                borderRadius: `50%`,
                        }}></span>
                        <span className="mini-text ml-5">
                            {shoppingCartPickListLineItem.swatchTitle}
                        </span>
                    </div>
                </div>
                <div
                    className="flexed-end">
                    <div
                        className="mini-text">
                        ${shoppingCartPickListLineItem.price.toFixed(2)}
                    </div>
                    <div className="flexed-end-action-column">
                        <div
                            className="mini-text">
                            Estimated Delivery Date: {shoppingCartPickListLineItem?.estimatedDeliveryDate ? shoppingCartPickListLineItem?.estimatedDeliveryDate : 'Add postal code to determine'}
                        </div>
                        <div className="buttons-container">
                            <button
                                className="add-item-btn"
                                value={JSON.stringify(shoppingCartPickListLineItem)}
                                onClick={handleAddItemClick}>
                                Add
                            </button>
                            <button
                                className="mini-text remove-item"
                                value={shoppingCartPickListLineItem.id}
                                onClick={handleRemoveItemClick}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ShoppingCartPickListItemStyling>
        ))}
        </ShoppingCartPickListContainerStyling>
        </>

    );
};

export { ShoppingCartPickList };