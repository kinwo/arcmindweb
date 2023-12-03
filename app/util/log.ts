import debug from 'debug';

const COLOURS: Record<string, string> = {
  debug: 'lightblue',
  info: 'blue',
  warn: 'pink',
  error: 'red',
};

class Log {
  BASE = 'arcmind';

  generateMessage(level: string, message: string, source?: string) {
    // Set the prefix which will cause debug to enable the message
    const namespace = `${this.BASE}:${level}`;
    const createDebug = debug(namespace);

    // Set the colour of the message based on the level
    createDebug.color = COLOURS[level];

    if (source) {
      createDebug(source, message);
    } else {
      createDebug(message);
    }
  }

  debug(message: string, source?: any) {
    return this.generateMessage('debug', message, source);
  }

  info(message: string, source?: any) {
    return this.generateMessage('info', message, source);
  }

  warn(message: string, source?: any) {
    return this.generateMessage('warn', message, source);
  }

  error(message: string, source?: any) {
    return this.generateMessage('error', message, source);
  }

  logObject(mesg: string, object?: Record<string, string>) {
    if (object == null) {
      return;
    }

    this.info(mesg);

    try {
      const jsonString = JSON.stringify(object);
      this.info(jsonString);
    } catch (error) {
      this.info(object.toString());
    }
  }

  flattenCandidError(candidError: Record<string, string>) {
    const key =
      Object.keys(candidError).length > 0 ? Object.keys(candidError)[0] : null;
    if (key == null) {
      return '';
    }

    const fullMesg = key + ': ' + candidError[key];
    return fullMesg;
  }
}

export const log = new Log();
