const bcrypt = require('bcryptjs')

const helpers = {};

helpers.encryptPassword = async (password) =>{ //recibimos el password con (password)
    const salt = await bcrypt.genSalt(10); //Luego de recibir password generamos un patron, esto es necesario para que funcione el cifrado
    const hash =  await bcrypt.hash(password,salt); //Luego el damos la contraseña y el patron a bycriptjs para que cifre la contraseña
    return hash; //Luego devolvemos el cifrado
};

helpers.matchPassword = async (password, savedPassword) => { //Aqui comparamos que el password del usuario sea igual al del a base de datos
   try{
        return await  bcrypt.compare(password, savedPassword);
   } catch(e){
       console.log(e)
   }
};

module.exports  = helpers;