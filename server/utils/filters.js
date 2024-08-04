module.exports = user => {
    let filterUser = JSON.parse(JSON.stringify(user));
    delete filterUser['password'];
    delete filterUser['email'];
    return filterUser;
}