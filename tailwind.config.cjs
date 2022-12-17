/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                lato: ['Lato', 'sans-serif'],
                fredoka: ['Fredoka', 'cursive'],
            },
        },
    },
    plugins: [],
    // plugins: [require('@tailwindcss/forms')],
};
