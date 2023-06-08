import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme"

//Função que importa todas Imgs da pasta Assets
const importAll = (i) =>
    i.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = i(item);
        return acc;
    }, {});

// Importando todos os arquivos de imagem (png, jpeg, svg) de um diretório específico usando a função importAll
const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
)

const MainCarousel = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={true}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "0",
                        color: "white",
                        padding: "5px",
                        zIndex: "10",
                    }}
                >
                    <NavigateBeforeIcon sx={{ fontSize: "40" }} />
                </IconButton>
            )}

            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "0",
                        color: "white",
                        padding: "5px",
                        zIndex: "10",
                    }}
                >
                    <NavigateNextIcon sx={{ fontSize: "40" }} />
                </IconButton>
            )}
        >
            {Object.values(heroTextureImports).map((texture, index) => {
                return (
                    <Box key={`carousel-image-${index}`}>
                        <img
                            src={texture}
                            alt={`carousel-${index}`}
                            style={{
                                width: "100%",
                                height: "650px",
                                objectFit: "cover",
                                backgroundAttachment: "fixed"
                            }}
                        />
                    </Box>
                )

            })}
        </Carousel>
    )
}

export default MainCarousel;

//https://github.com/leandrowd/react-responsive-carousel