import React from "react";
import MaskedInput from "react-text-mask";
import { useNavigate } from 'react-router-dom'
import {
  AMERICANEXPRESS,
  OTHERCARDS,
  EXPIRYDATE,
  CVC,
  CARDARR,
  CARDICON,
  HOLDERNAME
} from "./constant";
import {
  stripeCardNumberValidation,
  stripeCardExpirValidation,
  textWithSpacesOnly,
  minLength
} from "./validations";

import { Box, Button, Divider, Typography } from "@mui/material";
import CreditScoreTwoToneIcon from '@mui/icons-material/CreditScoreTwoTone';
import EventRepeatTwoToneIcon from '@mui/icons-material/EventRepeatTwoTone';
import { styled } from '@mui/system'
import Swal from 'sweetalert2';


const inputStyle = {
  padding: '14px', 
  width: '80%',
  borderRadius: 6,
}

const inputStyleField = {
  padding: '14px', 
  width: '60px',
  borderRadius: 6,
}
const imgStyle = {
  width: "50px",
  height: "33px",
  marginTop: 6,
  marginLeft: 5,
}

const SubmitLoginButton = styled(Button)(()=> ({
  margin: '30px auto',
  backgroundColor: '#FF385C',
  color: '#FFFFFF',
  padding: 16,
  borderRadius: 6,
  '&:hover': {
   backgroundColor: '#FF385C'
},
}))

const reducer = (state, action) => {
  switch (action.type) {
    case "card":
      return { ...state, card: action.data };
    case "expiry":
      return { ...state, expiry: action.data };
    case "securityCode":
      return { ...state, securityCode: action.data };
    case "cardHodler":
      return { ...state, cardHodler: action.data };
    case "cleanState":
      return { ...action.data };
    default:
      return state;
  }
};

function findDebitCardType(cardNumber) {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) return card;
  }
  return "";
}

