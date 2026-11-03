import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './json-logger';

describe('JsonLogger', () => {
  let jsonLogger: JsonLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    jsonLogger = module.get<JsonLogger>(JsonLogger);
  });

  it('should be defined', () => {
    expect(jsonLogger).toBeDefined();
  });

  it('test format in log', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const jsonAnwser = JSON.stringify({
      level: 'log',
      message: 'hi',
      optionalParams: [[]],
    });

    jsonLogger.log('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(jsonAnwser);

    logSpy.mockRestore();
  });

  it('test format in error', () => {
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const jsonAnwser = JSON.stringify({
      level: 'error',
      message: 'hi',
      optionalParams: [[]],
    });

    jsonLogger.error('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(jsonAnwser);

    logSpy.mockRestore();
  });

  it('test format in warn', () => {
    const logSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const jsonAnwser = JSON.stringify({
      level: 'warn',
      message: 'hi',
      optionalParams: [[]],
    });

    jsonLogger.warn('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(jsonAnwser);

    logSpy.mockRestore();
  });

  it('test format in debug', () => {
    const logSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    const jsonAnwser = JSON.stringify({
      level: 'debug',
      message: 'hi',
      optionalParams: [[]],
    });

    jsonLogger.debug('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(jsonAnwser);

    logSpy.mockRestore();
  });

  it('test format in fatal', () => {
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const jsonAnwser = JSON.stringify({
      level: 'fatal',
      message: 'hi',
      optionalParams: [[]],
    });

    jsonLogger.fatal('hi');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(jsonAnwser);

    logSpy.mockRestore();
  });
});
