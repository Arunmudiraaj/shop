const bcrypt = require("bcryptjs");

async function passwordEncrypt(rawPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    // Hash the raw password using the generated salt
    const encryptedPassword = await bcrypt.hash(rawPassword, salt);
    return encryptedPassword;
  } catch (error) {
    throw error;
  }
}

module.exports = { passwordEncrypt };
