import jwt from 'jsonwebtoken';

export const createToken = (customer, secret, expiresIn) =>{
  const {
    _id,
    Name,
    Lastname,
    Age,
    Phonenumber,
    Email,
    city,
  } = customer || {};

  return jwt.sign(
    {
      _id,
      Name,
      Lastname,
      Age,
      Phonenumber,
      Email,
      city,
    },
    secret,
    { expiresIn},
  );
};

export const getCustomerFromToken = (req) =>{
  const token = req.headers.authorization || null;
  if (token){
    try {
      const customeerToken = jwt.verify(
        token.replace('Bearer', ''),
        process.env.JWT_SECRET,
      );
      return customeerToken;
    } catch (error) {
      console.log(`problemas en el getCustomerFromToken revisar -  token false - ${error}`);
    }
  }
}
