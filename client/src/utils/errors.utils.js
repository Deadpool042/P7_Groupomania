module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

module.exports.signUpErrors = (err) => {
  let errors = { email: "", password: "", lastName: "", firstName: "" };

  if (err.data.includes("Champ requis")) errors.email = "Champ requis";
  if (err.data.includes("Champ requis")) errors.email = "Champ requis";

  if (err.data.includes("Veuillez renseigner une adresse mail valide"))
    errors.email = "Veuillez renseigner une adresse mail valide";
  if (err.data.includes("Veuillez renseigner une adresse mail"))
    errors.email = "Veuillez renseigner une adresse mail";

  if (err.data.includes("Veuillez renseigner un mot de passe"))
    errors.password = "Veuillez renseigner un mot de passe";

  if (err.data.includes("Le mot de passe doit être en 6 et 20 caractères"))
    errors.password = "Le mot de passe doit être en 6 et 20 caractères";

  return errors;
};
