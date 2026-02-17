import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { CardapioPrato } from "./CardapioPrato";

@Entity("cardapio")
class Cardapio {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    data:Date;
    
    @Column()
    updated_at:Date;    

    @OneToMany(() => CardapioPrato, cardapioPrato => cardapioPrato.cardapio)
    pratos: CardapioPrato[];
}

export {Cardapio}