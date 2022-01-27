const Schtroumpfs = require('../models/Schtroumpfs');



exports.getOneSchtroumpf = (req, res, next) => {
  
  Schtroumpfs.findById(req.auth.userId).then(
    (schtroumpf) => {
      res.status(200).json(schtroumpf);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );


  
};

exports.getOne = (req, res, next) => {
  
  Schtroumpfs.findOne({ email: req.body.email }).then(
    (schtroumpf) => {
      res.status(200).json({
        friend: schtroumpf._id,
        username: schtroumpf.name,
        email: schtroumpf.email,
        role: schtroumpf.role,
        
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );


  
};


exports.modifySchtroumpf = (req, res, next) => {

  

  Schtroumpfs.findByIdAndUpdate( req.auth.userId , { _id: req.auth.userId , ...req.body }).then(
    
    () => {
      res.status(201).json({
        message: 'Sctroumpf updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.deleteFriend = (req, res, next) => {
  Schtroumpfs.findById(req.params.friendid).then(

    (friend) => {


      Schtroumpfs.findByIdAndUpdate(req.auth.userId, {  $pull: { friends: {id: friend.id ,name: friend.name , role: friend.role} } }).then(
        () => {
          res.status(201).json({
            message: 'friends list updated successfully!'  + friend
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
     
      
      
    }
  );




  
};



exports.addFriend = (req, res, next) => {
   
  
  
 
  Schtroumpfs.findById(req.params.friendid).then(

    (friend) => {


      Schtroumpfs.findByIdAndUpdate(req.auth.userId, {  $push: { friends: {id: friend.id ,name: friend.name , role: friend.role} } }).then(
        () => {
          res.status(201).json({
            message: 'friends list updated successfully!'  + friend
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
     
      
      
    }

  );
  
  
 
};





exports.getAllSchtroumpf = (req, res, next) => {
  Schtroumpfs.find().then(
    (schtroumpf) => {
      res.status(200).json(schtroumpf);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};