import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты!").isEmail(),
  body("password", "Минимум 5 символов").isLength({ min: 5 }),
  body("fullName", "Минимум 3 символов").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат почты!").isEmail(),
  body("passwordHash", "Минимум 5 символов").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Минимум 3 символов").isLength({ min: 3 }).isString(),
  body("text", "Минимум 10 символов").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат").optional().isArray(),
  body("imageUrl", "Неверная ссылка").optional().isString(),
];

export const commentAddValidation = [
  body("comment", "Напишите комментарий").isLength({ min: 1 }).isString(),
];
