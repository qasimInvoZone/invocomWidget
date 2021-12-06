module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
  
    extend: {  
      colors:{
      primary: '#1b3660',
      secondary: '#f2f2f7',
      grey: '#FAFAFF',
      lightGrey:'#f4f4f4',
      lightBlue: '#315083'
    },
    height:{
     
      lg: "460px",
      md:'340px',
      inputfoot: '150px',
      sm:'83px'
    },
    width:{
      lg: '360px',
      md: '260px',
      sm:'320px',
      form: '250px',
      calender: '340px',
      calBtn: '210px'
    }
    
  },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}