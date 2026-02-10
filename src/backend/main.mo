import Map "mo:core/Map";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Blog Post Types and Functions
  type PostCategory = {
    #workshops;
    #stageShows;
    #interviews;
    #theatreNews;
  };

  module PostCategory {
    public func toText(category : PostCategory) : Text {
      switch (category) {
        case (#workshops) { "workshops" };
        case (#stageShows) { "stageShows" };
        case (#interviews) { "interviews" };
        case (#theatreNews) { "theatreNews" };
      };
    };
  };

  type Post = {
    id : Nat;
    title : Text;
    content : Text;
    category : PostCategory;
    timestamp : Time.Time;
  };

  module Post {
    public func compare(p1 : Post, p2 : Post) : Order.Order {
      Int.compare(p2.timestamp, p1.timestamp);
    };
  };

  let posts = Map.empty<Nat, Post>();
  var nextPostId = 1;

  // Seed example posts
  public shared ({ caller }) func seedPosts() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed posts");
    };

    let examplePosts = [
      {
        title = "Upcoming Improv Workshop";
        content = "Join us for an exciting improv workshop with industry experts.";
        category = #workshops;
      },
      {
        title = "New Play Premier Announced";
        content = "We're thrilled to announce the premier of our latest stage production.";
        category = #stageShows;
      },
      {
        title = "Backstage Interview: Director Jane Doe";
        content = "Exclusive interview with renowned theatre director Jane Doe.";
        category = #interviews;
      },
      {
        title = "Theatre Renovation Updates";
        content = "Read about the latest renovations to our historic theatre building.";
        category = #theatreNews;
      },
      {
        title = "Acting Techniques Masterclass";
        content = "Masterclass on advanced acting techniques by acclaimed actor John Smith.";
        category = #workshops;
      },
      {
        title = "Musical Revue Extravaganza";
        content = "Get ready for a spectacular musical revue featuring hit Broadway numbers.";
        category = #stageShows;
      },
    ];

    for (i in examplePosts.keys()) {
      let post = examplePosts[i];
      posts.add(
        nextPostId,
        {
          id = nextPostId;
          title = post.title;
          content = post.content;
          category = post.category;
          timestamp = Time.now();
        },
      );
      nextPostId += 1;
    };
  };

  // List all posts (newest first) - Public access
  public query ({ caller }) func listPosts() : async [Post] {
    posts.values().toArray().sort();
  };

  // Get post by ID - Public access
  public query ({ caller }) func getPost(id : Nat) : async Post {
    switch (posts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) { post };
    };
  };

  // Filter posts by category - Public access
  public query ({ caller }) func filterPostsByCategory(category : PostCategory) : async [Post] {
    posts.values().toArray().filter(func(post) { post.category == category }).sort();
  };

  // Admin-only: create post
  public shared ({ caller }) func createPost(title : Text, content : Text, category : PostCategory) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create posts");
    };

    let post = {
      id = nextPostId;
      title;
      content;
      category;
      timestamp = Time.now();
    };
    posts.add(nextPostId, post);
    let postId = nextPostId;
    nextPostId += 1;
    postId;
  };

  // Admin-only: update post
  public shared ({ caller }) func updatePost(id : Nat, title : Text, content : Text, category : PostCategory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update posts");
    };

    switch (posts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?_) {
        let updatedPost = {
          id;
          title;
          content;
          category;
          timestamp = Time.now();
        };
        posts.add(id, updatedPost);
      };
    };
  };

  // Admin-only: delete post
  public shared ({ caller }) func deletePost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };

    switch (posts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?_) {
        posts.remove(id);
      };
    };
  };
};
