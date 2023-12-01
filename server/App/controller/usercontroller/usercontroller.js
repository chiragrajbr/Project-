const user=require("../../model/user/user")
const bycrpt=require("bcrypt")
const jwt=require("jsonwebtoken")
const usercontroller={}

usercontroller.register=(req,res)=>{
    const body=req.body
    const newUser=new user(body)
    bycrpt.genSalt()
         .then((salt)=>{
            bycrpt.hash(newUser.password,salt)
            .then((encrypted)=>{
                newUser.password=encrypted
                newUser.save()
                         .then((data)=>{res.json(data)})
                          .catch((err)=>{res.json({"error":err.message})})

            })
            .catch((err)=>{
                res.json({"err":err.message})
            })
         })
}

usercontroller.login=((req,res)=>{
    const body=req.body
    user.findOne({email:body.email})
      .then(async(user)=>{
        const verifypass=await bycrpt.compare(body.password,user.password)
        if(!verifypass){
            res.json({"error":"incorrect password/email not match"})   
        }
        else{
            const token={
                user_Id:user.id,
                username:user.userName,
                email:user.email
            }
            const gentoken=jwt.sign(token,"C123")
            res.send({
                "token":gentoken
            })
        }
      })
      .catch((e)=>{
        res.status(401).json({
            "error":e.message
        })
      })
}) 
module.exports=usercontroller