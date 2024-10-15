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
      }
    }
  },
  plugins: []
};

