import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/UsuarioRoute.js'
// import  from './routes/ReservaRoute'
// import  from './routes/QuadraRoute'
// import  from './routes/LogRoute'
// import  from './routes/HorarioBloqueadoRoute'
// import  from './routes/DisponibilidadeRoute'
// import  from './routes/DiaFechadoRoute'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(usuarioRoutes)

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`servidor rodando na porta ${PORT}`)
});
