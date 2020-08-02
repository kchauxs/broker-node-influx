const zonescontroller = require('../../components/zones/controller')
const messagecontroller = require('../../components/messages/controller')

function count_by_devices(server) {
  setInterval(async function () {
    messagecontroller.countbyalldevices()
      .then(res => {
        //console.log(res)
        server.socket.io.emit('quantity_per_device', res)
      })
  }, 5000)
}

function count_by_zones(server) {
  messagecontroller.countbyallzones()
    .then(res => {
      //console.log(res)
      server.socket.io.emit('quantity_per_zone', res)
      setInterval(async function () {
        messagecontroller.countbyallzones()
          .then(res => {
            //console.log(res)
            server.socket.io.emit('quantity_per_zone', res)
          })
      }, 5000)
    })
}

function list_zones(server) {
  setInterval(function () {
    zonescontroller.listZones()
      .then(data => {
        server.socket.io.emit('zones', data)
        //console.log(data)
        //console.log('-----------------------------------------')
      })
  }, 2000)
}


module.exports = {
  count_by_zones,
  list_zones,
  count_by_devices
}

