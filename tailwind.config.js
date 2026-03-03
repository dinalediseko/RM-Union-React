/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Sepedi-inspired wedding theme colors
        'sepedi': {
          cream: '#FFFDF5',
          'cream-dark': '#F5F0E0',
          yellow: '#FFC107',
          'yellow-light': '#FFD54F',
          blue: '#1976D2',
          'blue-light': '#42A5F5',
          pink: '#E91E63',
          'pink-light': '#F06292',
        },
      },
      fontFamily: {
        'script': ['Great Vibes', 'cursive'],
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'envelope': '0 10px 40px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'seal': '0 0 20px rgba(255, 193, 7, 0.5)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "pulse-seal": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 20px rgba(255, 193, 7, 0.5)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 30px rgba(255, 193, 7, 0.8)" },
        },
        "flap-open": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(180deg)" },
        },
        "card-slide": {
          "0%": { transform: "translateY(0) scale(0.9)", opacity: "0" },
          "100%": { transform: "translateY(-120%) scale(1)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bg-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "pulse-seal": "pulse-seal 2s ease-in-out infinite",
        "flap-open": "flap-open 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "card-slide": "card-slide 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "bg-zoom": "bg-zoom 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
