import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';
import { OrderModule } from 'src/order/order.module';
import { FilmsModule } from 'src/films/films.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockFilms = [
    {
      id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      rating: 2.9,
      director: 'Итан Райт',
      tags: ['Документальный'],
      title: 'Архитекторы общества',
      about:
        'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
      description:
        'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
      image: '/bg1s.jpg',
      cover: '/bg1c.jpg',
    },
    {
      id: '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
      rating: 9,
      director: 'Харрисон Рид',
      tags: ['Рекомендуемые'],
      title: 'Недостижимая утопия',
      about:
        'Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.',
      description:
        'Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.',
      image: '/bg3s.jpg',
      cover: '/bg3c.jpg',
    },
    {
      id: '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
      rating: 8.5,
      director: 'Элиза Уиттакер',
      tags: ['Рекомендуемые'],
      title: 'Звёздное путешествие',
      about:
        'Научно-фантастический фильм о команде астронавтов, исследующий темы жизнестойкости, надежды и силы человеческих связей',
      description:
        '«Звёздное путешествие» — прекрасный научно-фантастический фильм о команде астронавтов, путешествующих по галактике в поисках нового дома для человечества. Помимо потрясающей работы оператора и специалистов по визуальным эффектам, можно отметить темы, исследуемые в фильме: жизнестойкости, надежды и силы человеческих связей.',
      image: '/bg5s.jpg',
      cover: '/bg5c.jpg',
    },
    {
      id: '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
      rating: 8.9,
      director: 'Лила Васкес',
      tags: ['Рекомендуемые'],
      title: 'Стражи Гримуара',
      about:
        'Фэнтезийное приключение об истинном значении дружбы, мужества и силы знаний',
      description:
        'Захватывающее фэнтезийное приключение, которое рассказывает о группе героев, которые должны защитить древний магический том от попадания в руки тёмного колдуна. История об истинном значении дружбы, мужества и силы знаний.',
      image: '/bg2s.jpg',
      cover: '/bg2c.jpg',
    },
    {
      id: '0354a762-8928-427f-81d7-1656f717f39c',
      rating: 9.5,
      director: 'Оливер Беннет',
      tags: ['Рекомендуемые'],
      title: 'Парадокс Нексуса',
      about:
        'Фильм об эксперименте по соединению человеческих умов. Исследует вопросы неприкосновенности частной жизни, идентичности и самой природы человеческого сознания',
      description:
        'В фильме исследуются последствия новаторского эксперимента по соединению человеческих умов. По мере развития проекта участники сталкиваются с вопросами неприкосновенности частной жизни, идентичности и самой природы человеческого сознания.',
      image: '/bg4s.jpg',
      cover: '/bg4c.jpg',
    },
    {
      id: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
      rating: 8.1,
      director: 'Амелия Хьюз',
      tags: ['Рекомендуемые'],
      title: 'Сон в летний день',
      about:
        'Фэнтези-фильм о группе друзей попавших в волшебный лес, где время остановилось.',
      description:
        'Причудливый фэнтези-фильм, действие которого происходит в волшебном лесу, где время остановилось. Группа друзей натыкается на это заколдованное царство и поначалу проникается беззаботным духом обитателей, но потом друзьям приходится разойтись. А как встретиться снова, если нет ни времени, ни места встречи?',
      image: '/bg6s.jpg',
      cover: '/bg6c.jpg',
    },
  ];

  const filmId = '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf';

  const mockPayload = [
    {
      film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
      daytime: '2023-05-29T10:30:00.001Z',
      row: 2,
      seat: 5,
      price: 350,
    },
    {
      film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
      daytime: '2023-05-29T10:30:00.001Z',
      row: 2,
      seat: 5,
      price: 350,
    },
  ];

  const mockOrder = {
    total: 2,
    items: [
      {
        film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 2,
        seat: 5,
        price: 350,
      },
      {
        film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 2,
        seat: 5,
        price: 350,
      },
    ],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FilmsModule, OrderModule],
    })
      .overrideProvider(FilmsMongoDbRepository)
      .useValue({
        findAll: jest
          .fn()
          .mockResolvedValue({ total: mockFilms.length, items: mockFilms }),
        findOne: jest
          .fn()
          .mockImplementation((id) =>
            Promise.resolve(mockFilms.find((f) => f.id === id)),
          ),
        createOrder: jest
          .fn()
          .mockImplementation((dto) =>
            Promise.resolve({ total: dto.length, items: [...dto] }),
          ),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('GET /films возвращает список фильмов (200) и правильные данные', async () => {
    const response = await request(app.getHttpServer()).get('/films');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      total: mockFilms.length,
      items: mockFilms,
    });
  });

  it('GET /films/:id/schedule возвращает один фильм (200)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/films/${filmId}/schedule`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFilms.find(({ id }) => id === filmId));
  });

  it('POST /order создает заказ (200)', async () => {
    const response = await request(app.getHttpServer())
      .post('/order')
      .send(mockPayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrder);
  });
});
