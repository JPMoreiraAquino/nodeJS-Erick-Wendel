//npm i hapi
const Hapi = require('hapi')
const { mongo } = require('mongoose')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongoDbStrategy')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroSchema')
const app = new Hapi.Server({
    port: 5000
})

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))
    app.route([{
        path: '/herois',
        method: 'GET',
        handler: (request, Head) => {
            return context.read()

        }
    }])
    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
}

main()