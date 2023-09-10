export const idlFactory = ({ IDL }) => {
  const GoalStatus = IDL.Variant({
    'Complete' : IDL.Null,
    'Scheduled' : IDL.Null,
    'Running' : IDL.Null,
  });
  const Goal = IDL.Record({
    'status' : GoalStatus,
    'result' : IDL.Opt(IDL.Text),
    'updated_at' : IDL.Nat64,
    'goal' : IDL.Text,
    'created_at' : IDL.Nat64,
  });
  return IDL.Service({
    'ask' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get_brain_canister' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'get_goal' : IDL.Func([IDL.Nat64], [IDL.Opt(Goal)], ['query']),
    'get_owner' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'insert_goal' : IDL.Func([IDL.Text], [], []),
    'save_result' : IDL.Func([IDL.Nat64, IDL.Text], [], []),
    'update_owner' : IDL.Func([IDL.Principal], [], []),
  });
};
export const init = ({ IDL }) => {
  return [IDL.Opt(IDL.Principal), IDL.Opt(IDL.Principal)];
};
