import { getCustomRepository, Like, SimpleConsoleLogger } from "typeorm";
import { Prato } from "../entity/Prato";
import {PratoRepositories} from "../repositories/PratosRepositories";

interface TypesPrato{
    nome:string;
    categoria_id:number;    
}

class HandleDbPratos{
    async inserePrato({nome, categoria_id}:TypesPrato, status){
        const pratoRepositorio = getCustomRepository(PratoRepositories);
        const pratoExistente = await pratoRepositorio.findOne({nome});

        if(!nome){
            throw new Error("Informe o Prato");
        }

        if(!categoria_id){
            throw new Error("Informe a Categoria");
        }

        if(pratoExistente){
            throw new Error("Prato já cadastrado");
        }

        const prato = pratoRepositorio.create({
            nome, categoria_id, status
        })

        await pratoRepositorio.save(prato);
        return prato; 
    }  
    
    async listaPrato({nome}){
        if(!nome){
            throw new Error("Informe o Prato");
        }

        const pratoRepositorio = getCustomRepository(PratoRepositories);
        const prato = await pratoRepositorio.findOne({nome});
        
        if(!prato || typeof(prato) == "undefined"){
            throw new Error("Prato Inexistente");
        }
        return prato;
    }
    // Trazer todos os pratos caso não venha parametro na URL, caso venha, pegar os pratos da categoria.
    async listaTodosOsPratos({categoria_id}){
        const pratoRepositorio = getCustomRepository(PratoRepositories);                
        if(!categoria_id){
            // throw new Error("Informe o Prato, Categoria ou Status");
            const pratos = await pratoRepositorio.find({ relations: ["categoria"]});
            return pratos;
        }
        if(categoria_id){
            const pratos = await pratoRepositorio.find({where: {categoria_id:categoria_id}, relations: ["categoria"]});            
            return pratos;
        }        
        // const prato = await pratoRepositorio.find({nome: Like("%"+nome+"%")});
        const pratos = await pratoRepositorio.find({categoria_id:categoria_id});            
        if(!pratos[0] || pratos.length == 0){
            throw new Error("Prato Inexistente");
        }
        // return prato;
    }

    async atualizaPrato({nome, categoria_id, status, id}){
        if(!id && !categoria_id && !status){
            throw new Error("Informe o Prato, Categoria ou Status");
        }

        const pratoRepositorio = getCustomRepository(PratoRepositories);
        const prato = await pratoRepositorio.findOne({id:id});
        
        if(!prato || typeof(prato) == "undefined"){
            throw new Error("Prato Inexistente");
        }

        if(!categoria_id){
            categoria_id = prato.categoria_id;
        }

        if(!nome){
            nome = prato.nome;
        }

        if(typeof(status) == "undefined"){
            status = prato.status;         
        }       
        prato.nome = nome;
        prato.categoria_id = categoria_id;
        prato.status = status;

        await pratoRepositorio.save(prato);

        return prato;

    }

    async deletaPrato({id}){
        if(!id){
            throw new Error("Informe o Prato para exclusão");
        }        
        const pratoRepositorio = getCustomRepository(PratoRepositories);
        if(id){              
            const deletaPrato = await pratoRepositorio.createQueryBuilder("Prato").delete().from(Prato)
            .where("id = :id",{id:id}).execute();          
        }
    }

    
}

export {HandleDbPratos};