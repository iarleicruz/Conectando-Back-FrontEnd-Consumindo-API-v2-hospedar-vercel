const express = require ('express')
const cors = require ('cors')
const path = require('path')
const port = process.env.PORT || 5000
// import { PrismaClient } from "@prisma/client"
//import { PrismaClient } from './generated/prisma/index.js'
//   import { PrismaClient } from './generated/prisma'
// const { PrismaClient } = require('@prisma/client')
 //const { PrismaClient } = require('./generated/prisma/index.js')
 const { PrismaClient } = require('./generated/prisma')

 // Serve os arquivos estáticos da pasta 'build'
app.use(express.static(path.join(__dirname, './dist')))
// Para qualquer requisição não tratada, retorna o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
});

const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())
// const users = []

app.post('/usuarios', async (req, res) => {
  
   await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
            res.status(201).json(req.body)

})

app.get ('/usuarios', async (req, res) => {

    let users = []
    
    if(req.query) {
        users = await prisma.user.findMany({
            where: {
            email: req.query.email,
            name: req.query.name,
            age: req.query.age
            }
        })

    } else {
        users = await prisma.user.findMany()
    }
    

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {
 // console.log(req)
   await prisma.user.update({

    where: {
        id: req.params.id
    },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
            res.status(201).json(req.body)

 })


 app.delete('/usuarios/:id', async (req, res) => {
    
    await prisma.user.delete ({
        where: {
            id: req.params.id
        },
    })

    res.status(200).json({ message: "Usuário deletado com sucesso!"})
   
 })

app.listen(3000)