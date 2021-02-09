const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    instagram: { type: String, required: false},
    whatsapp: { type: String, required: true },
});

const userModel = mongoose.model('user', userSchema)

function user(body){
    this.body = body
    this.errors = []
    this.user = null
}

user.buscaPorId = async function(id){
    if(typeof id!=='string') return
    const user = await userModel.findById(id)
    return user
}


user.buscaUser = async function(){
    
    const user= await userModel.find().sort({ nome:1 })
    return user
}

 user.userExists = async function(){
    const user = await UserModel.findOne({ email: this.body.email})
     if(user) this.errors.push('Usuário já cadastrado')
 }


user.prototype.register = async function(){
    this.valida()
    if(this.errors.length>0) return;

   // await this.userExists()

    if(this.errors.length > 0) return;

    this.user = await userModel.create(this.body)

}


user.prototype.edit = async function(id){
    if(typeof id !== 'string') return;
    this.valida()
    if(this.errors.length>0) return;
    this.user = await userModel.findByIdAndUpdate(id, this.body, { new:true })
    
}


user.prototype.valida = function(){
    this.cleanUp()
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('email inválido')
    if(!this.body.nome) this.errors.push('Nome é campo obrigatorio')
    if(!this.body.email && !this.body.telefone) this.errors.push('Você precisa pelo menos do telefone ou email do user')
  
}

user.prototype.cleanUp = function(){
    for(const key in this.body){
       if (typeof this.body[key] !== 'string'){
           this.body[key] = ''
       }
    }
    this.body={
       nome: this.body.nome,
       email: this.body.email,
       instagram: this.body.instagram,
       whatsapp: this.body.whatsapp
    }
}


module.exports = user;
