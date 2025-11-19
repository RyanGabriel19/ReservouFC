export async function CriarDisponibilidade(dados){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/disponibilidades/cadastrar`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)

        });
        const resultado = await response.json();
        if(!response.ok) throw new Error(resultado.error || "erro ao criar disponibilidade");
        return resultado;
    }catch (err){
        throw err;
    }
}