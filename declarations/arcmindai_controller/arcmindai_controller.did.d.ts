import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Goal {
  'status' : GoalStatus,
  'result' : [] | [string],
  'updated_at' : bigint,
  'goal' : string,
  'created_at' : bigint,
}
export type GoalStatus = { 'Complete' : null } |
  { 'Scheduled' : null } |
  { 'Running' : null };
export interface _SERVICE {
  'ask' : ActorMethod<[string], string>,
  'get_brain_canister' : ActorMethod<[], [] | [Principal]>,
  'get_goal' : ActorMethod<[bigint], [] | [Goal]>,
  'get_owner' : ActorMethod<[], [] | [Principal]>,
  'insert_goal' : ActorMethod<[string], undefined>,
  'save_result' : ActorMethod<[bigint, string], undefined>,
  'update_owner' : ActorMethod<[Principal], undefined>,
}
