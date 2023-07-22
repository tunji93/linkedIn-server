import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: string;
}
