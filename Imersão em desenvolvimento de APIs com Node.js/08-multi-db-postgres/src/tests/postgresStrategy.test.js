const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const ConText = require('../db/strategies/base/contextStrategy')

const context = new ConText(new Postgres())
const MOCK_HEROI_CADASTRA = {
    nome: 'Gaviao Negro',
    poder: 'Flexas'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Batman',
    poder: 'Money'
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        await context.connect()
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRA)
        delete result.id

        assert.deepEqual(result, MOCK_HEROI_CADASTRA)
    })

    it('listar', async () => {
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRA.nome})
        delete result.id
        
        assert.deepEqual(result, MOCK_HEROI_CADASTRA)
    })
    it('atualizar', async () => {
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const newItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update(itemAtualizar.id, newItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, newItem.nome)
    })
    it('remover por id', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})
