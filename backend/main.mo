import Float "mo:base/Float";
import Hash "mo:base/Hash";
import Int "mo:base/Int";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor Steakhouse {
  // Types
  type MenuItem = {
    id: Nat;
    name: Text;
    description: Text;
    price: Float;
    category: Text;
  };

  type Reservation = {
    id: Nat;
    name: Text;
    email: Text;
    date: Text;
    time: Text;
    guests: Nat;
  };

  type ContactMessage = {
    id: Nat;
    name: Text;
    email: Text;
    message: Text;
    timestamp: Int;
  };

  // State variables
  stable var nextMenuItemId: Nat = 0;
  stable var nextReservationId: Nat = 0;
  stable var nextContactMessageId: Nat = 0;

  let menuItems = HashMap.HashMap<Nat, MenuItem>(0, Nat.equal, Nat.hash);
  let reservations = HashMap.HashMap<Nat, Reservation>(0, Nat.equal, Nat.hash);
  let contactMessages = HashMap.HashMap<Nat, ContactMessage>(0, Nat.equal, Nat.hash);

  // Menu Item functions
  public func addMenuItem(name: Text, description: Text, price: Float, category: Text) : async Nat {
    let id = nextMenuItemId;
    nextMenuItemId += 1;
    let menuItem: MenuItem = {
      id;
      name;
      description;
      price;
      category;
    };
    menuItems.put(id, menuItem);
    id
  };

  public query func getMenuItem(id: Nat) : async ?MenuItem {
    menuItems.get(id)
  };

  public query func getAllMenuItems() : async [MenuItem] {
    Iter.toArray(menuItems.vals())
  };

  // Reservation functions
  public func makeReservation(name: Text, email: Text, date: Text, time: Text, guests: Nat) : async Nat {
    let id = nextReservationId;
    nextReservationId += 1;
    let reservation: Reservation = {
      id;
      name;
      email;
      date;
      time;
      guests;
    };
    reservations.put(id, reservation);
    id
  };

  public query func getReservation(id: Nat) : async ?Reservation {
    reservations.get(id)
  };

  // Contact Message functions
  public func submitContactMessage(name: Text, email: Text, message: Text) : async Nat {
    let id = nextContactMessageId;
    nextContactMessageId += 1;
    let contactMessage: ContactMessage = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactMessages.put(id, contactMessage);
    id
  };

  public query func getContactMessage(id: Nat) : async ?ContactMessage {
    contactMessages.get(id)
  };

  // Helper function to initialize some menu items
  public func initializeMenuItems() : async () {
    ignore await addMenuItem("Filet Mignon", "Tender and lean beef tenderloin", 49.99, "Steaks");
    ignore await addMenuItem("Ribeye", "Well-marbled and flavorful", 44.99, "Steaks");
    ignore await addMenuItem("New York Strip", "Classic cut with a fine texture", 39.99, "Steaks");
    ignore await addMenuItem("Lobster Tail", "Succulent lobster tail with drawn butter", 59.99, "Seafood");
    ignore await addMenuItem("Truffle Mac and Cheese", "Creamy pasta with black truffle", 19.99, "Sides");
  };
}
