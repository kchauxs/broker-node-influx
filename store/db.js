
const db = require('mongoose');
 
db.set('useCreateIndex', true);
db.Promise = global.Promise;

async function connect(url,is) {
  
    await db.connect(url, {
        user:'nodeapi',
        pass:"hJ8SDYRGOlH",
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    if(is){
        console.log('[db-remote] Conectada con éxito!');
    }else{
        console.log('[db-local] Conectada con éxito!');
    }
}

module.exports = connect; 