const CreditCardSection = (props) => {
  const [error, setError] = React.useState({});
  const [cardType, setCardType] = React.useState();
  const [state, dispatch] = React.useReducer(reducer, {
    card: "",
    expiry: "",
    securityCode: "",
    cardHodler: ""
  });
  const navigate = useNavigate()

  const handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "card":
        setCardType(findDebitCardType(value));
        errorText = stripeCardNumberValidation(value);
        setError({ ...error, cardError: errorText });
        break;
      case "cardHodler":
        errorText = value === "" ? "Required" : textWithSpacesOnly(value);
        setError({ ...error, cardHodlerError: errorText });
        break;
      case "expiry":
        errorText =
          value === "" ? "Required" : stripeCardExpirValidation(value);
        setError({ ...error, expiryError: errorText });
        break;
      case "securityCode":
        errorText = value === "" ? "Required" : minLength(3)(value);
        setError({ ...error, securityCodeError: errorText });
        break;
      default:
        break;
    }
  };

  const handleInputData = (e) => {
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const handleBlur = (e) => {
    handleValidations(e.target.name, e.target.value);
  };

  const checkErrorBeforeSave = () => {
    let errorValue = {};
    let isError = false;
    Object.keys(state).forEach(async (val) => {
      if (state[val] === "") {
        errorValue = { ...errorValue, [`${val + "Error"}`]: "Required" };
        isError = true;
      }
    });
    setError(errorValue);
    return isError;
  };

  const handleSave = (e) => {
    let errorCheck = checkErrorBeforeSave();
    if (!errorCheck) {
      dispatch({
        type: "cleanState",
        data: {
          card: "",
          expiry: "",
          securityCode: "",
          cardHodler: ""
        }
      });
      Swal.fire({
        icon: 'success',
        title: "Thanks for your booking!", 
    },
    navigate(`/account/reservations/confirmed`))
  }
  };
  return (
    <Box sx={{marginY: 4}}>
      <form>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <CreditScoreTwoToneIcon sx={{width: "30px", height: '30px', marginRight: 1}}/>
        <Typography variant='h6' sx={{fontWeight: 700}}>Pay with credit or debit card</Typography>
        </Box>
          <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', marginY: 2}}>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <MaskedInput
              style={inputStyle}
                mask={
                  ["37", "34"].includes(
                    state && state.card.split("").splice(0, 2).join("")
                  )
                    ? AMERICANEXPRESS
                    : OTHERCARDS
                }
                guide={false}
                placeholderChar={"\u2000"}
                placeholder="Card Number"
                name="card"
                required
                value={state.card}
                onChange={handleInputData}
                onBlur={handleBlur}
                />
                {(!error || !error.cardError) && CARDARR.includes(cardType) && (
                <Box component='img'
                  src={CARDICON[cardType]}
                  alt="card"
                  style={imgStyle}
            
                />
              )}
              </Box>
              {error && error.cardError && error.cardError.length > 1 && (
                <Typography variant="body2" sx={{color: "red"}}>{error.cardError}</Typography>
              )}
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'column', marginY: 2}}>
              <MaskedInput
                mask={HOLDERNAME}
                style={inputStyle}
                type="text"
                name="cardHodler"
                placeholderChar={"\u2000"}
                guide={false}
                required
                placeholder="CardHolder's Name"
                value={state.cardHodler}
                onChange={handleInputData}
                onBlur={handleBlur}
              />
              {error &&
                error.cardHodlerError &&
                error.cardHodlerError.length > 1 && (
                  <Typography variant="body2" sx={{color: "red"}}>{error.cardHodlerError}</Typography>
                )}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', marginTop: 2, marginBottom: 4}}>
                <Box sx={{display: 'flex', flexDirection: 'column', marginRight: 2}}>
                  <MaskedInput
                    style={inputStyleField}
                    mask={EXPIRYDATE}
                    guide={false}
                    name="expiry"
                    required
                    placeholderChar={"\u2000"}
                    placeholder="MM/YY"
                    value={state.expiry}
                    onChange={handleInputData}
                    onBlur={handleBlur}
                  />
                  {error &&
                    error.expiryError &&
                    error.expiryError.length > 1 && (
                      <Typography variant="body2" sx={{color: "red"}}>{error.expiryError}</Typography>
                    )}
               </Box>
               <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <MaskedInput
                  style={inputStyleField}
                    mask={CVC}
                    guide={false}
                    name="securityCode"
                    required
                    placeholderChar={"\u2000"}
                    placeholder="CVV"
                    value={state.securityCode}
                    onChange={handleInputData}
                    onBlur={handleBlur}
                  />
                  {error &&
                    error.securityCodeError &&
                    error.securityCodeError.length > 1 && (
                      <Typography variant="body2" sx={{color: "red"}}>{error.securityCodeError}</Typography>
                    )}
               </Box>
            </Box>
          </Box>
          <Divider/>
          <Box sx={{display: 'flex', flexDirection: 'column', marginY: 3}}>
                <Typography variant='h6' sx={{fontWeight: 700}}>Cancellation Policy</Typography>
                <Typography sx={{marginY: 1}}>Cancel before check-in date for a partial refund. After that, your refund depends on when you cancel.</Typography>      
          </Box>
          <Divider/>
          <Box sx={{display: 'flex', flexDirection: 'row', marginY: 3}}>
                <EventRepeatTwoToneIcon sx={{width: "30px", height: '30px', marginRight: 6}}/>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{fontWeight: 800, lineHeight: '20px'}}>Your reservation won’t be confirmed until the Host accepts your request (within 24 hours).</Typography>
                <Typography>You won’t be charged until then.</Typography>  
                </Box>    
          </Box>
          <Divider/>
          <Box sx={{marginY: 3}}>
          <Typography sx={{fontSize: '10px', lineHeight: '16px'}}>By selecting the button below, I agree to the Host's 
          House Rules, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method 
          if I’m responsible for damage. I agree to pay the total amount shown if the Host accepts my booking request.</Typography>
          </Box>
          <Divider/>
          <SubmitLoginButton type='button' onClick={handleSave}>Request to Book</SubmitLoginButton>
      </form>
      </Box>
  );
};

export default CreditCardSection;
