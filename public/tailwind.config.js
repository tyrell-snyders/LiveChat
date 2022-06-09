/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultConfig')
module.exports = {
    content: ["./index.html", "./src/**/*.{html,ts,tsx,,js,jsx}", "./src/*.{ts,tsx}"],
    theme: {
        extend: {},
        ...defaultTheme,
        colors: {
            ...defaultTheme.colors,
            white: '#ffffff',
            pinkorpurple: '#4e0eFF',
            primary: '#393E46',
            secondary: '#ffffff',
            inpu: '#1C2B2D',
            inpufoc: '#3b6978',
            btn: '#204051',
            btnhov: `#3b6978`,
            text: {
                DEFAULT: '#1F2937',
                light: '#6C7281'
            },
        }
    },
    plugins: [],
}