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

    @Column({ default: false })
    lactose:boolean;

    @Column({ default: false })
    vegano:boolean;

    @Column({ default: false })
    gluten:boolean;

    @ManyToOne(() => Categoria, categoria => categoria.prato)
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;
}

export {Prato}