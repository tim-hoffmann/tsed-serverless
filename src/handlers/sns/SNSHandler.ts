import 'source-map-support/register';
import { PlatformBuilder } from '@tsed/common';
import { SNSHandler } from 'aws-lambda';
import '@tsed/platform-express';
import { upperFirst } from 'lodash';
import { LambdaServer } from '../../servers/LambdaServer';

const eventPrefix = 'EVENT_';

let platform: PlatformBuilder;

export const handler: SNSHandler = async (event) => {
  if (!platform) {
    platform = await PlatformBuilder.currentPlatform.bootstrap(LambdaServer);
  }

  const { logger } = platform.injector;

  logger.info(event);

  for (const { Sns } of event.Records) {
    const message = JSON.parse(Sns.Message);
    const eventName = Sns.MessageAttributes.event.Value;

    if (!message.payload || !eventName) {
      logger.error('Invalid SNS event.', event);
      return;
    }

    const internalEventName = `$on${eventName
      .replace(eventPrefix, '')
      .toLowerCase()
      .split('_')
      .map(upperFirst)
      .join('')}`;

    logger.debug('Parsed event to internal event name.', internalEventName);

    await platform.injector.emit(internalEventName, ...Object.values(message.payload));
  }
};
