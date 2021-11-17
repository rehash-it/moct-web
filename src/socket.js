import socketIOClient from "socket.io-client"
import { server } from "./config/config"

export const webSocket = socketIOClient(server, { reconnection: true })
