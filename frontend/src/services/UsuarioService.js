export async function cadastroUsuario(dados){
    try{
        const response = await fetch("http://localhost:3000/usuarios/cadastrar", {
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
      const response = await fetch("http://localhost:3000/usuarios/login", {
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