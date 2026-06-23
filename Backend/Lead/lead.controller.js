import prisma from '../lib/prisma.js'


export const lesdCreate = async (req, res) => {
  const { name, email } = req.body;
  
  const user = prisma.Lead.findUnique({
     where: {
    email 
  },
  include: {
    post: true,
  },
  })

  if(user){
    return res.send({"success": false,  "message": "Lead already exist."})
  }
  try {
    const newUser = await prisma.Lead.create({
    data: {
      name: name,
      email: email
    }
  })

   res.send({"success": true,  "message": "Lead created successfully"})

  } catch (error) {
    console.log(error);
    
  }

}


export const getAll = async (req,res)=>{
    const alluser = await prisma.Lead.findMany({});
    res.send({alluser})
}


