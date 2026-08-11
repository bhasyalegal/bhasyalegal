
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
<<<<<<< HEAD
					DEFAULT: '#0B1F3A',
=======
					DEFAULT: '#1b0738',
>>>>>>> 6bf9ce78c924901f37302c226cdd55588be69d37
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
<<<<<<< HEAD
				'royal-blue': '#0B1F3A',
				'royal-blue-deep': '#07152A',
				'royal-blue-secondary': '#163A63',
				'law-gold': '#C9A227',
				'law-gold-light': '#DDBF63',
				'law-gold-dark': '#A8871F',
				'law-light-blue': '#F8F5EE',
				'ivory': '#F8F5EE',
				'warm-white': '#FCFBF8'
=======
				'royal-blue': '#1b0738',
				'law-gold': '#D4AF37',
				'law-light-blue': '#F8FAFC'
>>>>>>> 6bf9ce78c924901f37302c226cdd55588be69d37
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in': 'slide-in 0.5s ease-out'
			},
			fontFamily: {
<<<<<<< HEAD
				'serif': ['Cormorant Garamond', 'Noto Serif Devanagari', 'Georgia', 'serif'],
				'sans': ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif']
			},
			boxShadow: {
				'soft': '0 8px 30px rgba(7, 21, 42, 0.08)',
				'soft-lg': '0 20px 50px rgba(7, 21, 42, 0.12)',
				'soft-gold': '0 8px 24px rgba(201, 162, 39, 0.18)'
=======
				'serif': ['Playfair Display', 'Georgia', 'serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif']
>>>>>>> 6bf9ce78c924901f37302c226cdd55588be69d37
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
