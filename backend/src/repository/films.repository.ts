import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import mongoose, { Schema } from 'mongoose';
import { FilmDto, GetFilmDto } from 'src/films/dto/films.dto';
import { Films } from 'src/films/entity/film.entity';
import { CreateOrderDto, OrderDto } from 'src/order/dto/order.dto';
import { GetScheduleDTO } from 'src/schedule/dto/schedule.dto';
import { DataSource, Repository } from 'typeorm';

interface IScheduleSchema extends GetScheduleDTO {
  pushTaken(taken: string): Promise<GetScheduleDTO>;
}

const ScheduleSchema = new Schema<IScheduleSchema>(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: String, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], required: true },
  },
  {
    _id: false,
  },
);

interface IFilmSchema extends FilmDto {
  findScheduleById(scheduleId: string): GetScheduleDTO | undefined;
  pushTakens(scheduleId: string, takens: string[]): Promise<FilmDto>;
}

const FilmSchema = new Schema<IFilmSchema>(
  {
    id: { type: String, required: true },
    rating: { type: Number, required: true },
    director: { type: String, required: true },
    tags: { type: [String], required: true },
    title: { type: String, required: true },
    about: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    cover: { type: String, required: true },
    schedule: { type: [ScheduleSchema], required: true },
  },
  {
    versionKey: false,
    methods: {
      findScheduleById(scheduleId: string): GetScheduleDTO | undefined {
        return this.schedule.find(({ id }) => id === scheduleId);
      },
      pushTakens(scheduleId: string, takens: string[]): Promise<FilmDto> {
        const schedule = this.findScheduleById(scheduleId);
        schedule.taken.push(...takens);
        return this.save();
      },
    },
  },
);

const Film = mongoose.model('film', FilmSchema);

export default Film;

type ListResponse<Type> = {
  total: number;
  items: Type[];
};

interface FilmsRepository {
  findAll: () => Promise<ListResponse<GetFilmDto>>;
  findOne: (id: string) => Promise<ListResponse<GetScheduleDTO>>;
  createOrder: (order: CreateOrderDto) => Promise<ListResponse<OrderDto>>;
}

export class FilmsMongoDbRepository implements FilmsRepository {
  filmToDto(film: FilmDto): GetFilmDto {
    const {
      id,
      rating,
      about,
      director,
      tags,
      title,
      cover,
      description,
      image,
    } = film;
    return {
      id,
      rating,
      director,
      tags,
      title,
      about,
      description,
      image,
      cover,
    };
  }

  scheduleToDto(schedule: GetScheduleDTO): GetScheduleDTO {
    const { id, daytime, hall, rows, seats, price, taken } = schedule;
    return {
      id,
      daytime,
      hall,
      rows,
      seats,
      price,
      taken,
    };
  }

  async findAll() {
    const films = await Film.find({}).select({ _id: 0 });
    return { total: films.length, items: films.map(this.filmToDto) };
  }

  async findOne(id: string) {
    const film = await Film.findOne({ id: id });
    if (film === null) {
      throw new NotFoundException('Film not Found');
    }
    const { schedule } = film;

    return {
      total: schedule.length,
      items: schedule.map(this.scheduleToDto),
    };
  }

  async createOrder({ tickets }: CreateOrderDto) {
    const response: ListResponse<OrderDto> = { total: 0, items: [] };
    let filmsTakens: {
      scheduleId: string;
      film: IFilmSchema;
      takens: string[];
    }[] = [];

    for (const ticket of tickets) {
      const { film: id, daytime, price, row, seat, session } = ticket;
      const taken = `${row}:${seat}`;

      const film = await Film.findOne({ id: id });
      if (film === null) {
        throw new NotFoundException('Film not Found');
      }
      const currentShedule = film.findScheduleById(session);
      if (currentShedule === undefined) {
        throw new NotFoundException('Film not Found');
      }

      if (currentShedule.taken.includes(taken)) {
        throw new BadRequestException('Место уже занято');
      }

      if (row > currentShedule.rows || seat > currentShedule.seats) {
        throw new BadRequestException('Не существует такого места');
      }

      const currentFilmTakens = filmsTakens.find(
        (el) => el.scheduleId === session,
      );
      if (!currentFilmTakens) {
        filmsTakens = [
          ...filmsTakens,
          {
            scheduleId: session,
            film,
            takens: [taken],
          },
        ];
      } else {
        if (currentFilmTakens.takens.includes(taken)) {
          throw new BadRequestException('Место повторяется в заказе');
        }
        currentFilmTakens.takens.push(taken);
      }

      response.items.push({
        daytime,
        film: id,
        id: randomUUID(),
        price,
        row,
        seat,
        session,
      });
      response.total++;
    }

    for (const { scheduleId, film, takens } of filmsTakens) {
      await film.pushTakens(scheduleId, takens);
    }

    return response;
  }
}
export class FilmsTypeOrmRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: string): Promise<ListResponse<GetScheduleDTO>> {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
    if (film === null) {
      throw new NotFoundException('Film not Found');
    }
    return { total: 1, items: film.schedule };
  }

  async findAll(): Promise<ListResponse<GetFilmDto>> {
    const films = await this.filmsRepository.find();

    return { total: films.length, items: films };
  }

  async createOrder({
    tickets,
  }: CreateOrderDto): Promise<ListResponse<OrderDto>> {
    const queryRunner = this.dataSource.createQueryRunner();
    const response: ListResponse<OrderDto> = { total: 0, items: [] };

    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      for (const ticket of tickets) {
        const { film: id, row, seat, session } = ticket;
        const film = await queryRunner.manager.findOne(Films, {
          where: {
            id,
            schedule: { id: session },
          },
          relations: {
            schedule: true,
          },
        });
        if (film === null || film.schedule === null) {
          throw new NotFoundException('Film not Found');
        }
        const schedule = film.schedule[0];
        const place = `${row}:${seat}`;

        if (schedule.taken.includes(place)) {
          throw new BadRequestException('Место уже занято');
        }

        if (row > schedule.rows || seat > schedule.seats) {
          throw new BadRequestException('Некорректное место');
        }

        schedule.taken.push(place);
        await queryRunner.manager.save(schedule);
        response.items.push({
          ...ticket,
          id: randomUUID(),
        });
        response.total++;
      }

      await queryRunner.commitTransaction();
      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
