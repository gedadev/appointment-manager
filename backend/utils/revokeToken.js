async function revokeToken(token) {
  token.revoked = true;
  await token.save();
  return token;
}

module.exports = revokeToken;
