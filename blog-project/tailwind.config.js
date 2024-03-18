/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      backgroundImage:{
        homeBackground:"url('https://img.freepik.com/free-photo/blue-surface-with-study-tools_23-2147864592.jpg?w=1060&t=st=1710756373~exp=1710756973~hmac=027533c6cd2143c66115fd2d45423c3085b84dee1ffab27b8e589243a41f0ce3')"
      },
      fontFamily:{
        poppins: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}