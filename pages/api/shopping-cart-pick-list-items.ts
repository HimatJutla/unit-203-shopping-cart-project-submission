

import { PostalCodeDeliveryDate } from "@/interfaces/postal-codes/postal-code-delivery-date";
import { ShoppingCartPickListLineItem } from "@/interfaces/shopping-cart-pick-list-items/shopping-cart-pick-list-item";
import type { NextApiRequest, NextApiResponse } from "next";

// Initial Line Items to be Generated for Shopping Cart
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

    // Static Postal Code Data
 const postalCodeDeliveryDates: Array<PostalCodeDeliveryDate> = [
    {
      postal: "V",
      ids: [2],
      estimatedDeliveryDate: "Nov 24, 2021",
    },
    {
      postal: "V",
      ids: [1, 3],
      estimatedDeliveryDate: "Nov 19, 2021",
    },
    {
      postal: "M",
      ids: [2, 3],
      estimatedDeliveryDate: "Nov 22, 2021",
    },
    {
      postal: "M",
      ids: [1],
      estimatedDeliveryDate: "Dec 19, 2021",
    },
    {
      postal: "K",
      ids: [1, 2, 3],
      estimatedDeliveryDate: "Dec 24, 2021",
    },
  ];

  const assignEstimatedDeliveryToShoppingCartPickListItems = (firstLetterInPostalCodeSubmitted: string, initialShoppingCartPickListItem: ShoppingCartPickListLineItem) => {
    const postalCodesMatchingSubmittedPostalCodeFirstLetter = postalCodeDeliveryDates.filter((postalCodeDeliveryDate: PostalCodeDeliveryDate) => {
      return postalCodeDeliveryDate.postal === firstLetterInPostalCodeSubmitted;
    });
    const estimatedDeliveryDate = postalCodesMatchingSubmittedPostalCodeFirstLetter.find((postalCodeMatch: PostalCodeDeliveryDate) => {
      return postalCodeMatch.ids.includes(initialShoppingCartPickListItem.id)
    })?.estimatedDeliveryDate;
    return estimatedDeliveryDate;
  };

    const formatShoppingCartPickListItemsUpdatedWithEstimatedDelivery = (firstLetterInPostalCodeSubmitted: string, deliveryDatePickListItemsExist: boolean, initialShoppingCartPickListItems: Array<ShoppingCartPickListLineItem>): Array<ShoppingCartPickListLineItem> => {
        const formattedShoppingCartPickListItemsWithDeliver = initialShoppingCartPickListItems.map((initialShoppingCartPickListItem: ShoppingCartPickListLineItem) => {
            return {
            ...initialShoppingCartPickListItem,
            estimatedDeliveryDate: deliveryDatePickListItemsExist ? assignEstimatedDeliveryToShoppingCartPickListItems(firstLetterInPostalCodeSubmitted, initialShoppingCartPickListItem) : 'Cannot estimate shipping time for this postal code'
        }
    });
    return formattedShoppingCartPickListItemsWithDeliver;
  }
    const test = (postalCodeSubmitted: string | string[]): Array<ShoppingCartPickListLineItem> => {
        const firstLetterInPostalCodeSubmitted = Array.from(postalCodeSubmitted)[0].toUpperCase();
        const deliveryDatePickListItemsExist = postalCodeDeliveryDates.some(
            (postalCodeDeliveryDate: PostalCodeDeliveryDate) => postalCodeDeliveryDate.postal === firstLetterInPostalCodeSubmitted
        );
        const shoppingCartPickListItemsUpdatedWithEstimatedDelivery = formatShoppingCartPickListItemsUpdatedWithEstimatedDelivery(
            firstLetterInPostalCodeSubmitted,
            deliveryDatePickListItemsExist,
            initialShoppingCartPickListItems
        );
        return shoppingCartPickListItemsUpdatedWithEstimatedDelivery;
    }
  
    const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
        const { postalCodeSubmitted } = req?.query;
        console.log(postalCodeSubmitted);
        if (postalCodeSubmitted === undefined) {
        return res.status(200).json(initialShoppingCartPickListItems);
    }
        console.log(postalCodeSubmitted);
        const finalizedShoppingCartPickListItemsWithEstimatedDeliveryDates = test(postalCodeSubmitted);
        return res.status(200).json(finalizedShoppingCartPickListItemsWithEstimatedDeliveryDates);
    };
  
  export default handler;