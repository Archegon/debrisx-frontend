import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            primary: {
                50: '#e6edfe',
                100: '#cddafe',
                200: '#9bb5fd',
                300: '#6990fc',
                400: '#376bfb',
                500: '#0546fa',
                600: '#0438c8',
                700: '#032a96',
                800: '#021c64',
                900: '#010e32',
                950: '#010719',
            },
            secondary: {
                50: '#f5e6fe',
                100: '#ebcdfe',
                200: '#d79bfd',
                300: '#c469fc',
                400: '#b037fb',
                500: '#9c05fa',
                600: '#7d04c8',
                700: '#5e0396',
                800: '#3e0264',
                900: '#1f0132',
                950: '#100119',
            },
            accent: {
                50: '#fce6fe',
                100: '#f9cdfe',
                200: '#f39bfd',
                300: '#ed69fc',
                400: '#e737fb',
                500: '#e105fa',
                600: '#b404c8',
                700: '#870396',
                800: '#5a0264',
                900: '#2d0132',
                950: '#170119',
            },
            text: {
                50: '#e6edfe',
                100: '#cddbfe',
                200: '#9cb7fc',
                300: '#6a93fb',
                400: '#386ffa',
                500: '#064bf9',
                600: '#053cc7',
                700: '#042d95',
                800: '#031e63',
                900: '#010f32',
                950: '#010819',
            },
            background: {
                50: '#e6eefe',
                100: '#ceddfd',
                200: '#9cbafc',
                300: '#6b98fa',
                400: '#3976f9',
                500: '#0854f7',
                600: '#0643c6',
                700: '#053294',
                800: '#032163',
                900: '#09142a',
                950: '#010c23',
            },
        }
        : {
            primary: {
                50: '#010719',
                100: '#010e32',
                200: '#021c64',
                300: '#032a96',
                400: '#0438c8',
                500: '#0546fa',
                600: '#376bfb',
                700: '#6990fc',
                800: '#9bb5fd',
                900: '#cddafe',
                950: '#e6edfe',
            },
            secondary: {
                50: '#100119',
                100: '#1f0132',
                200: '#3e0264',
                300: '#5e0396',
                400: '#7d04c8',
                500: '#9c05fa',
                600: '#b037fb',
                700: '#c469fc',
                800: '#d79bfd',
                900: '#ebcdfe',
                950: '#f5e6fe',
            },
            accent: {
                50: '#170119',
                100: '#2d0132',
                200: '#5a0264',
                300: '#870396',
                400: '#b404c8',
                500: '#e105fa',
                600: '#e737fb',
                700: '#ed69fc',
                800: '#f39bfd',
                900: '#f9cdfe',
                950: '#fce6fe',
            },
            text: {
                50: '#010819',
                100: '#010f32',
                200: '#031e63',
                300: '#042d95',
                400: '#053cc7',
                500: '#064bf9',
                600: '#386ffa',
                700: '#6a93fb',
                800: '#9cb7fc',
                900: '#cddbfe',
                950: '#e6edfe',
            },
            background: {
                50: '#010819',
                100: '#021131',
                200: '#032163',
                300: '#053294',
                400: '#0643c6',
                500: '#0854f7',
                600: '#3976f9',
                700: '#6b98fa',
                800: '#9cbafc',
                900: '#d5e0f6',
                950: '#dce7fe',
            },
        }),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.primary[300],
                    },
                    secondary: {
                        main: colors.secondary[300],
                    },
                    background: {
                        default: colors.background[950],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.primary[300],
                    },
                    secondary: {
                        main: colors.secondary[300],
                    },
                    background: {
                        default: colors.background[950],
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans 3", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};