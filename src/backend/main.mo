import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  type Submission = {
    name : Text;
    email : Text;
    phone : Text;
    companyName : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compareByTimestamp(sub1 : Submission, sub2 : Submission) : Order.Order {
      Int.compare(sub1.timestamp, sub2.timestamp);
    };
  };

  let submissions = Map.empty<Principal, Submission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, companyName : Text, message : Text) : async () {
    let timestamp = Time.now();
    let submission : Submission = {
      name;
      email;
      phone;
      companyName;
      message;
      timestamp;
    };
    submissions.add(caller, submission);
  };

  // Admin-only function to retrieve all submissions sorted by timestamp
  public shared ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray().sort(Submission.compareByTimestamp);
  };
};
