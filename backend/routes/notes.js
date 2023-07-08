const express = require('express');
const fetchuser = require('../middlewear/fetchuser');
const { body, validationResult} = require('express-validator');
const Notes = require('../models/Notes')
const router = express.Router();


// Route 1 fetch all nots 'localhost:5000/api/notes/fetchusernotes' And login required
router.get('/fetchusernotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.massage);
        res.status(500).send({
            error: 'Internal Error Occured'
        });
    }
})

// Route 2 add notes 'localhost:5000/api/notes/addnote' And login required
router.post('/addnote', fetchuser, [
    body('title', "Title should be min 3 character").isLength({ min: 3 }),
    body('description', "Description should be min 5 character").isLength({min: 5})
], async (req, res) => {
    try {
        // if there is bad request or error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const note = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            user: req.user.id
        })
        const saveNote = await note.save()
        res.send(saveNote);
        console.log(saveNote)
    } catch (error) {
        console.error(error.massage);
        res.status(500).send({
            error: 'Internal Error Occured'
        });
    }

})

// Route 3 update note 'localhost:5000/api/notes/updatenote/:id' And login required
router.put('/updatenote/:id', fetchuser, async (req,res) => {
       try {
        const {title, description, tags} = req.body;
        // create newNote object
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tags){newNote.tags = tags}

        // find the note to be update and update it
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(401).send("Not Found")
        }
        // note.user means user.id
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
       } catch (error) {
        console.error(error.massage);
         res.status(500).send({
        error: 'Internal Error Occured'
    })
       }
})

// Route 4 delete note 'localhost:5000/api/notes/deletenote/:id' And login required
router.delete('/deletenote/:id', fetchuser, async (req,res) => {
  try {
        // find the note to be delete and delete it
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(401).send("Not Found")
        }
        // note.user means user.id
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }
        
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({Success: `${note.id} has been deleted successfully`})
  } catch (error) {
    console.error(error.massage);
    res.status(500).send({
        error: 'Internal Error Occured'
    })
  }
})

module.exports = router;