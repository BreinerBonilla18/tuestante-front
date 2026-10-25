export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        muted: '#5B6573',
        subtle: '#8A94A3',
        line: '#D9DEE5',
        surface: '#F4F6F9',
        accent: {
          DEFAULT: '#1E4F8A',
          hover: '#173F6F',
          soft: '#E8EFF7',
        },
        success: { DEFAULT: '#1F7A4D', soft: '#E7F3EC' },
        warning: { DEFAULT: '#8A5A00', soft: '#FBF3E2' },
        danger: { DEFAULT: '#B42318', soft: '#FDECEA' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
        lg: '6px',
      },
      maxWidth: {
        site: '1320px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
};
