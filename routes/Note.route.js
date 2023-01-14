const express = require("express");
const noterouter = express.Router();
const  {noteSchema,NoteModel} = require("../models/Note.model")

// Create Notes
noterouter.get("/", async(req,res) => {
    const query = req.query
    try{
        const allNotes = await NoteModel.find(query)
        res.send(allNotes)
    }
    catch(err){
        console.log(err);
    }
})

// Add notes
noterouter.post("/create", async(req,res) => {
    const payload = req.body
    try{
        const newNotes = new NoteModel(payload);
        await newNotes.save();
        res.send("Note Created")

    }
    catch(err){
        console.log(err);
    }
})

// Update Note
noterouter.patch("/update/:id", async(req,res) => {
    const payload = req.body;
    const ID = req.params.id;
    const note = await NoteModel.find({"_id":ID});
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID
    try{
            if(userID_making_req !== userID_in_note){
               res.send({"msg":"You are not authorized"})
            }else {
                await NoteModel.findByIdAndUpdate({"_id":ID},payload);
                res.send("Updated")
            }
            
        }
    catch(err){
        console.log(err);
    }
    
})

//  Delete Note
noterouter.delete("/delete/:id", async(req,res) => {
    const ID = req.params.id;
    const note = await NoteModel.find({"_id":ID});
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID
    try{
            if(userID_making_req !== userID_in_note){
               res.send({"msg":"You are not authorized"})
            }else {
                await NoteModel.findByIdAndDelete({"_id":ID});
                res.send("Deleted")
            }
             
        }
    catch(err){
        console.log(err);
    }
})


module.exports = {noterouter}

// userid : 63c0ba8b9e2dd5929f80162b