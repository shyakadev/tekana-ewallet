import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject } from "class-validator";
import { Customer } from "../../entities/customer/customer.entity";

export class WalletDto {

    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    customer: Customer;

    @ApiProperty()
    balance?: number
}
