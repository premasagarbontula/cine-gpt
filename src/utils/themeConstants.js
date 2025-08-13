export const THEME_STYLES = {
  dark: {
    bannerOverlay: "bg-black bg-opacity-80",
    bodyText: "text-gray-200",
    primaryButton: "bg-red-700 hover:bg-red-800 text-white",
    secondaryButton: "bg-gray-800 hover:bg-gray-700 text-white",
    header: "bg-gradient-to-b from-black to-transparent",
    text: "text-white",
    logoText: "text-white",
    languageSelector: "bg-gray-900 text-white border-gray-700",
    dropdown: "bg-gray-900 text-white border-gray-700",
    dropdownItem: "hover:bg-gray-700",
    divider: "border-gray-700",
    hoverBg: "hover:bg-white/10",
    gptButton: "bg-red-600 hover:bg-white text-black",
    signInButton: "bg-red-600 hover:bg-red-700 hover:text-black",
    signOutButton: "bg-red-600 hover:bg-red-700 hover:text-black",
    avatarButton: "hover:bg-white/10",

    //Footer
    footerBackground: "bg-gray-900",
    footerText: "text-gray-400",
    socialIcon: "hover:text-white",
    disclaimerText: "text-gray-400",
    emphasisText: "text-gray-300",

    //Login
    pageBackground: "bg-gray-900",
    formBackground: "bg-gray-800 bg-opacity-90",
    headingText: "text-white",
    inputText: "text-white",
    inputBorder: "border-gray-600",
    inputError: "border-red-500",
    errorText: "text-red-400 text-sm mt-1 mb-4",
    secondaryText: "text-gray-400",
    linkText: "text-blue-400",

    //Secondary Container
    secondaryContainerBackground: "bg-black",
    skeletonContainer: "bg-gray-800",
    skeletonCard: "bg-gray-700",
    skeletonElement: "bg-gray-600",
  },
  light: {
    bannerOverlay: "bg-white bg-opacity-70",
    bodyText: "text-gray-800",
    primaryButton: "bg-red-600 hover:bg-red-700 text-white",
    secondaryButton: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    header: "bg-gradient-to-b from-black to-transparent",
    text: "text-gray-900",
    logoText: "text-gray-900",
    languageSelector: "bg-gray-100 text-gray-900 border-gray-300",
    dropdown: "bg-white text-gray-900 border-gray-200",
    dropdownItem: "hover:bg-gray-100",
    divider: "border-gray-200",
    hoverBg: "hover:bg-black/10",
    gptButton: "bg-red-600 hover:bg-white text-black",
    signInButton: "bg-red-600 text-black hover:bg-red-500 hover:text-white",
    signOutButton: "bg-red-600 text-black hover:bg-red-500 hover:text-white",
    avatarButton: "hover:bg-black/10",

    //footer
    footerBackground: "bg-gradient-to-r from-red-400 to-red-50",
    footerText: "text-gray-600",
    socialIcon: "hover:text-gray-900",
    disclaimerText: "text-gray-600",
    emphasisText: "text-gray-800",

    //Login
    pageBackground: "bg-gray-50",
    formBackground: "bg-white bg-opacity-90",
    headingText: "text-gray-900",
    inputText: "text-gray-900",
    inputBorder: "border-black",
    inputError: "border-red-500",
    errorText: "text-red-600 text-sm mt-1 mb-4",
    secondaryText: "text-gray-600",
    linkText: "text-blue-600",
  },

  //Secondary Container
  secondaryContainerBackground: "bg-gray-100",
  skeletonContainer: "bg-gray-200",
  skeletonCard: "bg-gray-300",
  skeletonElement: "bg-gray-400",
};

export const getThemeStyles = (mode) =>
  THEME_STYLES[mode] || THEME_STYLES.light;
