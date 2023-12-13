import PostModel from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const doc = await new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    res.status("500").json({
      message: "Не удалось создать статью!",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    let posts = [];
    const { sort, filter } = req.query;

    posts = await PostModel.find()
      .populate("user")
      .populate("comments.user")
      .exec();

    switch (sort) {
      case "createdAt":
        posts = await PostModel.find({})
          .populate("user")
          .sort({ createdAt: -1 })
          .exec();

        break;
      case "viewsCount":
        posts = await PostModel.find({})
          .sort({ viewsCount: -1 })
          .populate("user")
          .exec();

        break;

      default:
        break;
    }
    if (filter) {
      if (posts) posts = posts.filter((obj) => obj.tags.includes(filter));
      posts.map((obj) => console.log(obj.tags));
    }

    res.json(posts);
  } catch (err) {
    res.status("500").json({
      message: err.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
      .populate("user")
      .populate("comments.user")
      .exec();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status("500").json({
      message: "Не удалось получить статью!",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({ _id: postId }).exec();
    res.json(post);
  } catch {
    res.status("500").json({
      message: "Не удалось получить статью!",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    ).exec();

    res.json(post);
  } catch {
    res.status("500").json({
      message: "Не удалось получить статью!",
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit().exec();

    const tags = await posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 4);
    res.json(tags);
  } catch (err) {
    res.status("500").json({
      message: "Не удалось получить тэги!",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("comments.user")
      .limit()
      .exec();

    const comments = await posts
      .map((obj) => obj.comments)
      .flat()
      .slice(0, 3);

    res.json(comments);
  } catch (err) {
    res.status("500").json({
      message: err.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.body.id;
    const userId = req.userId;
    const comment = req.body.comment;
    const post = await PostModel.updateOne(
      { _id: postId },
      {
        $push: { comments: { user: userId, comment: comment } },
        $inc: { countComments: 1 },
      },

      {
        returnDocument: "after",
      }
    ).exec();
    res.json(post);
  } catch (err) {
    res.status("500").json({
      message: "",
    });
  }
};
