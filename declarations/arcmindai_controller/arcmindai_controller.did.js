export const idlFactory = ({ IDL }) => {
  const ChatRole = IDL.Variant({
    'System' : IDL.Null,
    'User' : IDL.Null,
    'ArcMind' : IDL.Null,
  });
  const ChatHistory = IDL.Record({
    'content' : IDL.Text,
    'role' : ChatRole,
    'created_at' : IDL.Nat64,
  });
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
    'clear_all_goals' : IDL.Func([], [], []),
    'get_beamfi_canister' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'get_brain_canister' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'get_chathistory' : IDL.Func([], [IDL.Vec(ChatHistory)], ['query']),
    'get_goal' : IDL.Func([IDL.Nat64], [IDL.Opt(Goal)], ['query']),
    'get_max_num_thoughts_allowed' : IDL.Func([], [IDL.Nat64], ['query']),
    'get_num_thoughts_processed' : IDL.Func([], [IDL.Nat64], ['query']),
    'get_owner' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'get_tools_canister' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'get_vector_canister' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'inc_max_num_thoughts_limit' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat32],
        [],
        [],
      ),
    'insert_goal' : IDL.Func([IDL.Text], [], []),
    'is_exceed_max_num_thoughts_allowed' : IDL.Func([], [IDL.Bool], ['query']),
    'start_new_goal' : IDL.Func([IDL.Text], [], []),
    'toggle_pause_cof' : IDL.Func([], [], []),
    'update_owner' : IDL.Func([IDL.Principal], [], []),
  });
};
export const init = ({ IDL }) => {
  return [
    IDL.Opt(IDL.Principal),
    IDL.Opt(IDL.Principal),
    IDL.Opt(IDL.Principal),
    IDL.Opt(IDL.Principal),
    IDL.Opt(IDL.Principal),
    IDL.Opt(IDL.Text),
    IDL.Opt(IDL.Text),
  ];
};
