import {
    SelectReserva,
    criarReserva,
    BuscarReservaPorId,
    BuscarReservaUsuario,
    AtualizarReserva,
    CancelarReserva
} from "../models/ReservaModels.js";


//buscar reserba
export async function getReserva(req, res){
    try{
        const reservas = await SelectReserva();
        res.json(reservas);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

//buscar reserva por id
export async function getReservaId(req, res){
    try{
        const {id} = req.params;
        const reserva = await BuscarReservaPorId(id);
        if(!reserva){
            return res.status(400).json({error: "reserva nao encontrada"})
        }
        res.json(reserva);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

//buscar reserva pelo usuario
export async function getReservaUsuario(req, res){
    try{
        const {usuario_id} = req.params;
        const reservas = await BuscarReservaUsuario(usuario_id);
        res.json(reservas);
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
//criar uma nova reserva
export async function postReserva(req, res){
    try{
        const {quadra_id, usuario_id, data_hora, duracao_min, valor, idUsuarioLogado} = req.body;
        const reservaId = await criarReserva({quadra_id, usuario_id, data_hora, duracao_min, valor}, idUsuarioLogado);
        res.status(201).json({message: "Reserva criada com sucesso", id:reservaId});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
// Atualizar reserva
export async function putReserva(req, res) {
    try {
        const { id } = req.params;
        const { data_hora, duracao_min, status, idUsuarioLogado } = req.body;
        const reservaAtualizada = await AtualizarReserva(id, { data_hora, duracao_min, status }, idUsuarioLogado);
        res.json(reservaAtualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Cancelar reserva
export async function deleteReserva(req, res) {
    try {
        const { id } = req.params;
        const { idUsuarioLogado } = req.body;

        // DEBUG: Veja isso no terminal do Render/VS Code quando clicar em cancelar
        console.log("Tentando cancelar reserva:", id);
        console.log("ID do Usuário Logado recebido:", idUsuarioLogado); 

        if (!idUsuarioLogado) {
             console.warn("ATENÇÃO: idUsuarioLogado chegou NULO no controller!");
        }
        
        const reservaCancelada = await CancelarReserva(id , idUsuarioLogado);
        res.json(reservaCancelada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}