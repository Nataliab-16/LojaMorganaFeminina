import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const roupas = await prisma.roupa.findMany()
    res.status(200).json(roupas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, descricao, tamanho, cor, preco, estoque, foto, marcaId} = req.body

  if (!nome || !tamanho || !descricao || !cor || !preco || !estoque || !foto || !marcaId ) {
    res.status(400).json({ "erro": "Informe nome, descricao, tamanho, cor, preco, estoque, foto e Id da marca" })
    return
  }

  try {
    const roupa = await prisma.roupa.create({
      data: { nome, descricao, tamanho, cor, preco, estoque, foto, marcaId }
    })
    res.status(201).json(roupa)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const roupa = await prisma.roupa.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(roupa)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, descricao, tamanho, cor, preco, estoque, foto, marcaId} = req.body


  if (!nome || !tamanho || !descricao || !cor || !preco || !estoque || !foto ) {
    res.status(400).json({ "erro": "Informe nome, descricao, tamanho, cor, preco, estoque, foto e Id da marca" })
    return
  }


  try {
    const roupa = await prisma.roupa.update({
      where: { id: Number(id) },
      data: { nome, descricao, tamanho, cor, preco, estoque, foto, marcaId }
    })
    res.status(200).json(roupa)
  } catch (error) {
    res.status(400).json(error)
  }
})


router.get("/pesquisa/:termo", async (req, res) => {
  const { termo }= req.params
  const termoNumero = Number(termo)

  if(isNaN(termoNumero)) {
    try {
      const roupas = await prisma.roupa.findMany({
        where: {
          OR: [
            { nome: { contains: termo }}
          ]
        }
      })
  
      res.status(200).json(roupas)
    } catch (error) {
      res.status(400).json(error)
    }
  }
  else {
    try {
      const roupas = await prisma.roupa.findMany({
        where: {
          OR: [
            { preco: { lte: termoNumero }}
          ]
        }
      })
      res.status(200).json(roupas)
    } catch (error) {
      res.status(400).json(error)
    }
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const roupas = await prisma.roupa.findUnique({
      where: { id: Number(id)},
      include: {
      } 
    })
    res.status(200).json(roupas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const roupas = await prisma.roupa.findMany({
     where: { id: Number(id) } 
    })
    res.status(200).json(roupas)
  } catch (error) {
    res.status(400).json(error)
  }
})


export default router