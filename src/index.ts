
/*
Here’s a quick breakdown of the code:

-You import PrismaClient and express from the respective npm packages.
-You instantiate PrismaClient by calling the constructor and obtaining an instance called prisma.
-You create your Express app by calling express().
-You add the express.json() middleware to ensure JSON data can be processed properly by Express.
-You start the server on port 3000.
*/

import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/feed', async (req, res) => {
  const posts = await prisma.order.findMany({
    include: { customer: true }
  })
  res.json(posts)
})

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.user.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)

/* 
Here’s a quick breakdown of the boilerplate:

You import the PrismaClient constructor from the previously installed @prisma/client npm package.
You instantiate PrismaClient by calling the constructor and obtaining an instance called prisma.
You define an async function called main where you’ll add your Prisma Client queries.
You call the main function, catching any potential exceptions and ensuring Prisma Client closes any open 
database connections with prisma.$disconnect().
*/

/* async function main() {
  const newUser = await prisma.user.create({
    data: {
      username: 'Alice',
      email: 'alice@prisma.io',
      password: 'jj',
      }
  })
  console.log('Created new user: ', newUser)

  const allUsers = await prisma.user.findMany({
    include: { orders: true },
  })
  console.log('All users: ')
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect()) */