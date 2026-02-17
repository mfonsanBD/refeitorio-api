import { getCustomRepository, Like, SimpleConsoleLogger } from "typeorm";
import { Prato } from "../entity/Prato";
import {PratoRepositories} from "../repositories/PratosRepositories";

interface TypesPrato{
    nome:string;
    categoria_id:number;
    lactose?:boolean;
    vegano?:boolean;
    gluten?:boolean;
}

class HandleDbPratos{
    async inserePrato({nome, categoria_id, lactose, vegano, gluten}:TypesPrato, status){
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
            nome, categoria_id, status, lactose, vegano, gluten
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
            const pratos = await pratoRepositorio.find({ relations: ["categoria"]});
            return pratos;
        }

        const pratos = await pratoRepositorio.find({where: {categoria_id:categoria_id}, relations: ["categoria"]});            
        
        if(!pratos || pratos.length === 0){
            throw new Error("Prato Inexistente");
        }

        return pratos;
    }

    async atualizaPrato({nome, categoria_id, status, id, lactose, vegano, gluten}){
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

        if(typeof(lactose) == "undefined"){
            lactose = prato.lactose;
        }

        if(typeof(vegano) == "undefined"){
            vegano = prato.vegano;
        }

        if(typeof(gluten) == "undefined"){
            gluten = prato.gluten;
        }

        prato.nome = nome;
        prato.categoria_id = categoria_id;
        prato.status = status;
        prato.lactose = lactose;
        prato.vegano = vegano;
        prato.gluten = gluten;

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