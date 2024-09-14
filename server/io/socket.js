let ioInstance;

function setIo(io){
    if(!ioInstance) ioInstance = io;
}

function getIo() {
    return ioInstance;
}

module.exports = {
    setIo,
    getIo,
    ioInstance
}