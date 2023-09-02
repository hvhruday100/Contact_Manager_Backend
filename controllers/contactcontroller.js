const asynHandler = require("express-async-handler");
const contact = require("../models/contactmodel");
//@desc Get all contacts
//route GET/api/contacts
//access private

const getContacts = asynHandler(async(req,res)=>{
    const contacts = await contact.find({user_id : req.user.id});
    res.status(200).json( contacts);
});

//@desc create new  contacts
//route POST/api/contacts
//access private

const createContact = asynHandler(async(req,res)=>{
    console.log("the requested body is ",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("all fields are manidatory !");
    }

    const contacty = await contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
        });
    res.status(201).json(contacty);
}); 

//@desc get  contact
//route POST/api/contacts/:id
//access private

const getContact =asynHandler(async(req,res)=>{
    const contacty2 = await contact.findById(req.params.id);
    if(!contacty2)
    {
        res.status(404);
        throw new Error("Contacts Not Found"); 
    }
    res.status(200).json( contacty2);
});

//@desc update contact  contacts
//route PUT/api/contacts/:id
//access private

const updateContact = asynHandler(async(req,res)=>{
    const contacty2 = await contact.findById(req.params.id);
    if(!contacty2)
    {
        res.status(404);
        throw new Error("Contacts Not Found"); 
    }
    //error coming down
    if (contacty2.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }
    const updatedcontact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );

    res.status(200).json(updatedcontact);
});

//@desc delete new  contacts
//route POST/api/contacts/:idl
//access private

const deleteContact = asynHandler(async(req,res)=>{
    const contacty3 = await contact.findById(req.params.id);
    if(!contacty3)
    {
        res.status(404);
        throw new Error("Contacts Not Found"); 
    }
    if(contacty3.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    await contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contacty3);
    /*try{
        // await contact.remove();
        // res.status(200).json(contacty3); 
        await contact.deleteOne({id:req.body.id});
        res.status(200).json({'msg':"delete successfull"});
    }
    catch(err){
        console.log(err);
        res.status(404).json("failed to delete");
    }*/
});

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};