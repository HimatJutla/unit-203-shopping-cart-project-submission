import { ShoppingCartEstimatedDeliveryFeesForm } from '@/components/shopping-cart-estimated-delivery-fees-form';
import { ShoppingCartPickList } from '@/components/shopping-cart-pick-list-line-items';
import { ShoppingCartPickListTotals } from '@/components/shopping-cart-pick-list-totals';
import { ShoppingCartPickListLineItem } from '@/interfaces/shopping-cart-pick-list-items/shopping-cart-pick-list-item';
import { ShoppingCartPickListItemsTotals } from '@/interfaces/shopping-cart-pick-list-totals/shopping-cart-pick-list-items-totals';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { server } from "../server-config";

const ShoppingCartPickListStyling = styled.div`
  margin: 0 auto;
  width: 50%;
  min-width: 50%;
  padding: 5%;
  height: 100vh;
  header {
    font-size: 1.875rem;
    margin-bottom: 6%;
  }
  }
`;


export default function Home() {

  const calculateFees = (shoppingCartPickListLineItems: Array<ShoppingCartPickListLineItem>): ShoppingCartPickListItemsTotals => {
    let subtotal = 0;
    const shipping = 15;
    shoppingCartPickListLineItems.forEach((shoppingCartPickListLineItem: ShoppingCartPickListLineItem) => {
      subtotal = subtotal + (shoppingCartPickListLineItem.price * shoppingCartPickListLineItem.quantity);
    });
    const hst = subtotal * 0.13;
    const total = subtotal + hst + shipping;
    return {
      subtotal: parseInt(subtotal.toFixed(2), 10),
      hst: parseInt(hst.toFixed(2), 10),
      total: parseInt(total.toFixed(2), 10),
      shipping: shipping,
    }

  }

  const [shoppingCartPickListLineItems, setShoppingCartPickListLineItems] = useState(initialShoppingCartPickListItems);
  const [shoppingCartPickListLineItemsTotals, setShoppingCartPickListLineItemsTotals] = useState(calculateFees(shoppingCartPickListLineItems));
  const [areShoppingCartPickListLineItemsLoading, setAreShoppingCartPickListLineItemsLoading] = useState(true);

  // STATE CHANGE METHODS
  const removeLineItem = (lineItemId: number): void => {
    const updatedShoppingCartItems: Array<ShoppingCartPickListLineItem> = [];
    shoppingCartPickListLineItems.forEach((shoppingCartPickListLineItem: ShoppingCartPickListLineItem) => {
      if (shoppingCartPickListLineItem.id === lineItemId && shoppingCartPickListLineItem.quantity > 1) {
        updatedShoppingCartItems.push({...shoppingCartPickListLineItem, quantity: shoppingCartPickListLineItem.quantity - 1});
        return;
      }
      if (shoppingCartPickListLineItem.id !== lineItemId) {
        updatedShoppingCartItems.push(shoppingCartPickListLineItem);
        return;
      }
    });
    setShoppingCartPickListLineItemsHandler(updatedShoppingCartItems);
  }

  const addLineItem = (lineItem: ShoppingCartPickListLineItem): void => {
    const {id} = lineItem;
    const updatedShoppingCartItems = shoppingCartPickListLineItems.map((shoppingCartPickListLineItem: ShoppingCartPickListLineItem) => {
      return shoppingCartPickListLineItem.id !== id ? shoppingCartPickListLineItem : {...shoppingCartPickListLineItem, quantity: shoppingCartPickListLineItem.quantity + 1};
    });
    setShoppingCartPickListLineItemsHandler(updatedShoppingCartItems);
  }

  const handleOnPostalCodeSubmitted = (postalCodeSubmitted: string): void => {
    setAreShoppingCartPickListLineItemsLoading(true);
    fetch(`${server}/api/shopping-cart-pick-list-items?postalCodeSubmitted=${postalCodeSubmitted}`)
      .then((res) => res.json())
      .then((shoppingCartPickListLineItems: Array<ShoppingCartPickListLineItem>) => {
        setShoppingCartPickListLineItemsHandler(shoppingCartPickListLineItems);
        setAreShoppingCartPickListLineItemsLoading(false);
      });
  }


    // HANDLERS
    const setShoppingCartPickListLineItemsHandler = (updatedShoppingCartItems: Array<ShoppingCartPickListLineItem>): void => {
      setShoppingCartPickListLineItems(updatedShoppingCartItems);
      setShoppingCartPickListLineItemsTotalsHandler(updatedShoppingCartItems);
    }

    const setShoppingCartPickListLineItemsTotalsHandler = (updatedShoppingCartItems: Array<ShoppingCartPickListLineItem>): void => {
      setShoppingCartPickListLineItemsTotals(calculateFees(updatedShoppingCartItems));
    }

    // FETCH INITIAL DATA
    useEffect(() => {
      fetch(`${server}/api/shopping-cart-pick-list-items`)
        .then((res) => res.json())
        .then((shoppingCartPickListLineItems: Array<ShoppingCartPickListLineItem>) => {
          setShoppingCartPickListLineItemsHandler(shoppingCartPickListLineItems);
          setAreShoppingCartPickListLineItemsLoading(false);
        });
    }, []);

  if (areShoppingCartPickListLineItemsLoading) {
    return (
      <>
        Shopping Cart Pick List Items Are Loading ...
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Unit 203 Cart Picklist</title>
        <meta name="description" content="Unit 203 shopping cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShoppingCartPickListStyling>
      <header>
            Your Cart
        </header>
        <ShoppingCartPickList shoppingCartPickListLineItems={shoppingCartPickListLineItems} onRemoveShoppingCartLineItem={removeLineItem} onAddShoppingCartLineItem={addLineItem}/>
        <ShoppingCartPickListTotals shoppingCartPickListTotals={shoppingCartPickListLineItemsTotals}/>
        {shoppingCartPickListLineItems.length ?
          <ShoppingCartEstimatedDeliveryFeesForm onPostalCodeSubmitted={handleOnPostalCodeSubmitted}/> : <div>Please add some items to your cart</div>
        }
      </ShoppingCartPickListStyling>
    </>
  )
}
