export default {
  Uppercase: RegExp(/^(?=.*?[A-Z])/),
  Lowercase: RegExp(/(?=.*?[a-z])/),
  Number: RegExp(/(?=.*?[0-9])/),
  specialCharacter: RegExp(/(?=.*?[#?!@$%^&*-])/),
  minimumNumber: RegExp(/.{8,15}/),
};
