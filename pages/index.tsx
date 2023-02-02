import { ShoppingCartPickList } from '@/components/shopping-cart-pick-list-line-items';
import { ShoppingCartPickListTotals } from '@/components/shopping-cart-pick-list-totals';
import { ShoppingCartPickListLineItem } from '@/interfaces/shopping-cart-pick-list-items/shopping-cart-pick-list-item';
import { ShoppingCartPickListItemsTotals } from '@/interfaces/shopping-cart-pick-list-totals/shopping-cart-pick-list-items-totals';
import Head from 'next/head'
import { useState } from 'react';
import styled from 'styled-components';

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

const initialShoppingCartPickListTotals: ShoppingCartPickListItemsTotals = {
  subtotal: 2094.97,
  hst: 272.3461,
  total: 2382.3161,
  estimatedDelivery: "Nov 24, 2021"
};

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

  const [shoppingCartPickListLineItems, setShoppingCartPickListLineItems] = useState(initialShoppingCartPickListItems);
  const [shoppingCartPickListLineItemsTotals, setShoppingCartPickListLineItemsTotals] = useState(initialShoppingCartPickListTotals);

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
        <ShoppingCartPickList shoppingCartPickListLineItems={shoppingCartPickListLineItems}/>
        <ShoppingCartPickListTotals shoppingCartPickListTotals={shoppingCartPickListLineItemsTotals}/>
      </ShoppingCartPickListStyling>
    </>
  )
}
