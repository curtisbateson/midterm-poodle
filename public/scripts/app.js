module.exports = function generateRandomId() {
  var randomId = "";
  var alphaNumChar = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 10; i++) {
    randomId += alphaNumChar.charAt(Math.floor(Math.random() * alphaNumChar.length));
  };
  return randomId;
};
