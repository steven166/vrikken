
class UserService{

  constructor(userRepository){
    this.userRepository = userRepository;
  }

  getUser(username){
    return this.userRepository.getUser(username);
  }

}

module.exports.UserService = UserService;