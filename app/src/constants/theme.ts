const defaultTheme = {
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: '#1e4091',
            contrastText: '#ffffff',
        },
        secondary: {
            main: 'f13757',
            contrastText: '#ffffff',
        },
        common: {
            black: '#000000',
            white: '#ffffff',
        },
        background: {
            default: '#efefef',
            disabled: 'rgba(0, 0, 0, 0.12)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        warning: {
            main: '#f13757',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#282828',
        },
    },
    shadows: ['none', '4px 2px 20px rgba(0,0,0,0.12)'],
    typography: {
        fontFamily: "'Open Sans', sans-serif",
    },
};

export const breakpoints = {
    sm: `(max-width:${defaultTheme.breakpoints.values.sm}px)`,
    md: `(max-width: ${defaultTheme.breakpoints.values.md}px)`,
    lg: `(max-width: ${defaultTheme.breakpoints.values.lg}px)`,
    xl: `(max-width: ${defaultTheme.breakpoints.values.lg}px)`,
};

export default defaultTheme;
