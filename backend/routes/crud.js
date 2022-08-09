const fetchusers = require("../middleware/fetchuser");
const Notes = require('../models/Notes');
const router = require("./auth");
const {body,validationResult} = require("express-validator");

router.get('/fetchalldata',fetchusers,async (req,res) =>{
    try {
        const data = await Notes.find({user:req.user.id});
        res.json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add',fetchusers,[
    body('title','Enter a valid title').isLength({min:3}),
    body('body','Description must be atleast 5 characters').isLength({min:5})
],async (req,res) =>{
    try{
        const {title,body} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const note = new Notes({
            title,
            body,
            user:req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(error){
        console.log(error.message);
        res.status(500).send('Internal Error message');
    }
})
router.delete('/delete/:id',fetchusers,async (req,res) =>{
    try {
        console.log('id',req.params.id); 
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send('Not Found');
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send('Not Allowed');
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({'Success':'Deleted',note:note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})
router.put('/update/:id',fetchusers,async (req,res) =>{
    try {
        const {title,body} = req.body;
        const newNote = {};
        if(title){
            newNote.title = title;
        }
        if(body){
            newNote.body = body;
        }
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not Found');
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router;