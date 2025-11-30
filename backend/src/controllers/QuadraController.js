import { 
    SelectQuadra,
    UpdateQuadra,
    InsertQuadra,
    DeleteQuadra,
    SelectQuadraID
} from "../models/QuadraModels.js"

export async function getQuadra(req, res){
    try{
        const quadras = await SelectQuadra();
        res.json(quadras);
    } catch(err){
        err.status(500).json({error: err.message})

    }
}
export async function getQuadraID(req, res){
    try{
        const { id } = req.params;
        const quadras = await SelectQuadraID(id);
        res.json(quadras);
    } catch(err){
        res.status(500).json({error: err.message})

    }
}

export async function putQuadra(req, res) {
  try {
    const { id } = req.params;
    let { nome, localizacao, valor_hora, idUsuarioLogado } = req.body;

    // Converte undefined para null
    nome = nome ?? null;
    localizacao = localizacao ?? null;
    valor_hora = valor_hora ?? null;

    const result = await UpdateQuadra(id, {
      nome,
      localizacao,
      valor_hora
    }, idUsuarioLogado);

    if (result === 0) {
      return res.status(404).json({ error: "Quadra não encontrada" });
    }

    res.json({ message: "Quadra atualizada com sucesso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar quadra" });
  }
}

export async function postQuadra(req, res){
    const {nome, localizacao, valor_hora, idUsuarioLogado} = req.body
    try{
        const {id} = await InsertQuadra(nome, localizacao, valor_hora, idUsuarioLogado);
        return res.status(200).json({id, message: `Cadastro realizado com sucesso `})
    
    }catch(err){
        console.error("erro ao inserir dados na tabela quadra", err);
        return res.status(500).json({error: "Erro interno ao tentar inserir dados na tabela quadra."})
    }
}