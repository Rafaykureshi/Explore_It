// Enhanced Color Palette - Modern & Cohesive Design
const Colors = {
  // Primary Brand Colors (Logo-inspired)
  primary: {
    main: "#6366F1",        // Modern indigo (primary brand)
    light: "#818CF8",       // Lighter indigo
    dark: "#4F46E5",        // Darker indigo
    gradient: ["#6366F1", "#8B5CF6"], // Primary gradient
  },
  
  // Secondary Colors (Complementary)
  secondary: {
    main: "#F59E0B",        // Warm amber (accent)
    light: "#FCD34D",       // Light amber
    dark: "#D97706",        // Dark amber
    gradient: ["#F59E0B", "#EF4444"], // Secondary gradient
  },
  
  // Background Colors (Dark Theme)
  background: {
    primary: "#0F172A",     // Deep slate (main background)
    secondary: "#1E293B",   // Medium slate (cards/sections)
    tertiary: "#334155",    // Light slate (inputs/buttons)
    surface: "#475569",     // Surface elements
    overlay: "rgba(15, 23, 42, 0.95)", // Modal overlay
  },
  
  // Text Colors
  text: {
    primary: "#F8FAFC",     // Primary text (white)
    secondary: "#CBD5E1",   // Secondary text (light gray)
    tertiary: "#94A3B8",    // Tertiary text (medium gray)
    disabled: "#64748B",    // Disabled text
    inverse: "#0F172A",     // Text on light backgrounds
  },
  
  // Status Colors
  status: {
    success: "#10B981",     // Green
    successLight: "#34D399",
    error: "#EF4444",       // Red
    errorLight: "#F87171",
    warning: "#F59E0B",     // Amber
    warningLight: "#FCD34D",
    info: "#3B82F6",        // Blue
    infoLight: "#60A5FA",
  },
  
  // Interactive Elements
  interactive: {
    hover: "rgba(99, 102, 241, 0.1)",
    pressed: "rgba(99, 102, 241, 0.2)",
    focus: "rgba(99, 102, 241, 0.3)",
    disabled: "#64748B",
  },
  
  // Borders & Dividers
  border: {
    primary: "#334155",     // Main borders
    secondary: "#475569",   // Secondary borders
    accent: "#6366F1",      // Accent borders
    light: "#64748B",       // Light borders
  },
  
  // Gradients
  gradients: {
    primary: ["#6366F1", "#8B5CF6"],
    secondary: ["#F59E0B", "#EF4444"],
    success: ["#10B981", "#059669"],
    background: ["#0F172A", "#1E293B"],
    card: ["#1E293B", "#334155"],
  },
  
  // Legacy support (for existing code)
  PRIMARY: "#6366F1",
  SECONDARY: "#0F172A",
  
  // Light theme (for future use)
  light: {
    text: "#0F172A",
    background: "#FFFFFF",
    tint: "#6366F1",
    icon: "#64748B",
    tabsIconDefault: "#94A3B8",
    tabsIconSelected: "#6366F1",
  },
  
  // Dark theme (current)
  dark: {
    text: "#F8FAFC",
    background: "#0F172A",
    tint: "#818CF8",
    icon: "#94A3B8",
    tabsIconDefault: "#64748B",
    tabsIconSelected: "#818CF8",
  },
};

export { Colors };
