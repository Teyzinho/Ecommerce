import { useSelector } from 'react-redux';
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from 'react';
import * as yup from "yup";
import Shipping from "./Shipping";
import { shades } from "../../theme";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51NHUmOApgHUkXRKUTmNmIxUuJiuwUsyu2DNuOkX7bR1RuSc3gFrwmRsmiljXDabnIamiiLDuTo5PEPBdIzuSO4As00VWVxQRUD"
);

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: ""
};

const checkoutSchema = yup.object().shape({
  billingAddress: yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    country: yup.string().required("required"),
    street1: yup.string().required("required"),
    street2: yup.string(),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
    zipCode: yup.string().required("required"),
  }),
  shippingAddress: yup.object().shape({
    isSameAddress: yup.boolean(),
    firstName: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    lastName: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    country: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    street1: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    street2: yup.string(),
    city: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    state: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    zipCode: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
  }),
}).concat(
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  })
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);
    console.log(activeStep)

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:1338/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const session = await response.json();
    
      if (session && session.id) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        console.log("Error creating Stripe session");
      }
  }


  return (
    <Box width="80%" m="100px auto">
      {/* Mostra a etapa que está */}
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Cobrança</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pagamento</StepLabel>
        </Step>
      </Stepper>
      <Box>
        {/* Form */}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color='primary'
                  variant='contained'
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                  }}
                  onClick={() => setActiveStep(activeStep)}
                >
                  {isFirstStep ? "Próximo" : "Fazer encomenda"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
