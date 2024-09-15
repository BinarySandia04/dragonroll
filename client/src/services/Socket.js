import { io } from "socket.io-client";

import { backendUrl } from './BackendURL';
const socket = io(backendUrl);

export {
    socket
}