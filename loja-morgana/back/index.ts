import express from 'express'
import cors from 'cors'

import roupasRoutes from './routes/roupas'
import clientesRoutes from './routes/clientes'
import marcasRoutes from './routes/marcas'
import avaliacoesRoutes from './routes/avaliacoes'
const app = express()
const port = 3004

app.use(express.json())
app.use(cors())

app.use("/roupas", roupasRoutes)
app.use("/clientes", clientesRoutes)
app.use("/marcas", marcasRoutes)

app.get('/', (req, res) => {
  res.send('API: Loja de roupas femininas')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})