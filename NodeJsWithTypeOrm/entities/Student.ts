import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity("student")
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}