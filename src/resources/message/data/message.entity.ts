import { BaseEntity } from 'src/database/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @Column()
  content: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
