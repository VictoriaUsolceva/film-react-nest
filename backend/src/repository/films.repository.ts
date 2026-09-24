import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import mongoose, { Schema } from 'mongoose';
import { FilmDto, GetFilmDto } from 'src/films/dto/films.dto';
import { CreateOrderDto, OrderDto } from 'src/order/dto/order.dto';
import { GetScheduleDTO } from 'src/schedule/dto/schedule.dto';

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

    filmsTakens.forEach(async ({ scheduleId, film, takens }) => {
      await film.pushTakens(scheduleId, takens);
    });

    return response;
  }
}
