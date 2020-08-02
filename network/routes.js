const zones = require('../components/zones/network')
const messages = require('../components/messages/network')
const users = require('../components/user/network')
const auths = require('../components/auth/network')
//const covid = require('../components/covid/network')
const emqx = require('../components/emqx/network')
const device = require('../components/devices/network')

const routes = function (server) {
    server.use('/zones', zones)
    server.use('/messages', messages)
    server.use('/users', users)
    server.use('/auth', auths)
   // server.use('/covid', covid)
    server.use('/api', emqx)
    server.use('/devices', device)
}

module.exports = routes;