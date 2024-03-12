const { User } = require("../../models/user");
const zod = require("zod");

const loginBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

 async function login(req,res) {
         const { success } = loginBody.safeParse(req.body)
        const  {username,password}=req.body;
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }
        try{
            const user=await User.findOne({ username,password});
            if(user){
                res.status(200).json({
                    message: "login successful"
                })
            }else {
                res.status(401).json({
                    message : "Invalid username and password"
                })
            }

        }catch (err) {
               res.status(500).send("Internal Server Error")
        }
}

module.exports=login;