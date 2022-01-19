const jwt = require("jsonwebtoken");
const Schtroumpfs = require("../models/Schtroumpfs");
const config = require("../config/auth.config");
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then( (hash) => {
        const user = new Schtroumpfs({
          email: req.body.email,
          password: hash,
          role: req.body.role,
          name: req.body.name
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error: "bonjour"+ error }));
  };



  exports.login = (req, res, next) => {
    Schtroumpfs.findOne({ email: req.body.email })
      .then(schtroumpfs => {
        if (!schtroumpfs) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, schtroumpfs.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: schtroumpfs._id,
              username: schtroumpfs.name,
              email: schtroumpfs.email,
              role: schtroumpfs.role,
              token: jwt.sign(
                { userId: schtroumpfs._id },
                config.secret.secret,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error: "bonjour" + error }));
  };