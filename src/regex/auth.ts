/* eslint-disable unicorn/better-regex */
export const phoneRegex = /^$|^(84|0[357-9|])+(\d{8})\b/g;
export const usernameRegex = /^[a-zA-Z0-9]+$/;
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/;
