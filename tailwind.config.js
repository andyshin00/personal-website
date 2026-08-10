/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text'),
            '--tw-prose-headings': theme('colors.text'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.text'),
            '--tw-prose-quotes': theme('colors.muted'),
            '--tw-prose-code': theme('colors.text'),
            a: { textDecoration: 'underline', fontWeight: '500' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
