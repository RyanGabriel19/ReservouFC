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
        const {nome, valor_hora, ativo, localizacao} = req.body;
        try{
            await updateUsuario(id, nome, valor_hora, ativo,localizacao)
            return res.statu(200).json({id:Number(id),  message: "quadra atualizada com sucesso"})
        }catch(err){
            console.error("erro ao atualizar a quadra ", err);
            return res.status(500).json({error: "erro interno ao tentar atualizar a tabela quadra"})
        }
        
}

export async function postQuadra(req, res){
    const {nome, valor_hora, ativo, localizacao} = req.body
    try{
        const {id} = await InsertQuadra(nome, valor_hora, ativo, localizacao);
        return res.status(200).json({id, message: `cadastro realizado com sucesso `})
    
    }catch(err){
        console.error("erro ao inserir dados na tabela quadra", err);
        return res.status(500).json({error: "error interno ao tentar inserir dados na tabela quadra "})
    }
}