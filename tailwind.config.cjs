module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Barlow', 'sans-serif'],
      cursive: ['Amatic SC', 'cursive']
    },
    colors: {
      'thm-base': '#eddd5e',
      'thm-primary': '#5b8c51',
      'thm-black': '404a3d',
      'thm-gray': '#ece'
    },
    container: {
      center: true,
      padding: '4rem',
      margin: '2rem'
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          
        }
      }
    ]
  }
}
