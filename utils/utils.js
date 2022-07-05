require("js-cookie");
const jwt = require("jsonwebtoken");

const encodeHTML = (str) => {
  let buf = [];

  for (var i = str.length - 1; i >= 0; i--) {
    buf.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
  }

  return buf.join("");
};
const decodeHTML = (str) => {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

module.exports = {
  encodeHTML,
  decodeHTML,
};
