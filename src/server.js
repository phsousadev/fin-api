const fs = require('node:fs')
const express = require('express')
const { generateId } = require('./utils/id')

const server = express()

server.use(express.json())

const database = {
  tables: [
    {
      name: 'accounts',
      data: []
    },
    {
      name: 'transactions',
      data: []
    }
  ]
}

const accountsDatabaseIndex = database.tables.findIndex((table) => table.name === 'accounts')

server.post('/accounts', (request, response) => {
  const body = request.body

  database.tables[accountsDatabaseIndex].data.push({
    id: generateId(),
    name: body.name,
    email: body.email,
    cpf: body.cpf,
    birthDate: new Date(body.birthDate),
    balance: 0
  })

  return response.status(201).send()
})

server.get('/accounts/:id', (request, response) => {
  const { id } = request.params

  const account = database.tables[accountsDatabaseIndex].data.find((account) => account.id.toString() === id)

  return response.json({ account })
})

server.get('/accounts', (request, response) => {
  return response.json({ accounts: database.tables[accountsDatabaseIndex].data })
})

server.delete('/accounts/:id', (request, response) => {
  const { id } = request.params

  const accountIndex = database.tables[accountsDatabaseIndex].data.findIndex((account) => account.id.toString() === id)

  database.tables[accountsDatabaseIndex].data.splice(accountIndex, 1)

  return response.status(204).send()
})

server.listen(3333, () => {
  console.log(`Server is running: http://localhost:3333`)
})