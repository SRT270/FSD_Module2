function registeruser() {
    console.log("User is registered");
}
function newuser() {
    console.log("User does not exist, need to register");
}
module.exports = {
    registeruser: registeruser,
    newuser: newuser
}
