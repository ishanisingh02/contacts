const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts =asyncHandler( async (req,res)=>{//to get all contacts
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);//sends json and a status response
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContact =asyncHandler( async  (req,res)=>{//to create new contact
    console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact=await Contact.create({
        name,email,phone,user_id:req.user.id
    })
    res.status(201).json(contact);//sends json and a status response
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact =asyncHandler( async (req,res)=>{//to get singular contact
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);//sends json and a status response
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact =asyncHandler( async (req,res)=>{//to update some contact info
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update pther user contacts");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {new:true});
    res.status(200).json(updatedContact);//sends json and a status response
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    // Find and delete the contact by id
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    // If contact not found, throw an error
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    // Send a success response with the deleted contact details
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update pther user contacts");
    }
    res.status(200).json(contact);
}); 

//code is 201 for creating stuff
module.exports= {getContacts,createContact,getContact,updateContact,deleteContact};
  