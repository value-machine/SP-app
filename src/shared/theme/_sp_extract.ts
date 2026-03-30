/**
 * MUI Theme Configuration ÔÇö SP.nl visual identity
 *
 * Derived from `sp-styleguide.html` (Barlow / Barlow Condensed stand-ins for
 * Helvetica Inserat / Helvetica Neue). Single source of truth for app styling.
 *
 * Principles: zero border-radius, flat surfaces (no gradients/shadows on controls),
 * uppercase display type, 8pt spacing rhythm.
 */

import { createTheme, ThemeOptions, Theme, alpha, Shadows } from "@mui/material/styles";

/** Body: Barlow. Display: Barlow Condensed (matches styleguide fallbacks). */
const FONT_BODY = "'Barlow', 'Helvetica Neue', Helvetica, sans-serif";
const FONT_HEADER = "'Barlow Condensed', 'Helvetica Inserat', Tahoma, sans-serif";

// Tokens from sp-styleguide.html :root
const COLORS = {
  primary: {
    main: "#e9161d",
    dark: "#b3050f",
    light: "#fc888f",
  },
  secondary: {
    main: "#7bc7c3",
    dark: "#33b3a6",
    light: "#b3f3ec",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
    muted: "#f2f2f2",
  },
  text: {
    primary: "#141414",
    secondary: "#777777",
    disabled: "#afafaf",
  },
  border: {
    subtle: "#eeeeee",
    input: "#cbcbcb",
  },
  grey: {
    80: "#1f1f1f",
    black: "#000000",
  },
  success: "#009944",
  error: "#cf000f",
} as const;

const SP_SHADOWS = Array(25).fill("none") as Shadows;

