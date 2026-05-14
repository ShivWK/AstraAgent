const themeResolver = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (mediaQuery.matches) {
    return 'dark';
  } else {
    return 'light';
  }
};

export default themeResolver;
