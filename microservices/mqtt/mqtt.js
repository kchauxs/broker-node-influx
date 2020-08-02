const mqtt = require('mqtt')
const controller = require('../../components/messages/controller');

// WebSocket connect url
const WebSocket_URL = 'ws://udlabrokeriot.tk:8083/mqtt' //localhost //conexion sin ssl 

// TCP/TLS connect url
//const TCP_URL = 'mqtt://localhost:1883'//11883	Puerto interno del protocolo MQTT / TCP, solo se utiliza para la conexión del cliente local
//const TCP_TLS_URL = 'mqtts://localhost:8883'


const options = {
    connectTimeout: 4000,

    // Authentication
    clientId: 'client_mqtt_nodejs_microserver',
    username: 'testemqx',
    password: 'publicamijo',

    keepalive: 60,
    clean: true,
}

module.exports = function client_mqtt() {

    const client = mqtt.connect(WebSocket_URL, options)

    // after connect
    client.on('connect', () => {
        //console.log('Connected to', WebSocket_URL)
        console.log('Connection to broker, Success')

        client.subscribe(['porvenir/#', 'idema/#'], (err) => {
            console.log(err || 'Subscribe Success')
        })

        /*
        client.publish('porvenir_1', 'Hello EMQ X from Node.js', (err) => {
            console.log(err || 'Publish Success')
        })
        */

    })

    // handle message event
    client.on('message', (topic, message) => {

        console.log('Received form', topic, ':', message.toString())
        process_msg(message);

        // disconnect
        //client.end()
    })

    function process_msg(message) {

        //---------------------------------
        //here, authentication code
        //---------------------------------

        let msg = message.toString()
        let sp = msg.split(",")

        c = {
            zone: sp[0],
            clientid: sp[1], 
            card: sp[2],
            temp: sp[3],
            occupation: sp[4],
        }

        controller.addMessageInflux(c.zone, c.clientid, c.card, c.temp, c.occupation)
            .then((fullMessage) => {
                //client.publish('porvenir_1', 'Ingresado', (err) => {//ojo entra en un bucle 
                console.log("AGREDADO! ->"+c.zone+"->"+c.clientid)
                //})
            })
            .catch(e => {
                //client.publish('porvenir_1', e, (err) => {

                //--------------------------
                //Almacenar en cache con Redis
                //--------------------------
                console.log(e || 'Publish Success')
                //})
            })
        // }
    }
}
