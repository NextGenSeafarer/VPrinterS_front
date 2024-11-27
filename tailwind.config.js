/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0A1F2D',
                secondaryText: '#A5B9B7',
                surfaceDark: '#102A3D',
                primaryAccent: '#FF9F43',
                surfaceLight: '#1A3B4A',
                highlightText: '#F7F7F7',
                secondaryAccent: '#8C4A2F',
                primaryText: '#D1E8E2',
                error: '#D9534F',
                warning: '#B87333',
                success: '#4CAF50',
                info: '#33B5E5',

                borderLight: '#3B5360',
                borderDark: '#263E4D',
            },
        }
    },
    plugins: [],
}
