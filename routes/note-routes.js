var router = require('express').Router();
var Note = require('../models/note');

// READ all notes
router.get('/', function(req, res){
  Note.find().sort({updated_at: 'desc'}).then(function(notes){
    res.json(notes);
  });
});

// Read One Note
router.get('/:id', function(req, res){
  Note.findOne({
    _id: req.params.id
  }).then(function(note){
    res.json(note);
  });
});

// CREATE a note
router.post('/', function(req, res) {
  var note = new Note({
    title: req.body.note.title,
    body_html: req.body.note.body_html
  });

  note
    .save()
    .then(function(noteData) {
      res.json({
        message: 'Successfully created note',
        note: noteData
      });
    });
});

// Update a Note
router.put('/:id', function(req, res) {
  Note.findOne({
    _id: req.params.id
  }).then(function(note) {
    note.title = req.body.note.title;
    note.body_html = req.body.note.body_html;
    note
      .save()
      .then(
        function(){
          res.json({
            message: 'Your changes have been saved.',
            note: note
          });
        },
      function(result) {
        res.json({ message: 'Aww, cuss!' });
      });
  },
  function(result) {
    res.json({ message: 'Aww, cuss!' });
  });
});


router.delete('/:id', function(req, res) {
  Note.findOne({
    _id: req.params.id
  }).then(function(note) {
    note.remove().then(function() {
      res.json({
        message: 'That note has been deleted.',
        note: note
      })
    });
  });
});

module.exports = router;
