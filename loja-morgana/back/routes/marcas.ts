import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const marcas = await prisma.marca.findMany()
    res.status(200).json(marcas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha  ) {
    res.status(400).json({ "erro": "Informe o nome da data" })
    return
  }

  try {
    const marca = await prisma.marca.create({
      data: { nome }
    })
    res.status(201).json(marca)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const marca = await prisma.marca.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(marca)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha ) {
    res.status(400).json({ "erro": "Informe o nome da marca" })
    return
  }

  try {
    const marca = await prisma.marca.update({
      where: { id: Number(id) },
      data: { nome }
    })
    res.status(200).json(marca)
  } catch (error) {
    res.status(400).json(error)
  }
})


export default router