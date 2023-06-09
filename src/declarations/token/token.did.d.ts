import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'checkBalanceOf' : (arg_0: Principal) => Promise<bigint>,
  'payOut' : () => Promise<string>,
  'showSymbol' : () => Promise<string>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
