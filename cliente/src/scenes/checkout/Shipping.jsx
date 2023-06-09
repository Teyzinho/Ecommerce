import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
}) => {
    return (
        <Box m="30px auto">
            {/* Formulário de cobrança */}
            <Box>
                <Typography sx={{ mb: "15px" }}>
                    Informação de Cobrança
                </Typography>
                <AddressForm
                    type="billingAddress"
                    values={values.billingAddress}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                />
            </Box>

            <Box mb="20px">
                <FormControlLabel
                    label="O mesmo para endereço de entrega"
                    control={
                        <Checkbox
                            defaultChecked
                            value={values.shippingAddress.isSameAddress}
                            onChange={() =>
                                setFieldValue(
                                    "shippingAddress.isSameAddress",
                                    !values.shippingAddress.isSameAddress
                                )
                            }
                        />
                    }
                />
            </Box>

            {/* Form Envio */}
            {!values.shippingAddress.isSameAddress && (
                <Box>
                    <Typography sx={{ mb: "15px" }}>
                        Informação de Envio
                    </Typography>
                    <AddressForm
                        type="shippingAddress"
                        values={values.shippingAddress}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                </Box>
            )}

        </Box>
    );
};

export default Shipping;
