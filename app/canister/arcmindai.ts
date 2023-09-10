import { HttpAgent } from '@dfinity/agent';

import {
  canisterId,
  createActor,
} from '../../declarations/arcmindai_controller';
import { identity } from './identity';

const effectiveCanisterId = canisterId?.toString() ?? '';
const icHost = process.env.NEXT_PUBLIC_IC_HOST || 'http://127.0.0.1:8000';

const agent = new HttpAgent({
  host: icHost,
});

export const actor = createActor(effectiveCanisterId, {
  agent,
});
