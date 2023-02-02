
import styled from 'styled-components';
import { useState } from "react";
import { ShoppingCartEstimatedDeliveryFeesFormProps } from '@/interfaces/postal-codes/shopping-cart-estimated-delivery-fees-form-props';

// STYLED COMPONENTS

const PostalCodeInputStyling = styled.div`
  padding: 0;
  margin: 0 0 5% 0;
  display: flex;
  align-items: center;
  justify-content: end;
  .mb-3 {
    margin-bottom: 3%;
  }
  .ml-3 {
    margin-left: 3%;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: end;
    input {
        background-color: white;
        color: black;
    }
    button {
        cursor: pointer;
        padding: 1%;
      }
  }
`;

const ShoppingCartEstimatedDeliveryFeesForm = ({onPostalCodeSubmitted}: ShoppingCartEstimatedDeliveryFeesFormProps): any => {

    const [inputtedPostalCode, setInputtedPostalCode] = useState('');

    const handlePostalCodeInputChange = (event: any) => {
        setInputtedPostalCode(event.target.value);
    }
    
    const handlePostalCodeInputSubmit = (event: any): void => {
        event.preventDefault();
        onPostalCodeSubmitted(inputtedPostalCode);
        setInputtedPostalCode('');

    }

    return (
        <>
            <PostalCodeInputStyling>
            <form onSubmit={handlePostalCodeInputSubmit}>
                <div>
                    <div className="mb-3">
                    <label htmlFor="inputtedPostalCode">
                    Postal for Delivery:
                </label>
                    </div>
                    <div>
                    <input
                    type="text"
                    name="inputtedPostalCode"
                    value={inputtedPostalCode}
                    onChange={handlePostalCodeInputChange}
                    min="6"
                    max="6"
                    required
                />
                    </div>
                </div>
                <button className="ml-3" type="submit">Get Estimated Delivery</button>
            </form>
            </PostalCodeInputStyling>
        </>
    );
};

export { ShoppingCartEstimatedDeliveryFeesForm };