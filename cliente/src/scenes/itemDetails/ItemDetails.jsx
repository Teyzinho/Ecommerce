import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Tabs, Tab, Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetails = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    async function getItem() {
        const item = await fetch(
            // `http://localhost:1338/api/items/${itemId}?populate=image`,
            `${process.env.REACT_APP_SERVER_URL}/api/items/${itemId}?populate=image`,
            { method: "GET" }
        );
        const itemJson = await item.json();
        setItem(itemJson.data);
    }

    async function getItems() {
        const Items = await fetch(
            // "http://localhost:1338/api/items?populate=image",
            `${process.env.REACT_APP_SERVER_URL}/api/items?populate=image`,
            { method: "GET" }
        );
        const itemsJson = await Items.json();
        setItems(itemsJson.data)
    }

    useEffect(() => {
        getItem();
        getItems();
    }, [itemId])

    return (
        <Box
            width="80%"
            margin="auto"
        >
            <Box display="flex" flexWrap="wrap" columnGap="40px">
                {/* Imagens */}
                <Box flex="1 1 40%" mb="30px">
                    <img
                        alt={item?.name}
                        width="100%"
                        height="100%"
                        // src={`http://localhost:1338${item?.attributes?.image?.data?.attributes?.formats.thumbnail?.url}`}
                        src={`${process.env.REACT_APP_SERVER_URL}${item?.attributes?.image?.data?.attributes?.formats.thumbnail?.url}`}
                        style={{ objectFit: "contain" }}
                    />
                </Box>

                {/* Counteudo */}
                <Box flex="1 1 50%" mb="30px">
                    <Box display="flex" justifyContent="space-between">
                        <Box>Home/item</Box>
                        <Box>PlaceHolder</Box>
                    </Box>

                    {/* Sobre o Produto */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap="20px"
                    >
                        {/* Titulo Produto*/}
                        <Typography variant="h4">
                            {item?.attributes?.name}
                        </Typography>
                        {/* Descrição Produto*/}
                        <Typography>
                            {item?.attributes.shortDescription}
                        </Typography>
                        {/* Preço Produto*/}
                        <Typography mb="25px">
                            R${item?.attributes.price}
                        </Typography>
                    </Box>
                    {/* Botões */}
                    <Box
                        display="flex"
                        alignItems="flex-end"
                        minHeight="50px"
                        justifyContent="space-between"

                    >
                        {/* Botões QTDE / ADD ao carrinho*/}
                        <Box
                            width="100%"
                        >
                            <Box display="flex" alignItems="center" gap="10px" mb="25px">
                                <Typography>
                                    Quantidade
                                </Typography>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    backgroundColor={shades.neutral[300]}
                                    borderRadius="5px"
                                    width="fit-content"
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
                            </Box>

                            {/* Adicionar ao carrinho */}
                            <Button
                                onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
                                variant='contained'
                                sx={{
                                    backgroundColor: shades.primary[300],
                                    color: "white",
                                    fontSize: "1rem",
                                    width: "80%"
                                }}
                            >
                                Adicionar ao Carrinho
                            </Button>
                        </Box>

                        <Box m="20px 0 5px 0" display="flex" alignItems="center" gap="5px">
                            <FavoriteBorderOutlinedIcon fontSize="large"/>
                            <Typography >
                                Adicionar a Lista de Desejos
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                    </Box>
                </Box>

                {/* Informações */}
                <Box>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Descrição" value="description" />
                        <Tab label="Reviews" value="reviews" />
                    </Tabs>
                </Box>
                <Box display="flex" flexWrap="wrap" gap="15px">
                    <div>
                        {item?.attributes?.LongDescription}
                    </div>
                </Box>
            </Box>

            {/* Itens Relacionados */}
            <Box mt="50px" width="100%">
                <Typography variant="h4">
                    Produtos Relacionados
                </Typography>
                <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    columnGap="1.33%"
                    justifyContent="space-around"
                >
                    {items.slice(0, 4).map((item, i) => (
                        <Item key={`${item.name}-${i}`} item={item} width={300} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default ItemDetails