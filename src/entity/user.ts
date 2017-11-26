import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column({
        type: 'int',
        nullable: true
    })
    age: number;

}
