import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token {
  let owner: Principal = Principal.fromText("iqqsg-cuzs6-2rcx4-zhnfl-q54nm-tavos-hvkei-xc2e7-kbq7h-cubyr-5ae");
  let totalSupply: Nat = 1000000000;
  let symbol: Text = "DWAP";

  private stable var balanceEntries: [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  if(balances.size() < 1) {
    balances.put(owner, totalSupply);
  };

  public query func checkBalanceOf(who: Principal) : async Nat {
    let balance: Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public query func showSymbol() : async Text {
    return symbol;
  };

  public shared(msg) func payOut(): async Text {
    if(balances.get(msg.caller) == null) {
      let amount = 10000;
      let result = await transfer(msg.caller, amount);
      Debug.print(debug_show(msg.caller));
      return result;
    } else {
      return "Already Claimed";
    }
  };

  public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
    let fromBalance = await checkBalanceOf(msg.caller);
    if(fromBalance > amount) {
      let newBalanceFrom: Nat = fromBalance - amount;
      balances.put(msg.caller, newBalanceFrom);

      let toBalance = await checkBalanceOf(to); 
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "Success";
    } else {
      return "Insufficient Funds!";
    }
  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if(balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };

};
