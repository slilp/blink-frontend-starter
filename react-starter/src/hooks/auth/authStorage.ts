const ACCESS_TOKEN = "access_token";

export const setAuth = (value: string) =>
  localStorage.setItem(ACCESS_TOKEN, value);
export const getAuth = () => localStorage.getItem(ACCESS_TOKEN);
export const removeAuth = () => localStorage.removeItem(ACCESS_TOKEN);
