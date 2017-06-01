let SERVER_URL = 'ws://localhost:3000/websocket';
if (process.env.NODE_ENV === 'production') {
    SERVER_URL = 'ws://real_server:3000/websocket';
}

export const settings = {
    env: process.env.NODE_ENV,
    SERVER_URL,
};

export default settings;