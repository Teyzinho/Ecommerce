import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import './CartMenu.css'
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from '../../state'
import { useNavigate } from 'react-router-dom';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <Box className="cart-container" display={isCartOpen ? "block" : "none"}>
      <Box className="cart-box">
        <Box padding="30px" overflow="auto" height="100%">
          {/* Header */}
          <FlexBox mb="15px">
            <Typography variant="h5">
              SHOPPING BAG ({cart.length})
            </Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen(false))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* Lista */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      src={`http://localhost:1338${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
                      alt={item?.attributes?.name}
                      width="100%"
                      height="100%"
                      sx={{
                        objectFit: "cover"
                      }}
                    />
                  </Box>
                  <Box flex="1 1 40%">
                    {/* Nome do Item */}
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography fontSize="12px">
                      {item.attributes.shortDescription}
                    </Typography>
                    {/* Mais e Menos */}
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>
                          {item.count}
                        </Typography>
                        <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* Preço */}
                      <Typography fontWeight="bold">
                        R${item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* Ações */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">
                SubTotal
              </Typography>
              <Typography fontWeight="bold">
                R${totalPrice}
              </Typography>
            </FlexBox>
            <Button
            color="primary"
            variant='contained'
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0"
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen(false));
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CartMenu;
