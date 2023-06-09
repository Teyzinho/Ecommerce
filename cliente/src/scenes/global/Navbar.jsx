import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton } from '@mui/material';
import {
    PersonOutline,
    ShoppingBagOutlined,
    MenuOutlined,
    SearchOutlined
} from '@mui/icons-material' //Import de Icons

import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import './Navbar.css'
import { setIsCartOpen } from '../../state';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart)

    return (
        <div className='navBar-container'>
            <div className='navbar'>
                <span 
                    style={{
                        color: `${shades.secondary[500]}`,
                        cursor: "pointer"
                    }}
                onClick={() => navigate("/")}>
                    E-commerce
                </span>

                <div className='icons'>
                    <IconButton sx={{ color: "black" }}>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton sx={{ color: "black" }}>
                        <PersonOutline />
                    </IconButton>
                    <Badge
                        badgeContent={cart.length}
                        color='secondary'
                        invisible={cart.lenght === 0}
                        sx={{
                            "& .MuiBadge-badge":{
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                // height: "14px",
                                minWidth: "13px,"
                            },
                        }}
                    >
                        <IconButton
                            onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{ color: "black" }}>
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>
                    <IconButton sx={{ color: "black" }}>
                        <MenuOutlined />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Navbar