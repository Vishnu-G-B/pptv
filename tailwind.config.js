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
                'alternate-primary': '#250025',
                'brand-orange': '#ff9900',
                'background': '#f6f5ec',
                'brand-green': '#5cb85c',
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

