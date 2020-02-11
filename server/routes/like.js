const express = require('express');
const router = express.Router();
const { Like } = require('../models/Dislike');
const { Dislike } = require('../middleware/auth');

const { auth } = require('../middleware/auth');

//Likes Dislike

router.post('getLikes', (req, res) => {
  let variable = {}
  if (req.body.videoId){
    variable = { videoId: req.body.videoId }
  } else{
    variable = { commentId: req.body.commentId }
  }

  Like.find(variable)
    .exec((err, likes) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes })
    })
});


router.post('/getDislikes', (req, res) => {
  let variable = {}
  if(req.body.videoId){
    variable = { videoId: req.body.videoId }
  } else {
    variable = { commentId: req.body.commentId }
  }
  Dislike.find(variable)
    .exec((err, dislikes) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes })
    })

})


router.post('/upLike', (req, res) => {
  let variable = {}
  if(req.body.videoId){
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: "" }
  }
  const like = new Like(variable)
  //save the link information data in mongoDB
  like.save((err, likeResult) => {
    if(err) return res.json({ success: false, err });
    Dislike.findOneAndDelete(variable)
      .exec((err, disLikeResult) => {
        if(err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true })
      })
  })
})

router.post('/unLike', (req,res) => {
  let variable = {}
  if(req.body.videoId){
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  Like.findOneAndDelete(variable)
    .exec((err, result) => {
      if(err) result res.status(400).json({ success: false, err })
      res.status(200).json({ success: true })
    })
})
