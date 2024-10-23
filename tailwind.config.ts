import type {Config} from 'tailwindcss/types/config'
import tailwindcssAnimate from 'tailwindcss-animate'
// import {withUt} from 'uploadthing/tw'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.tsx', './storybook/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-golos)'],
        title: ['var(--font-aptly)'],
        chinese: ['var(noto-sans-chinese)'],
        hebrew: ['var(noto-sans-hebrew)'],
        japanese: ['var(noto-sans-japanese)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        pink: '#C058D2',
        yellow: {
          300: '#FFE37E',
          DEFAULT: '#F9D75F',
          500: '#F6C944',
          600: '#7E7552',
        },
        gray: {
          100: '#DCDEE9',
          200: '#9698AF',
          DEFAULT: '#65636E',
          400: '#474A69',
        },
        dark: {
          400: '#262432',
          500: '#111516',
          600: '#08001A',
        },
        backgroundImage: {
          // TODO does this work
          'gradient-primary': `linear-gradient(to bottom left, var(--primary) 25%, var(--secondary) 92%)`,
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
