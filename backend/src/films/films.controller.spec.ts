import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  const mockFindAllResponse = {
    total: 2,
    items: [
      {
        id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        rating: 2.9,
        director: 'Итан Райт',
        tags: ['Документальный'],
        title: 'Архитекторы общества',
        about:
          'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
        description:
          'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
        image: '/images/bg1s.jpg',
        cover: '/images/bg1c.jpg',
      },
      {
        id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        rating: 2.9,
        director: 'Итан Райт',
        tags: ['Документальный'],
        title: 'Архитекторы общества',
        about:
          'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
        description:
          'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
        image: '/images/bg1s.jpg',
        cover: '/images/bg1c.jpg',
      },
    ],
  };

  const mockScheduleResponse = {
    total: 9,
    items: [
      {
        id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
        daytime: '2024-06-28T10:00:53+03:00',
        hall: '0',
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
      {
        id: '5beec101-acbb-4158-adc6-d855716b44a8',
        daytime: '2024-06-28T14:00:53+03:00',
        hall: '1',
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
      {
        id: '89ee32f3-8164-40a6-b237-f4d492450250',
        daytime: '2024-06-28T16:00:53+03:00',
        hall: '2',
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
      {
        id: 'd6a4ed9b-51d6-4df2-b66e-d75175deb373',
        daytime: '2024-06-29T11:00:53+03:00',
        hall: '0',
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
      {
        id: 'a8af36c3-65ee-4224-a77d-c9ebb790ba66',
        daytime: '2024-06-29T15:00:53+03:00',
        hall: '1',
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
      {
        id: '0cf8b68c-fcf2-4c0a-97ba-45990231fa0e',
        daytime: '2024-06-29T17:00:53+03:00',
        hall: '2',
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
      {
        id: '2519ca34-32b4-4a7f-971d-3bb585c6450b',
        daytime: '2024-06-30T12:00:53+03:00',
        hall: '0',
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
      {
        id: 'b105ad4b-ecd2-4556-abaf-9a95403dc01c',
        daytime: '2024-06-30T16:00:53+03:00',
        hall: '1',
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
      {
        id: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
        daytime: '2024-06-30T18:00:53+03:00',
        hall: '2',
        rows: 5,
        seats: 10,
        price: 350,
        taken: ['3:3', '3:4'],
      },
    ],
  };

  const filmId = 'd290f1ee-6c54-4b01-90e6-d701748f0851';

  const mockFilmsService = {
    findAll: jest.fn(() => mockFindAllResponse),
    findOne: jest.fn(() => mockScheduleResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filmsController).toBeDefined();
  });

  it('return status 200 and films list', async () => {
    const result = await filmsController.findAll();

    expect(result).toEqual(mockFindAllResponse);
    expect(filmsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('return status 200 and film schedule', async () => {
    const result = await filmsController.findOne(filmId);

    expect(result).toEqual(mockScheduleResponse);
    expect(filmsService.findOne).toHaveBeenCalledTimes(1);
  });
});
