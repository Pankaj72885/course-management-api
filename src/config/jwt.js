/**  === DEBUG LOG ===
console.log(
  "DEBUG in jwt.js: process.env.JWT_SECRET =",
  process.env.JWT_SECRET
);
*/

export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpire = process.env.JWT_EXPIRE;
