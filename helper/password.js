const bcrypt = require('bcrypt');

hasshingPass = (password) =>{
    return bcrypt.hashSync(password,10)
}

checkPass = (password,dbPassword)=>{
    return bcrypt.compareSync(password,dbPassword)
}

module.exports = {
    hasshingPass,
    checkPass
}