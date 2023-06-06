import { createTheme } from '@mui/material/styles';

// Paletas de cores para tons primários, secundários e neutros
export const shades = {
    primary: { // Preto
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000", // Cor principal
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000"
    },
    secondary: { // Azul
        100: "#d1e1ee",
        200: "#a2c4dd",
        300: "#74a6cb",
        400: "#4589ba",
        500: "#176ba9", // Cor principal
        600: "#125687",
        700: "#0e4065",
        800: "#092b44",
        900: "#051522"
    },
    neutral: { // Tom claro
        100: "#f5f5f5",
        200: "#ecebeb",
        300: "#e2e1e1",
        400: "#d9d7d7",
        500: "#cfcdcd", // Cor principal
        600: "#a6a4a4",
        700: "#7c7b7b",
        800: "#535252",
        900: "#292929"
    },
}

// Criação do tema utilizando as paletas de cores definidas acima
export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500] // Cor principal do tema é definida como o tom primário de valor 500 (preto)
        },
        secondary: {
            main: shades.secondary[500] // Cor secundária do tema é definida como o tom secundário de valor 500 (azul)
        },
        neutral: {
            dark : shades.neutral[700], // Tom neutro escuro
            main: shades.neutral[500], // Cor principal neutra
            light: shades.neutral[100] // Tom neutro claro
        }
    },
    typography:{
        fontFamily: ["Fauna One", "sans-serif"].join(","), // Fonte do texto: "Fauna One" com fallback para "sans-serif"
        fontSize: 16, // Tamanho padrão do texto
        h1: {
            fontSize: 48, // Tamanho específico para o cabeçalho h1
        }
    }
})
