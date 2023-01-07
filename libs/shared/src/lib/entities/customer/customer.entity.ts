import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";

@Entity()
export class Customer extends AbstractEntity {
    @Column('varchar')
    fullName: string

    @Column({type: "varchar", unique: true})
    email: string

    @Column({type: "varchar", unique: true})
    phoneNumber: string
}