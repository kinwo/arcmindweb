import fetch from 'isomorphic-fetch';
import { HttpAgent } from '@dfinity/agent';

import {
  canisterId,
  createActor,
} from '../../declarations/arcmindai_controller';
import { identity } from './identity';

// Use `process.env` if available provoded, or fall back to local
const effectiveCanisterId = canisterId?.toString() ?? '';
const icHost = process.env.IC_HOST || 'http://127.0.0.1:8000';

const agent = new HttpAgent({
  identity: await identity,
  host: icHost,
  fetch,
});

export const actor = createActor(effectiveCanisterId, {
  agent,
});
