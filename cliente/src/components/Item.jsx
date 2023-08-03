import { useState } from "react";
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1); // Estado local para a quantidade do item
    const [isHovered, setIsHovered] = useState(false); // Estado local para indicar se o item está sendo destacado pelo mouse

    const {
        palette: { neutral },
    } = useTheme(); // Obtém a paleta de cores do tema atual do Material-UI

    const { category, price, name, image } = item.attributes; // Desestruturação dos atributos do item

    const {
        data: {
            attributes: {
                formats: {
                    small: { url },
                },
            },
        },
    } = image; // Desestruturação da URL da imagem do item

    return (
        <Box width={width}>
            <Box
                position="relative"
                onMouseOver={() => setIsHovered(true)} // Atualiza o estado para indicar que o mouse está sobre o item
                onMouseOut={() => setIsHovered(false)} // Atualiza o estado para indicar que o mouse saiu do item
            >
                {/* Imagem */}
                <Box 
                    backgroundColor="#f5f5f5"
                    width="fit-Content"
                    borderRadius={2}
                >
                    <img
                        // src={`http://localhost:1338${url}`}
                        src={`${process.env.REACT_APP_SERVER_URL}${url}`}
                        alt={item.name}
                        width={300}
                        height={300}
                        onClick={() => navigate(`/item/${item.id}`)} // Navega para a página do item quando a imagem é clicada
                        style={{ cursor: 'pointer', objectFit: 'cover' }}
                    />
                </Box>

                {/* Botões */}
                <Box
                    display={isHovered ? "block" : "none"} // Exibe o conteúdo destacado somente quando o mouse está sobre o item
                    position="absolute"
                    bottom="10%"
                    left="0"
                    width="100%"
                    padding="0 5%"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >
                        {/* Botões de aumentar e diminuir a quantidade do item */}
                        <Box
                            display="flex"
                            alignItems="center"
                            backgroundColor={shades.neutral[100]}
                            borderRadius="5px"
                        >
                            <IconButton
                                onClick={() => setCount(Math.max(count - 1, 1))} // Reduz a quantidade do item, mas não permite que seja menor que 1
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography color={shades.primary[300]}>
                                {count}
                            </Typography>
                            <IconButton
                                onClick={() => setCount(count + 1)} // Aumenta a quantidade do item
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>

                        {/* Botão para adicionar o item ao carrinho */}
                        <Button
                            onClick={() => { dispatch(addToCart({ item: { ...item, count } })) }} // Despacha a ação addToCart com o item e a quantidade selecionada
                            variant='contained'
                            sx={{
                                backgroundColor: shades.primary[300],
                                color: "white",
                                fontSize: "0.8rem"

                            }}
                        >
                            Adicionar ao Carrinho
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box mt="3px">
                <Typography variant="subtitle2" color={neutral.dark}>
                    {/* Transforma o texto da categoria adicionando espaços antes de cada letra maiúscula */}
                    {category.replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                    }
                </Typography>
                <Typography>{name}</Typography>
                <Typography fontWeight="bold">R${price}</Typography>
            </Box>
        </Box>
    )
}

export default Item;
