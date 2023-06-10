import { Box, Typography, TextField} from "@mui/material"

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {

    return (
        <Box m="30px 0">
            <Box>
                <Typography sx={{ mb: "15px" }}>
                    Contato
                </Typography>
                <TextField
                    fullWidth
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4", mb:"20px"}}
                />
                <TextField
                    fullWidth
                    type="text"
                    label="N° Telefone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: "span 4" }}
                />
            </Box>
        </Box>
    )
}

export default Payment