import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Cardapio } from "./Cardapio";
import { Prato } from "./Prato";

@Entity("cardapioPrato")
class CardapioPrato {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    prato_id:number;

    @Column()
    cardapio_id:number;

    @ManyToOne(() => Cardapio, cardapio => cardapio.pratos)
    @JoinColumn({ name: "cardapio_id" })
    cardapio: Cardapio;

    @ManyToOne(() => Prato)
    @JoinColumn({ name: "prato_id" })
    prato: Prato;
}

export {CardapioPrato}




