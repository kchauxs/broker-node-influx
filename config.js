module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 6600,
    },
    socket: {
        port_socket: process.env.API_PORT_SOCKET|| 6601,
    },
    mqtt: {
        port_mqtt: process.env.API_PORT_MQTT || 6602,
    },
    jwt: {
        secret: process.env.JWT_SECRET || '',
        token: process.env.JWT_TOKEN
    },
    mongo: {
        host: process.env.MONGO_SRV_HOST || '',
        database: process.env.MONGO_SRV_DB || 'mqtt',
    },
    mongoService: { 
        host: process.env.MONGO_HOST || '',
        user: process.env.MONGO_USER || '',
        password: process.env.MONGO_PASS || '',
        database: process.env.MONGO_DB || 'udladb',
    } ,
    emqApi: {
        host: process.env.EMQX_HOST || '',
        user: process.env.EMQX_USER || ''
    }

} 
