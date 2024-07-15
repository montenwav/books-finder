export const handleClear = () => {
  localStorage.setItem('category', '');
  localStorage.setItem('sortKey', '');
  localStorage.setItem('sortBy', 'recommendations');
  localStorage.setItem('activePage', '1');
  localStorage.setItem('perPage', '12');
};
