export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkBalanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'payOut' : IDL.Func([], [IDL.Text], []),
    'showSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
