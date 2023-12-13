import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  commentAddValidation,
} from "./validations.js";
import { default as checkAuth } from "./utils/checkAuth.js";
import { PostController, UserController } from "./controllers/Controllers.js";
import handleValErrors from "./utils/handleValidationErrors.js";
import cors from "cors";
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("OK");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use("/uploads/", express.static("uploads"));
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/auth/login", loginValidation, handleValErrors, UserController.login);
app.post(
  "/auth/register",
  registerValidation,
  handleValErrors,
  UserController.register
);
app.get("/auth/user", checkAuth, UserController.getUser);

app.get("/tags", PostController.getTags);
app.get("/posts", PostController.getPosts);
app.get("/posts/:id", PostController.getPost);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValErrors,
  PostController.createPost
);
//comments
app.get("/comments", PostController.getComments);
app.post(
  "/comments",
  checkAuth,
  commentAddValidation,
  handleValErrors,
  PostController.createComment
);

app.delete("/posts/:id", checkAuth, PostController.deletePost);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValErrors,
  PostController.updatePost
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Success");
});
