import {Request, Response} from "express";
import { HandleDbPratos } from '../services/PratoService';
const pratos = new HandleDbPratos();

class HandlePratos{
    async inserePrato(request:Request, response:Response){
        const {nome, categoria_id, lactose, vegano, gluten} = request.body;
        const status = true;                
        const inserePrato = await pratos.inserePrato({nome, categoria_id, lactose, vegano, gluten}, status);
        return response.json(inserePrato);
        
    }

    async listaPrato(request:Request, response:Response){
        const {nome} = request.params;
                
        const listaPrato = await pratos.listaPrato({nome});

        return response.json(listaPrato);
    }

    async listaTodosOsPratos(request:Request, response:Response){
        const {categoria_id} = request.params;
               
        const listaPrato = await pratos.listaTodosOsPratos({categoria_id});

        return response.json(listaPrato);
    }

    async atualizaPrato(request:Request, response:Response){
        const {nome, categoria_id, status, id, lactose, vegano, gluten} = request.body;
        
        const atualizaPrato = await pratos.atualizaPrato({nome, categoria_id, status, id, lactose, vegano, gluten});

        return response.json(atualizaPrato);
    }

    async deletaPrato(request:Request, response:Response){
        const {id} = request.params;
        
        await pratos.deletaPrato({id});
        
        return response.json({"return":"ID Prato Excluído: "+id});
    }
}

export {HandlePratos};