
const mongo = require('./db')

function mongodb(config) {

    if (config.remoteDB === true) {

        mongo('mongodb+srv://'+config.mongoService.user+':'+config.mongoService.password+'@'+config.mongoService.host+'/'+config.mongoService.database,true)
        
    } else {

        mongo('mongodb://'+config.mongo.host+'/'+config.mongo.database,false)

    }     
 
} 


/*


const influx = new Influx.InfluxDB({
    host: 'udlabrokeriot.tk',
    database: 'mydb',
    precision: 'rfc3339',
    schema: [
        {
            measurement: ['userdata', 'nodemcu'],
            fields: {
                toggle_red: Influx.FieldType.INTEGER,
                toggle_green: Influx.FieldType.INTEGER,
                gauge: Influx.FieldType.INTEGER,
                slider: Influx.FieldType.INTEGER,
                line_chart: Influx.FieldType.INTEGER,
            },
            tags: [
                'email',
                'password'
            ]
        }
    ]
});


influx.getDatabaseNames()
    .then(names => {
        
        console.log(names ,'[db-remote] Conectada con éxito!');
    })
    .catch(err => {
        console.error(err,`Error creating Influx database!`);
    })

//module.exports = influx;


*/

const Influx = require('influx');

const influx = new Influx.InfluxDB({
    host: 'udlabrokeriot.tk',
    database: 'mydb',
    precision: 'rfc3339',
    username: 'kchaux',
    password: '4pr3ndek009',
    /*
    schema: [
        {
            measurement: ['userdata', 'nodemcu'],
            fields: {
                toggle_red: Influx.FieldType.INTEGER,
                toggle_green: Influx.FieldType.INTEGER,
                gauge: Influx.FieldType.INTEGER,
                slider: Influx.FieldType.INTEGER,
                line_chart: Influx.FieldType.INTEGER,
            },
            tags: [
                'email',
                'password'
            ]
        }
    ]*/
});


const influx_sensors = new Influx.InfluxDB({
    //protocol: "https",
    host: 'udlabrokeriot.tk',
    database: 'udladb',
    precision: 'rfc3339',
    username: 'nodeuser',
    password: 'udlacafe23',
    schema: [
        {
            measurement: ['messages'],
            fields: {

                identification: Influx.FieldType.STRING,
                temp: Influx.FieldType.FLOAT,

            },
            tags: [
                'zone',  
                'occupation',
                'device'
            ]
        }
    ]
});

module.exports = {
    influx,
    influx_sensors,
    Influx,
    mongodb
};