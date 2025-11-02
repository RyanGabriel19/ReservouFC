export async function CadastroQuadra(dados){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quadra/cadastrar`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const resultado = await response.json();
        if(!response.ok) throw new Error(resultado.error || "erro ao cadastrar quadra");
        return resultado;

    }catch(err){
        throw err;
    }
}

