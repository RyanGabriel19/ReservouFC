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
//usar para datas criadas por usuario
export function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", // converte de UTC para horário local
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).replace(",", " às");
}

//usar para formatar datas e horas criada pelo sistema
export function HoraCorreta(dataISO){
  
  const data = new Date(dataISO);

  // Corrige o fuso (ajusta para o horário local do Brasil)
  // UTC-3 → subtrai 3 horas
  data.setHours(data.getHours() - 3);

  // Formata sem mostrar os segundos
  return data.toLocaleString("pt-BR", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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