const User = require('../models/userModel')

exports.register = async function(req,res){

    try{
    const user = new User(req.body)
    await user.register()

    if(user.errors.length>0){
       res.json({ error: user.errors})
    
        return
    }

   
    res.status(200).json(user.user._id);

     return;
    } catch(e){
            console.log(e)
            return res.status(400).json({ error: e });
        }

}

exports.show = async function(req,res){

    try{
        
    const user = await User.buscaPorId(req.params.id)

    return res.status(200).json(user)

    }catch(e){
        console.log(err)
        return res.status(400).json({ error: err });
    }
       
}


