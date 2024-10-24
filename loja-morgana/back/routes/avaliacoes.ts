import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      include: {
        cliente: true,
        roupa: true
      }
    })
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { desc, nota, clienteId, roupaId } = req.body;

  if (!desc || !nota || !clienteId || !roupaId) {
    res.status(400).json({ erro: "Informe descrição, nota, id do cliente e id da roupa" });
    return;
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Criação da avaliação
      const avaliacao = await prisma.avaliacao.create({
        data: { desc, nota, clienteId, roupaId },
      });

      // Recupera soma e quantidade de avaliações
      const notaSomaResult = await prisma.avaliacao.aggregate({
        _sum: { nota: true },
        where: { roupaId: roupaId },
      });
      const somaAvaliacoes = await prisma.avaliacao.count({
        where: { roupaId: roupaId },
      });

      // Garante que `notaSomaResult._sum.nota` não seja null
      const notaSoma = notaSomaResult._sum.nota ?? 0;

      // Atualização da soma e média de avaliações da roupa
      await prisma.roupa.update({
        where: { id: roupaId },
        data: {
          somaAvaliacao: { increment: 1 }, // Incrementa a soma das avaliações
          mediaAvaliacao: { set: somaAvaliacoes > 0 ? notaSoma / somaAvaliacoes : 0 },
        },
      });

      res.status(201).json(avaliacao);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.$transaction(async (prisma) => {
      // Deleta a avaliação
      const avaliacao = await prisma.avaliacao.delete({
        where: { id: Number(id) },
      });

      const roupaId = avaliacao.roupaId;

      // Recupera soma e quantidade de avaliações
      const notaSomaResult = await prisma.avaliacao.aggregate({
        _sum: { nota: true },
        where: { roupaId: roupaId },
      });
      const somaAvaliacoes = await prisma.avaliacao.count({
        where: { roupaId: roupaId },
      });

      const notaSoma = notaSomaResult._sum.nota ?? 0;

      // Atualiza soma e média de avaliações da roupa
      await prisma.roupa.update({
        where: { id: roupaId },
        data: {
          somaAvaliacao: { decrement: 1 }, // Decrementa a soma das avaliações
          mediaAvaliacao: { set: somaAvaliacoes > 0 ? notaSoma / somaAvaliacoes : 0 },
        },
      });

      res.status(200).json(avaliacao);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { desc, nota, clienteId, roupaId } = req.body;

  if (!desc || !nota || !clienteId || !roupaId) {
    res.status(400).json({ erro: "Informe descrição, nota, id do cliente e id da roupa" });
    return;
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Atualiza a avaliação
      const avaliacao = await prisma.avaliacao.update({
        where: { id: Number(id) },
        data: { desc, nota, clienteId, roupaId },
      });

      // Recupera soma e quantidade de avaliações
      const notaSomaResult = await prisma.avaliacao.aggregate({
        _sum: { nota: true },
        where: { roupaId: roupaId },
      });
      const somaAvaliacoes = await prisma.avaliacao.count({
        where: { roupaId: roupaId },
      });

      const notaSoma = notaSomaResult._sum.nota ?? 0;

      // Atualiza a média de avaliações da roupa
      await prisma.roupa.update({
        where: { id: roupaId },
        data: {
          mediaAvaliacao: { set: somaAvaliacoes > 0 ? notaSoma / somaAvaliacoes : 0 },
        },
      });

      res.status(200).json(avaliacao);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});



export default router