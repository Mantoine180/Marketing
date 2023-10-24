const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.header('Authorization');
  console.log('Token :', token);
  if (!token) {
    console.log('Accès non autorisé');
    return res.status(401).json({ error: 'Accès non autorisé' });
  }
  
  // Supprimez le préfixe "Bearer " du token
const tokenWithoutBearer = token.replace('Bearer ', '');

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, user) => {
    //console.log('Token :', process.env.JWT_SECRET);
    if (err) {
      console.log('Erreur de vérification du token');
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
}

module.exports = verifyJWT;
