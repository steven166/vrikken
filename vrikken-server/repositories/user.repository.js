var fs = require("fs");
var path = require("path");
var mkdirp = require('mkdirp');

const dataDir = path.join(__dirname, '../data/users/');
mkdirp.sync(dataDir);

class UserRepository{

  getUser(username){
    let file = path.join(dataDir, username + '.json');
    if(fs.existsSync(file)){
      let buffer = fs.readFileSync(file);
      return JSON.parse(buffer);
    }else{
      let user = {
        username: username
      };
      fs.writeFileSync(file, JSON.stringify(user));
      return user;
    }
  }

}

module.exports.UserRepository = UserRepository;