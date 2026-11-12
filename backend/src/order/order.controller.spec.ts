import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const mockCreatedOrderResponse = {
    total: 2,
    items: [
      {
        film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 2,
        seat: 5,
        price: 350,
        id: 'c2260f3b-6ca0-453f-f379-96ffa676089d',
      },
      {
        film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 2,
        seat: 5,
        price: 350,
        id: 'urn:uuid:ee261ff4-dc3a-cea9-d4f5-3aeb22e1abac',
      },
    ],
  };

  const orderDTO = {
    email: 'user@example.com',
    phone: '+79998887766',
    tickets: [
      {
        film: '64145bb0-996a-4644-b351-af6dc1266514',
        session: '373452c8-e4c6-450a-a2ca-30d46a27e81e',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 1,
        seat: 1,
        price: 350,
      },
    ],
  };

  const mockOrderService = {
    create: jest.fn(() => mockCreatedOrderResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  it('create order', async () => {
    const result = await orderController.create(orderDTO);
    expect(result).toEqual(mockCreatedOrderResponse);
    expect(orderService.create).toHaveBeenCalledTimes(1);
  });
});
