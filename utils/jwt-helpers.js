import jwt from 'jsonwebtoken';

//Generate an access token and a refresh token for this database user
function jwtTokens(emailid) {
  console.log("Recieved Email ID - ", emailid)
  const user = { "emailid": emailid };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10hr' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10hr' });
  return ({ accessToken, refreshToken });
}

export {jwtTokens};