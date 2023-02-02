import { ShoppingCartEstimatedDeliveryFeesForm } from '@/components/shopping-cart-estimated-delivery-fees-form';
import { ShoppingCartPickList } from '@/components/shopping-cart-pick-list-line-items';
import { ShoppingCartPickListTotals } from '@/components/shopping-cart-pick-list-totals';
import { ShoppingCartPickListLineItem } from '@/interfaces/shopping-cart-pick-list-items/shopping-cart-pick-list-item';
import { ShoppingCartPickListItemsTotals } from '@/interfaces/shopping-cart-pick-list-totals/shopping-cart-pick-list-items-totals';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { server } from "../server-config";

//Styling variables
const BLUE = "#172162"; //"rgb(23, 33, 98)";
const LIGHT_GREY = "#6e7484";
const BLACK = "#000000";

//First part given
const initialShoppingCartPickListItems: Array<ShoppingCartPickListLineItem> = [
  {
    id: 1,
    title: "Grey Sofa",
    price: 499.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
    swatchColor: "#959392",
    swatchTitle: "Grey",
  },
  {
    id: 2,

    title: "Blue Sofa",
    price: 994.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#191944",
    swatchTitle: "Blue",
  },
  {
    id: 3,
    title: "White Sofa",
    price: 599.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#F8F1EC",
    swatchTitle: "White",
  },
];

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
