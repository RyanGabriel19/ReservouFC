export async function criarReserva(dados){
    try{ 
        const response = await fetch (`${import.meta.env.VITE_API_URL}/reservas/cadastrar`,{
        method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const resultado = await response.json();
        if(!response.ok) throw new Error(resultado.error || "erro ao fazer a reseva");
        return resultado;

    }catch(err){
        throw err;
    }
}

export async function UsuarioReserva(usuario_id){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/reservas/usuario/${usuario_id}`, {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json'
                },
                
            });
            const resultado = await response.json();
            if(!response.ok) throw new Error(resultado.error || "erro ao fazer a reserva");
            return resultado;
        }catch(err){
            throw err;
        }
}

export async function ConsultarReservas(){
     try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/reservas/consultar`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Erro ao buscar quadras:", error);
    throw error;
  }
}
export async function ConfirmarReserva(id) {
  try {
  
    const response = await fetch(`${import.meta.env.VITE_API_URL}/reservas/atualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "CONFIRMADO"}),
    });

    const resultado = await response.json();

    if (!response.ok) throw new Error(resultado.error || "Erro ao atualizar reserva");

    return resultado;
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    throw error;
  }
}
export function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleString("pt-BR");
}

export async function CancelarReserva(id) {
  try {
  
    const response = await fetch(`${import.meta.env.VITE_API_URL}/reservas/atualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "CANCELADO"}),
    });

    const resultado = await response.json();

    if (!response.ok) throw new Error(resultado.error || "Erro ao atualizar reserva");

    return resultado;
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    throw error;
  }
}