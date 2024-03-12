const { User } = require("../../models/user");
const zod = require("zod");

const signinBody = zod.object({
   username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string()
})

 async function signin(req,res) {
   const { success } = signinBody.safeParse(req.body);
   if(!success){
      return res.status(411).json({
         message: "Email already taken / Incorrect inputs"
     })
   }
   const existingUser = await User.findOne({
      username: req.body.username
  })

  if (existingUser) {
      return res.status(411).json({
          message: "Email already taken/Incorrect inputs"
      })
  }
    await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstName,
    lastname: req.body.lastName,
     });
     res.status(201).json({
        message : "Your user account is successfully signed up ! login to your acccount to borrrow or return book"
      });
    }
module.exports=signin