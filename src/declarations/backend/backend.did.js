export const idlFactory = ({ IDL }) => {
  const MenuItem = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'category' : IDL.Text,
    'price' : IDL.Float64,
  });
  const ContactMessage = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const Reservation = IDL.Record({
    'id' : IDL.Nat,
    'date' : IDL.Text,
    'name' : IDL.Text,
    'time' : IDL.Text,
    'email' : IDL.Text,
    'guests' : IDL.Nat,
  });
  return IDL.Service({
    'addMenuItem' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Float64, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getAllMenuItems' : IDL.Func([], [IDL.Vec(MenuItem)], ['query']),
    'getContactMessage' : IDL.Func(
        [IDL.Nat],
        [IDL.Opt(ContactMessage)],
        ['query'],
      ),
    'getMenuItem' : IDL.Func([IDL.Nat], [IDL.Opt(MenuItem)], ['query']),
    'getReservation' : IDL.Func([IDL.Nat], [IDL.Opt(Reservation)], ['query']),
    'initializeMenuItems' : IDL.Func([], [], []),
    'makeReservation' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Nat],
        [IDL.Nat],
        [],
      ),
    'submitContactMessage' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
