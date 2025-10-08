import {
    SelectReserva,
    criarReserva,
    BuscarReservaPorId,
    BuscarReservaUsuario,
    AtualizarReserva,
    CancelarReserva
} from "../models/ReservaModels";


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
        const reserva = await BuscarReservaPorId;
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
        const reservas = awai BuscarReservaUsuario(usuario_id);
        res.json(reservas);
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
//criar uma nova reserva
export async function postReserva(req, res){
    try{
        const {quadra_id, usuario_id, data_hora, duracao_min, valor} = req.body;
        const reservaId = await criarReserva({quadra_id, usuario_id, data_hora, duracao_min, valor});
        res.status(201).json({message: "Reserva criada com sucesso", id:reservaId});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
// Atualizar reserva
export async function putReserva(req, res) {
    try {
        const { id } = req.params;
        const { data_hora, duracao_min, status } = req.body;
        const reservaAtualizada = await AtualizarReserva(id, { data_hora, duracao_min, status });
        res.json(reservaAtualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Cancelar reserva
export async function deleteReserva(req, res) {
    try {
        const { id } = req.params;
        const reservaCancelada = await CancelarReserva(id);
        res.json(reservaCancelada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}