export const defaultThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: COLORS.primary.main,
      dark: COLORS.primary.dark,
      light: COLORS.primary.light,
      contrastText: "#ffffff",
    },
    secondary: {
      main: COLORS.secondary.main,
      dark: COLORS.secondary.dark,
      light: COLORS.secondary.light,
      contrastText: COLORS.text.primary,
    },
    error: {
      main: COLORS.error,
      contrastText: "#ffffff",
    },
    success: {
      main: COLORS.success,
      contrastText: "#ffffff",
    },
    background: {
      default: COLORS.background.default,
      paper: COLORS.background.paper,
    },
    text: {
      primary: COLORS.text.primary,
      secondary: COLORS.text.secondary,
      disabled: COLORS.text.disabled,
    },
    divider: COLORS.border.subtle,
    action: {
      hover: alpha(COLORS.text.primary, 0.06),
      selected: alpha(COLORS.primary.main, 0.12),
    },
  },
  shape: {
    borderRadius: 0,
  },
  shadows: SP_SHADOWS,
  transitions: {
    duration: {
      standard: 500,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  typography: {
    fontFamily: FONT_BODY,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700,
    h1: {
      fontFamily: FONT_HEADER,
      fontWeight: 900,
      fontSize: "5rem",
      lineHeight: 1.1,
      letterSpacing: "-0.5px",
      textTransform: "uppercase",
      color: COLORS.text.primary,
    },
    h2: {
      fontFamily: FONT_HEADER,
      fontWeight: 900,
      fontSize: "4.5rem",
      lineHeight: 1.1,
      textTransform: "uppercase",
      color: COLORS.text.primary,
    },
    h3: {
      fontFamily: FONT_HEADER,
      fontWeight: 900,
      fontSize: "3.5rem",
      lineHeight: 1.15,
      textTransform: "uppercase",
      color: COLORS.text.primary,
    },
    h4: {
      fontFamily: FONT_HEADER,
      fontWeight: 900,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      textTransform: "uppercase",
      color: COLORS.text.primary,
    },
    h5: {
      fontFamily: FONT_HEADER,
      fontWeight: 900,
      fontSize: "2rem",
      lineHeight: 1.25,
      textTransform: "uppercase",
      color: COLORS.text.primary,
    },
    h6: {
      fontFamily: FONT_HEADER,
      fontWeight: 900,
      fontSize: "1.5rem",
      lineHeight: 1.3,
      textTransform: "uppercase",
      color: COLORS.text.primary,
    },
    subtitle1: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: 1.5,
      color: COLORS.text.primary,
    },
    subtitle2: {
      fontFamily: FONT_BODY,
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      color: COLORS.text.secondary,
    },
    body1: {
      fontFamily: FONT_BODY,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: FONT_BODY,
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      color: COLORS.text.secondary,
    },
    button: {
      fontFamily: FONT_HEADER,
      fontWeight: 900,
      fontSize: "1.25rem",
      lineHeight: 1.2,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
    caption: {
      fontFamily: FONT_BODY,
      fontSize: "0.75rem",
      lineHeight: 1.5,
      color: COLORS.text.secondary,
    },
    overline: {
      fontFamily: FONT_HEADER,
      fontWeight: 900,
      fontSize: "0.75rem",
      lineHeight: 1.5,
      letterSpacing: "0.125em",
      textTransform: "uppercase",
      color: COLORS.text.secondary,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.background.default,
          color: COLORS.text.primary,
          boxShadow: "none",
          borderBottom: `1px solid ${COLORS.border.subtle}`,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        square: true,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
        square: true,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          fontFamily: FONT_HEADER,
          fontWeight: 900,
          fontSize: "1.25rem",
          textTransform: "uppercase",
          color: theme.palette.text.primary,
          textDecoration: "none",
          borderBottom: `2px solid ${theme.palette.text.primary}`,
          paddingBottom: "2px",
          transition: theme.transitions.create(["color", "border-color"], {
            duration: 500,
          }),
          "&:hover": {
            color: theme.palette.primary.main,
            borderBottomColor: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        color: "primary",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          padding: "12px 24px",
          minHeight: 48,
          transition: "background-color 500ms ease, color 500ms ease, border-color 500ms ease",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          backgroundColor: COLORS.primary.main,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: COLORS.primary.dark,
          },
        },
        containedSecondary: {
          backgroundColor: COLORS.secondary.main,
          color: COLORS.text.primary,
          "&:hover": {
            backgroundColor: COLORS.secondary.dark,
            color: "#ffffff",
          },
        },
        outlined: ({ theme }: { theme: Theme }) => ({
          borderWidth: 2,
          "&.MuiButton-colorInherit": {
            borderColor: theme.palette.text.primary,
            color: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.text.primary,
              backgroundColor: theme.palette.text.primary,
              color: theme.palette.background.default,
            },
          },
          "&.MuiButton-colorPrimary": {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            "&:hover": {
              borderColor: theme.palette.primary.dark,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          },
          "&.MuiButton-colorSecondary": {
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.dark,
            "&:hover": {
              borderColor: theme.palette.secondary.dark,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
            },
          },
        }),
        text: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        }),
        colorInherit: ({ theme }: { theme: Theme }) => ({
          ...(theme.palette.mode === "light"
            ? {
                "&.MuiButton-contained": {
                  backgroundColor: COLORS.grey[80],
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: COLORS.grey.black,
                  },
                },
              }
            : {}),
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        code: ({ theme }: { theme: Theme }) => ({
          fontFamily: theme.typography.fontFamily,
          backgroundColor: COLORS.background.muted,
          color: theme.palette.text.primary,
          borderRadius: 0,
        }),
        pre: ({ theme }: { theme: Theme }) => ({
          fontFamily: theme.typography.fontFamily,
          backgroundColor: COLORS.background.muted,
          color: theme.palette.text.primary,
          borderRadius: 0,
        }),
        "*": {
          boxSizing: "border-box",
          scrollbarWidth: "thin",
          scrollbarColor: `${alpha(COLORS.text.primary, 0.35)} transparent`,
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(COLORS.text.primary, 0.35),
          borderRadius: 0,
          "&:hover": {
            backgroundColor: alpha(COLORS.text.primary, 0.5),
          },
        },
        body: {
          margin: 0,
          minHeight: "100vh",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          backgroundColor: COLORS.background.default,
          color: COLORS.text.primary,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "& code": {
            backgroundColor: COLORS.background.muted,
            color: theme.palette.text.primary,
            padding: "2px 8px",
            borderRadius: 0,
            fontSize: theme.typography.body2.fontSize,
            fontFamily: theme.typography.fontFamily,
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: FONT_HEADER,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.0625em",
        },
        sizeSmall: ({ theme }: { theme: Theme }) => ({
          height: 24,
          fontSize: theme.typography.caption.fontSize,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 0,
          transition: theme.transitions.create(["border-color"], { duration: 500 }),
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderColor: COLORS.border.input,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.text.secondary,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderColor: theme.palette.primary.main,
          },
        }),
        input: {
          padding: "12px 16px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: FONT_HEADER,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.0625em",
          fontSize: "0.75rem",
          "&.Mui-focused": {
            color: COLORS.text.primary,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: FONT_BODY,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          boxShadow: "none",
          border: `1px solid ${COLORS.border.subtle}`,
        },
      },
    },
  },
};

export const defaultTheme = createTheme(defaultThemeOptions);
