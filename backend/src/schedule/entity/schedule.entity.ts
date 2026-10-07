import { Films } from 'src/films/entity/film.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: string;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

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
  taken: string[];

  @ManyToOne(() => Films, (film) => film.schedule)
  film: Films;
}
