export const host = import.meta.env.VITE_BACKEND_URL;

export const registerRoute = `${host}/api/auth/register`; 
export const loginRoute = `${host}/api/auth/login`;
export const addToCartRoute = `${host}/api/cart/addToCart`;
export const getItemsRoute = `${host}/api/cart/getItems`;
export const updateItemsRoute = `${host}/api/cart/updateItems`;