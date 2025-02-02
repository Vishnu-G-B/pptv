export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            transitionProperty: {
                'width': 'width',
            },
            colors: {
                "surface": "#250025",
                "on-surface": "#dee3e9",
                'primary': '#660066',
                'secondary-primary': '#250025',
            },
            fontFamily: {
                stint: ["StintUltra", "sans-serif"],
                karla: ['Karla', "sans-serif"],
                Iconsolata: ['Iconsolata', "sans-serif"],
            }
        }
    },
    plugins: []
};

