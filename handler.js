var person = require('./person.js')




const {MongoClient} = require('mongodb');


var handle = {
    handler: async function(func, object) {
        
        const uri = "mongodb+srv://aparva:okthatis@cluster0.frn3v2g.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        try {
            await client.connect();
            return await func(client, object);
        

        } catch(e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

}

module.exports = handle;









