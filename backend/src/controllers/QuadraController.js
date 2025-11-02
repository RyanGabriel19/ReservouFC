import { 
    SelectQuadra,
    UpdateQuadra,
    InsertQuadra,
    DeletQuadra
} from "../models/QuadraModels"

export async function getQuadra(req, res){
    try{
        const quadras = await SelectQuadra();
        res.json(quadras);
    } catch(err){
        err.status(500).json({error: err.message})

    }
}

export async function putQuadra(req, res){
        const {id} = req.params;
        const {nome, localizacao, valor_hora} = req.body;
        try{
            await UpdateQuadra(nome, localizacao, valor_hora)
            return res.statu(200).json({id:Number(id),  message: "Quadra atualizada com sucesso"})
        }catch(err){
            console.error("erro ao atualizar a quadra ", err);
            return res.status(500).json({error: "erro interno ao tentar atualizar a tabela quadra"})
        }
        
}

export async function postQuadra(req, res){
    const {nome, localizacao, valor_hora, ativo, tipo} = req.body
    try{
        const {id} = await InsertQuadra(nome, localizacao, valor_hora, ativo, tipo);
        return res.status(200).json({id, message: `Cadastro realizado com sucesso `})
    
    }catch(err){
        console.error("erro ao inserir dados na tabela quadra", err);
        return res.status(500).json({error: "Erro interno ao tentar inserir dados na tabela quadra."})
    }
}