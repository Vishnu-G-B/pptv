export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    mode: "jit",
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
                'background': '#f3f3e7',
                'brand-green': '#6aa84f',
            },
            fontFamily: {
                stint: ["Poppins", "sans-serif"],
                karla: ['Poppins', "sans-serif"],
                Iconsolata: ['Poppins', "sans-serif"],
                fancy: ["FancyFont", "sans-serif"],
                poppinsbold: ["Poppins-Bold", "sans-serif"],
            },

        }
    },
    plugins: []
};

