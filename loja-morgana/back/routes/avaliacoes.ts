import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const avaliacoes = await prisma.avaliacao.findMany()
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { desc, nota, clienteId, roupaId } = req.body

  if (!desc || !nota || !clienteId || !roupaId ) {
    res.status(400).json({ "erro": "Informe descrição, nota, id do cliente e id da roupa" })
    return
  }

  try {
    const avaliacao = await prisma.avaliacao.create({
      data: { desc, nota, clienteId, roupaId }
    })
    res.status(201).json(avaliacao)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router