import { Schedules } from 'src/schedule/entity/schedule.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  director: string;

  @Column({
    type: 'text',
    transformer: {
      to(value: string[]): string {
        return value.join();
      },
      from(value: string): string[] {
        return value.split(',');
      },
    },
  })
  tags: string[];

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedule: Schedules[];
}
