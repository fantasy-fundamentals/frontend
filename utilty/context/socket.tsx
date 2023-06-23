import React from "react";

import { io, Socket } from "socket.io-client";
import defaultConfig from "../config";

export const socket = io(defaultConfig.Base_URL);

export const SocketContext = React.createContext(null);
