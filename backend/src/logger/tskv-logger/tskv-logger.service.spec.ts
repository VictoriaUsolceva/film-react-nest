import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from './tskv-logger';

describe('TskvLogger', () => {
  let tskvLogger: TskvLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLogger],
    }).compile();

    tskvLogger = module.get<TskvLogger>(TskvLogger);
  });

  it('should be defined', () => {
    expect(tskvLogger).toBeDefined();
  });

  it('test format in log', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const tskvAnwser = 'level=log\tmessage=hi\toptionalParams=[[]]\n';

    tskvLogger.log('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(tskvAnwser);

    logSpy.mockRestore();
  });

  it('test format in error', () => {
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const tskvAnwser = 'level=error\tmessage=hi\toptionalParams=[[]]\n';

    tskvLogger.error('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(tskvAnwser);

    logSpy.mockRestore();
  });

  it('test format in warn', () => {
    const logSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const tskvAnwser = 'level=warn\tmessage=hi\toptionalParams=[[]]\n';

    tskvLogger.warn('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(tskvAnwser);

    logSpy.mockRestore();
  });

  it('test format in debug', () => {
    const logSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    const tskvAnwser = 'level=debug\tmessage=hi\toptionalParams=[[]]\n';

    tskvLogger.debug('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(tskvAnwser);

    logSpy.mockRestore();
  });

  it('test format in fatal', () => {
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const tskvAnwser = 'level=fatal\tmessage=hi\toptionalParams=[[]]\n';

    tskvLogger.fatal('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(tskvAnwser);

    logSpy.mockRestore();
  });
});
