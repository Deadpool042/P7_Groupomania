module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

module.exports.signUpErrors = (err) => {
  let errors = { email: "", password: "", lastName: "", firstName: "" };
  // console.log(err.errors.map((err) => err.path));
  const pathError = err.errors.map((err) => err.path);

  if (pathError.includes("lastName")) errors.lastName = "Champ requis";
  if (pathError.includes("firstName")) errors.firstName = "Champ requis";
  if (pathError.includes("email"))
    errors.email = "Adresse email incorrect ou déjà enregistrée";
  if (pathError.includes("password"))
    errors.password = "Le mot de passe doit être en 6 et 20 caractères";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};
