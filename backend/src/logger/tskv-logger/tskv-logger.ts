import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const anwser = [];
    anwser.push('level=' + level);
    anwser.push('message=' + message);
    anwser.push('optionalParams=' + JSON.stringify(optionalParams));

    return anwser.join('\t') + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('fatal', message, optionalParams));
  }
}
