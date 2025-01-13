import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./sections/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",

	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
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
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				  },
				building: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				  },
				  crane: {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(5deg)' }
				  },
				  worker: {
					'0%, 100%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(20px)' }
				  },
				  construct: {
					'0%': { strokeDasharray: '0 1000' },
					'100%': { strokeDasharray: '1000 1000' }
				  },
				  windows: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				  },
				  pulley: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(2px)' }
				  },
				  cable: {
					'0%, 100%': { strokeDashoffset: '0' },
					'50%': { strokeDashoffset: '10' }
				  },
				  load: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				  },
				  progress: {
					'0%': { transform: 'translateX(-100%)' },
					'50%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(100%)' }
				  },
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite',
				'progress': 'progress 2s ease-in-out infinite',
				'fadeIn': 'fadeIn 0.5s ease-in',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'building': 'building 4s ease-in-out infinite',
				'crane': 'crane 6s ease-in-out infinite',
				'worker': 'worker 2s ease-in-out infinite',
				'construct': 'construct 3s ease-out forwards',
				'windows': 'windows 0.5s ease-out forwards',
				'pulley': 'pulley 2s ease-in-out infinite',
				'cable': 'cable 2s ease-in-out infinite',
				'load': 'load 2s ease-in-out infinite',
				'pro': 'progress 2s ease-in-out infinite',
				'fade': 'fadeIn 0.5s ease-in',
			
			},


		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
