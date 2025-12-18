export const colors = {
  light: {
    // Traditional saffron-gold palette
    primary: '#FF6B35',      // Saffron
    secondary: '#C17817',    // Deep gold
    tertiary: '#8B4513',     // Saddle brown
    
    background: '#FFF8F0',   // Warm cream
    surface: '#FFFFFF',
    surfaceVariant: '#FFF5E9',
    
    text: '#2D1810',         // Deep brown
    textSecondary: '#6B4423',
    textTertiary: '#9B6B47',
    
    border: '#E8D5C4',
    borderLight: '#F5E9DD',
    
    accent: '#D4AF37',       // Gold
    accentLight: '#F4E4C1',
    
    success: '#4A7C59',
    error: '#C14938',
    warning: '#D4A05D',
  },
  dark: {
    primary: '#FF8C5A',
    secondary: '#E8A458',
    tertiary: '#B8773D',
    
    background: '#1A0F0A',
    surface: '#2D1810',
    surfaceVariant: '#3D2418',
    
    text: '#F5E9DD',
    textSecondary: '#D4C4B4',
    textTertiary: '#B8A898',
    
    border: '#4D3D2D',
    borderLight: '#3D2D1D',
    
    accent: '#E8C547',
    accentLight: '#4D3D1D',
    
    success: '#6A9C79',
    error: '#E16958',
    warning: '#E8B47D',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  // Sanskrit/Devanagari optimized
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
};
