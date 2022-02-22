const { Posts, Comments, Likes, sequelize } = require("../models");
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");

const pipeline = promisify(require("stream").pipeline);

exports.getAllPosts = async (req, res) => {
  const posts = await Posts.findAll({
    include: [Comments, Likes],
  });
  res.status(200).send(posts);
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.UserId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );

    await Posts.create({
      UserId: req.body.UserId,
      postText: req.body.postText,
      picture: req.file !== null ? "./uploads/posts/" + fileName : "",
      video: req.body.video,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
    })
      .then(() =>
        res.status(201).json({ message: "Post crée avec multimédia" })
      )
      .catch((err) => res.status(400).json({ err: "marche pas" }));
  } else {
    await Posts.create({
      UserId: req.body.UserId,
      postText: req.body.postText,
      video: req.body.video,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
    })
      .then(() =>
        res.status(201).json({ message: "Post crée sans multimédia" })
      )
      .catch((err) => res.status(400).json({ err: err }));
  }
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const modifyPost = await Posts.update(
      { postText: req.body.postText },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ postText: req.body.postText });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
};

module.exports.likePost = async (req, res) => {
  const { PostId } = req.params.id;
  const { UserId } = req.body;

  const like = await Likes.create({
    PostId: req.params.id,
    UserId: UserId,
  });
  res.status(201).send(like);
};

module.exports.unlikePost = async (req, res) => {
  const { UserId } = req.body;
  const PostId = req.params.id;
  try {
    const unlike = await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.status(200).send({ unlike });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.commentPost = async (req, res) => {
  const foundPost = await Posts.findByPk(req.params.id);
  if (!foundPost) return res.status(400).send("Id Inconnu :" + req.params.id);

  try {
    const { firstName, lastName, commentBody } = req.body;
    const PostId = req.params.id;
    Comments.create({ ...req.body, PostId });
    res.status(201).json(req.body);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  const foundPost = await Comments.findByPk(req.params.id);
  if (!foundPost) return res.status(400).send("Id Inconnu :" + req.params.id);

  const id = req.params.id;
  try {
    Comments.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
          UserId: req.body.UserId,
          PostId: req.body.PostId,
        },
      }
    );
    console.log(req.body.PostId);
    res.status(200).json({ comment: req.body });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteCommentPost = async (req, res) => {
  const foundComment = await Comments.findByPk(req.params.id);
  if (!foundComment) {
    return res.status(400).send("Id Inconnu :" + req.params.id);
  } else {
    Comments.destroy({ where: { id: req.params.id } });
  }
  res.status(200).json("Commentaire supprimé");
};
