import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';
import * as request from 'supertest';

describe('OrdersController E2E', () => {
  let app: INestApplication;

  const validTicket = {
    film: '4c7d6c6e-711e-4bba-9b48-89c09930f78a',
    session: '8d2a6a12-881b-4179-8d07-35322fa8162f',
    daytime: '2026-11-03T15:00:00.000Z',
    row: 3,
    seat: 10,
    price: 450.5,
  };

  const validDto = {
    email: 'user@example.com',
    phone: '+79998887766',
    tickets: [validTicket],
  };

  const mockCreatedOrderResponse = {
    total: 1,
    items: [
      {
        ...validTicket,
        id: 'c2260f3b-6ca0-453f-f379-96ffa676089d',
      },
    ],
  };

  const mockOrdersService = {
    create: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockCreatedOrderResponse)),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /order DTO validation', () => {
    it('create order status 200', () => {
      return request(app.getHttpServer())
        .post('/order')
        .send(validDto)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('total');
          expect(res.body).toHaveProperty('items');
          expect(res.body.items[0].row).toBe(3);
        });
    });

    it('400 Bad Request, if unvalid email', () => {
      const invalidDto = {
        email: 'not-an-email',
        phone: '+79998887766',
        tickets: [validTicket],
      };

      return request(app.getHttpServer())
        .post('/order')
        .send(invalidDto)
        .expect(400);
    });

    it('400 Bad Request, if tickets array empty', () => {
      const invalidDto = {
        email: 'user@example.com',
        phone: '+79998887766',
        tickets: [],
      };

      return request(app.getHttpServer())
        .post('/order')
        .send(invalidDto)
        .expect(400);
    });

    it('400 Bad Request, unvalid tickets data', () => {
      const invalidDto = {
        email: 'user@example.com',
        phone: '+79998887766',
        tickets: [
          {
            ...validTicket,
            film: 'no-uuid',
            row: 0,
            price: -50,
          },
        ],
      };

      return request(app.getHttpServer())
        .post('/order')
        .send(invalidDto)
        .expect(400);
    });
  });
});
