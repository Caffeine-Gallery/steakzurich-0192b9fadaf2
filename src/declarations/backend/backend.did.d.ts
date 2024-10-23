import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ContactMessage {
  'id' : bigint,
  'name' : string,
  'email' : string,
  'message' : string,
  'timestamp' : bigint,
}
export interface MenuItem {
  'id' : bigint,
  'name' : string,
  'description' : string,
  'category' : string,
  'price' : number,
}
export interface Reservation {
  'id' : bigint,
  'date' : string,
  'name' : string,
  'time' : string,
  'email' : string,
  'guests' : bigint,
}
export interface _SERVICE {
  'addMenuItem' : ActorMethod<[string, string, number, string], bigint>,
  'getAllMenuItems' : ActorMethod<[], Array<MenuItem>>,
  'getContactMessage' : ActorMethod<[bigint], [] | [ContactMessage]>,
  'getMenuItem' : ActorMethod<[bigint], [] | [MenuItem]>,
  'getReservation' : ActorMethod<[bigint], [] | [Reservation]>,
  'initializeMenuItems' : ActorMethod<[], undefined>,
  'makeReservation' : ActorMethod<
    [string, string, string, string, bigint],
    bigint
  >,
  'submitContactMessage' : ActorMethod<[string, string, string], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
