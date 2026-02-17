import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Categoria } from "./Categoria";

@Entity("pratos")
class Prato {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    nome:string;

    @Column()
    categoria_id:number;

    @Column()
    status:boolean;

    @ManyToOne(() => Categoria, categoria => categoria.prato)
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;
}

export {Prato}