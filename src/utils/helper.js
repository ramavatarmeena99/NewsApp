export const setValueInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValueFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeValueFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
