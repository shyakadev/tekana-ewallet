import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";
import { Customer } from "../customer/customer.entity";

@Entity()
export class Wallet extends AbstractEntity {
    @OneToOne(() => Customer, (customer) => customer.id, {onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    customer: Customer

    @Column({default: 0})
    balance: number;
}