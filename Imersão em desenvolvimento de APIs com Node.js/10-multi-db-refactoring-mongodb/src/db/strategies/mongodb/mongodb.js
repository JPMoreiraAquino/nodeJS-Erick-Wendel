const ICrud = require('../interfaces/interfaceCrud')

const Mongoose = require('mongoose')
const STATUS = {
0: 'Disconectado',
1: 'Conectado',
2: 'Conectando',
3: 'Disconectando',
}


class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection 
    }
    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }

    

    static connect() {
        Mongoose.connect('mongodb://JPMoreira:batata123@localhost:27017/herois', {
            useNewUrlParser: true
        }, (err) => {
            if (!err) return;
            console.log('Falha na conexão!', err)

        })

        const connection = Mongoose.connection
        
        connection.once('open', () =>  {console.log('Database Rodando!!!')})
        return connection
    }

    create(item) {
        return this._schema.create(item)
    }

    read(item, skip=0, limit=10) {
        return this._schema.find(item).skip(skip).limit(limit)
        // return this._schema.count()
    }

    update(id, item) {
        return this._schema.updateOne({_id: id}, {$set: item})
    }

    delete(id) {
        return this._schema.deleteOne({ _id: id})
    }


}

module.exports = MongoDB