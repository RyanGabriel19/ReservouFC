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
export async function quadraConsultar() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/quadra/consultar`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json(); // ✅ transforma a resposta em JSON
    return data; // ✅ retorna os dados corretamente
  } catch (error) {
    console.error("Erro ao buscar quadras:", error);
    throw error;
  }
}

export async function quadraConsultarID(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/quadra/consultar/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json(); // ✅ transforma a resposta em JSON
    return data; // ✅ retorna os dados corretamente
  } catch (error) {
    console.error("Erro ao buscar quadras:", error);
    throw error;
  }
}

export async function QuadraAtualizar(id, dados){
  try{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/quadra/atualizar/${id}`, {
    method: "PUT",
      headers:  { "Content-Type": "application/json" },
      body: JSON.stringify(dados)

    }); 
    const resultado = await response.json();
    if(!response.ok) throw new Error(resultado.error || "Erro ao atualizar dados da quadra");
      return resultado;
  } catch(err){
      throw err;
  }
  
}