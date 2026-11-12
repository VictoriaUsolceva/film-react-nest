import { Test, TestingModule } from '@nestjs/testing';
import { DevLogger } from './dev-logger';

describe('DevLogger', () => {
  let devLogger: DevLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLogger],
    }).compile();

    devLogger = module.get<DevLogger>(DevLogger);
  });

  it('should be defined', () => {
    expect(devLogger).toBeDefined();
  });

  it('log have been called', () => {
    const loggerSpy = jest
      .spyOn(DevLogger.prototype, 'log')
      .mockImplementation(() => {});

    devLogger.log('hi');
    expect(loggerSpy).toHaveBeenCalled();

    expect(loggerSpy).toHaveBeenCalledWith('hi');

    loggerSpy.mockRestore();
  });
});
