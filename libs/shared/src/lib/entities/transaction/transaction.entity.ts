import { JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";
import { Customer } from "../customer/customer.entity";

export class Transaction extends AbstractEntity {
    @ManyToOne(() => Customer, (customer) => customer.id, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn()
    customer: Customer
}