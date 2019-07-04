const express=require('express');
const router=express.Router();
const members=require('../Members');
const uuid =require('uuid');

router.get('/',(req,res)=>res.json(members));


router.get('/:id',(req,res)=>{
        var member_id=+req.params.id;
        console.log(member_id);
        var found=members.some(member=>member.id === member_id);
        console.log(found);  
        if(found){
            res.json(members.filter(member=>member.id === member_id));
        }else{
            res.status(400).json({ msg : `no record found for id ${member_id}`})
        }
})

router.post('/',(req,res)=>{
    const newMember ={
            id: uuid.v4(),
            name : req.body.name,
            email: req.body.email,
            status : req.body.status,
            phone : req.body.phone
        }   
        if(! req.body.name || !req.body.email){

            return  res.status(400).json({"msg":"please enter name or email"})
        }else{
            members.push(newMember);
            //res.json(members);
            res.redirect('/');
        }
});


router.post('/:id',(req,res)=>{
    var member_id=+req.params.id;
    console.log(member_id);
    var found=members.some(member=>member.id === member_id);
    console.log(found);  
    if(found){
        const updatedMember=req.body;
        members.forEach(member=>{
         
            if(member.id === updatedMember.id){
                member.name= updatedMember.name  ? updatedMember.name :member.name;
                member.email= updatedMember.email  ? updatedMember.email :member.email;
                member.phone= updatedMember.phone  ? updatedMember.phone :member.phone;
                member.status= updatedMember.status  ? updatedMember.status :member.status;
                res.json({"msg" : "udpated member","memberDetails":member})
            }

        })
      // res.json(members.filter(member=>member.id === member_id));
       // res.json(updatedMember);
   
   
    }else{
        res.status(400).json({ msg : `no record found for id ${member_id}`})
    }
})


router.delete('/:id',(req,res)=>{
    var member_id=+req.params.id;
    console.log(member_id);
    var found=members.some(member=>member.id === member_id);
    console.log(found);  
    if(found){
        res.json({msg :"member deleted",members: members.filter(member=>member.id !== member_id)});
    }else{
        res.status(400).json({ msg : `no record found for id ${member_id}`})
    }
})
  

module.exports=router;