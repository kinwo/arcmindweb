import { HttpAgent, Identity } from '@dfinity/agent';

import { createActor } from '../../declarations/arcmindai_controller';

const icHost = process.env.NEXT_PUBLIC_IC_HOST || 'http://127.0.0.1:8000';

export const createControllerActor = (
  identity: Identity,
  controllerCanisterId: string
) => {
  const agent = new HttpAgent({
    host: icHost,
    identity,
  });

  return createActor(controllerCanisterId, {
    agent,
  });
};
