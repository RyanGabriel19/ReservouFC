export async function cadastroUsuario(dados){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/cadastrar`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const resultado = await response.json();
        
        if(!response.ok) throw new Error(resultado.error || "erro ao cadastrar usuario");
        return resultado;
        
    } catch(err){
        throw err;

    }
}

export async function LoginUsuario(dados){
  try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
      });
      const resultado = await response.json();
      
      if(!response.ok) throw new Error(resultado.error || "Erro ao fazer o login");
      return resultado;
  } catch(err){
      throw err;
  }
}