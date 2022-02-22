const { Users } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
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
  const fileName = req.body.id + ".jpg";

  await pipeline(
    req.file.stream,

    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );
  const userId = req.body.id;
  try {
    Users.update(
      {
        picture: "./uploads/profil/" + fileName,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.status(200).json("Image modifiée");
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
