import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
import "./Footer.css"

const Footer = () => {

    return (
        <Box
            backgroundColor={shades.primary[500]}
            className="container"
        >
            <Box 
                className="footer-content"
                display="grid"
                columnGap="75px"
                rowGap="50px"
                gridTemplateColumns="repeat(auto-fill,300px)"
                justifyContent="space-around"
            >
                <Box className="info">
                    <Typography fontWeight="bold" color={shades.secondary[500]}>E-Commerce</Typography>
                    <Typography textAlign="justify">
                        O e-commerce funciona como uma loja virtual e representa um excelente canal de venda online para as empresas.
                        Na prática, significa que o lojista pode comercializar os seus produtos por meio de um site exclusivo e personalizado e,
                        se preferir, centralizar ali as suas operações.
                    </Typography>
                </Box>

                <Box className="info">
                    <Typography fontWeight="bold">Duvidas Gerais</Typography>
                    <Typography>Entregas</Typography>
                    <Typography>Pedidos</Typography>
                    <Typography>Pagamentos</Typography>
                    <Typography>Produtos</Typography>
                </Box>

                <Box className="info">
                    <Typography fontWeight="bold">Sobre</Typography>
                    <Typography>Qualidade Som</Typography>
                    <Typography>Sustentabilidade</Typography>
                    <Typography>Sobre Ecomemerce</Typography>
                </Box>

                <Box className="info">
                    <Typography fontWeight="bold">Contato</Typography>
                    <Typography>Email: Email@ecomerce</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer