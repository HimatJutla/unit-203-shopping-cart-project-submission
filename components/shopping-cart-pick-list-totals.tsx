import { ShoppingCartPickListItemsTotalsProps } from '@/interfaces/shopping-cart-pick-list-totals/shopping-cart-pick-list-items-totals-props';
import styled from 'styled-components';


// STYLED COMPONENTS
const ShoppingCartPickListTotalsContainerStyling = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between
    padding: 0;
    margin: 0 0 3% 0;
    .total-row {
        font-weight: 600;
    }
`;


const ShoppingCartPickListTotals = ({
    shoppingCartPickListTotals
   }: ShoppingCartPickListItemsTotalsProps): any => {

    if (!shoppingCartPickListTotals) {
        return (
            <div>The totals cannot be found</div>
        );
    }

    return (   
        <>
            <ShoppingCartPickListTotalsContainerStyling>
                <div>
                    Subtotal:
                </div>
                <div>
                    ${shoppingCartPickListTotals.subtotal}
                </div>
            </ShoppingCartPickListTotalsContainerStyling>
            <ShoppingCartPickListTotalsContainerStyling>
                <div>
                    Taxes (estimated):
                </div>
                <div>
                    ${shoppingCartPickListTotals.hst}
                </div>
            </ShoppingCartPickListTotalsContainerStyling>
            <ShoppingCartPickListTotalsContainerStyling>
                <div>
                    Shipping:
                </div>
                <div>
                    Free
                </div>
            </ShoppingCartPickListTotalsContainerStyling>
            <ShoppingCartPickListTotalsContainerStyling>
                <div className="total-row">
                    Total:
                </div>
                <div className="total-row">
                    ${shoppingCartPickListTotals.total}
                </div>
            </ShoppingCartPickListTotalsContainerStyling>
        </>
    );
};

export { ShoppingCartPickListTotals };