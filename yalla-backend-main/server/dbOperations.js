// eslint-disable no-inner-declarations 
const { MongoClient } = require('mongodb');

var ObjectId = require('mongodb').ObjectId; 

const connect = async (url) => {
  try {
    const con = (await MongoClient.connect(url, {
      useNewUrlParser: true, useUnifiedTopology: true})).db();
      console.log("Connected to database");
      return con;
 } catch (err) {
    throw new Error(`cannot connect to the database with ${err}`);
  }
};

//const db = await connect('mongodb+srv://phlame:phlame@cluster0.n16ha.mongodb.net/phlame?retryWrites=true&w=majority')
//connect('mongodb+srv://phlame:phlame@cluster0.n16ha.mongodb.net/phlame?retryWrites=true&w=majority')

const addNgo = async (db, newNgo, name) => {
  newNgo.events = []; 
  newNgo._id = name; 
  try {
    const result = await db.collection('ngousers').insertOne(newNgo);
    const newPost = new Object(); 
    newPost.comments = []; 
    newPost.likes = []; 
    newPost.message = `${newNgo._id} has joined Phlame`
    addPost(db, newPost);
    return result;
  } catch (err) {
    throw new Error('cannot add new Ngo');
  }
};

const addUser = async (db, newUser, username) => {
    newUser.friends = []; 
    newUser.events = []; 
    newUser._id = username; 
    try {
        const result = await db.collection('users').insertOne(newUser);
        const newPost = new Object(); 
        newPost.comments = []; 
        newPost.likes = []; 
        newPost.message = `${newUser._id} has created a Phlame account`
        addPost(db, newPost); 
        return result;
      } catch (err) {
        throw new Error('cannot add new user');
      }
}

  const addEvent = async (db, newEvent) => {
    newEvent.attendees = []; 
    try {
      const result = await db.collection('events').insertOne(newEvent);
      const newPost = new Object(); 
      newPost.comments = []; 
      newPost.likes = []; 
      newPost.message = `${newEvent.creator} has created ${newEvent.name} on ${newEvent.date}`
      addPost(db, newPost); 
      return result;
    } catch (err) {
      throw new Error('cannot add new event');
    }
  }; 

  const addPost = async (db, newPost, username) => {
    newPost.comments = []; 
    newPost.likes = []; 
    newPost.date = Date.now()
    newPost.username = username; 
    try {
      const result = await db.collection('posts').insertOne(newPost);
      return result;
    } catch (err) {
      throw new Error('cannot add new post');
    }
  };

async function getUser(db, username) {
    //console.log(userid)
  try {
    const results = await db.collection('users').find({ _id: username }).toArray();
    //console.log(results);
    return results;
  } catch (err) {
    throw new Error(`cannot get user with ${err}`);
  }
}


  async function getNgo(db, name) {
    try {
      const results = await db.collection('ngousers').find({  _id: name }).toArray();
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error('cannot get NGO');
    }
  }

  async function getEvent(db, eventid) {
    try {
      const results = await db.collection('events').find({_id: ObjectId(eventid.eventid) }).toArray(); 
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error(`cannot get event with ${err}`);
    }
  }

  async function getTotalEvents(db) {
    try {
      const results = await db.collection('events').distinct('_id');
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error(`cannot get total events with ${err}`);
    }
  }

  async function getTotalRepPosts(db) {
      var finalRep = []
      const curr = await getTotalPosts(db)
      try {
          for (var i = 0; i < curr.length; i++) {
              const toAdd = await getPostbyObj(db, curr[i])
              finalRep.push(toAdd)
          }
          //console.log(finalRep)
          return finalRep
      } catch(err) {
        throw new Error(`cannot get total posts with ${err}`);
      }
  }

  async function getTotalRepNgos(db) {
    var finalRep = []
    const curr = await getTotalNgos(db)
    try {
        for (var i = 0; i < curr.length; i++) {
            const toAdd = await getNgo(db, curr[i])
            finalRep.push(toAdd)
        }
        //console.log(finalRep)
        return finalRep
    } catch(err) {
      throw new Error(`cannot get total ngos with ${err}`);
    }
}

async function getTotalRepEvents(db) {
    var finalRep = []
    const curr = await getTotalEvents(db)
    //console.log(curr)
    try {
        for (var i = 0; i < curr.length; i++) {
            const toAdd = await getEventbyObj(db, curr[i])
            finalRep.push(toAdd)
        }
        //console.log(finalRep)
        return finalRep
    } catch(err) {
      throw new Error(`cannot get total users with ${err}`);
    }
}

async function getTotalRepUsers(db) {
    var finalRep = []
    const curr = await getTotalUsers(db)
    //console.log(curr)
    try {
        for (var i = 0; i < curr.length; i++) {
            const toAdd = await getUser(db, curr[i])
            finalRep.push(toAdd)
        }
        //console.log(finalRep)
        return finalRep
    } catch(err) {
      throw new Error(`cannot get total users with ${err}`);
    }
}

  async function getPostbyObj(db, postid) {
    try {
      const results = await db.collection('posts').find({ _id: postid }).toArray();
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error('cannot get user');
    }
  }

  async function getEventbyObj(db, eventid) {
    try {
      const results = await db.collection('events').find({ _id: eventid }).toArray();
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error('cannot get user');
    }
  }

  async function getTotalUsers(db) {
    try {
      const results = await db.collection('users').distinct('_id');
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error(`cannot get total users with ${err}`);
    }
  }

  async function getTotalNgos(db) {
    try {
      const results = await db.collection('ngousers').distinct('_id');
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error(`cannot get total ngos with ${err}`);
    }
  }

  async function getTotalPosts(db) {
    try {
      const results = await db.collection('posts').distinct('_id');
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error(`cannot get total events with ${err}`);
    }
  }

  async function getPost(db, postid) {
    try {
      const results = await db.collection('posts').find({ _id: ObjectId(postid.postid) }).toArray();
      //console.log(results);
      return results;
    } catch (err) {
      throw new Error('cannot get user');
    }
  }

  /*const addFriend = async (db, username, friend) => {
    const currFriends1 = await getFriends(db, username.username)
   // const user1 = await getUser(db, friend.friend); 
    currFriends1.push(friend.friend); 
    const currFriends2 = await getFriends(db, friend.friend)
   // const user2 = await getUser(db, username.username); 
    currFriends2.push(username.username); 
    try {
      await db.collection('users').updateOne({ _id: username.username  }, { $set: { friends: currFriends1 } });
      await db.collection('users').updateOne({ _id: friend.friend }, { $set: { friends: currFriends2 } });
      const newPost = new Object(); 
      newPost.comments = []; 
      newPost.likes = []; 
      newPost.timestamp = Date.now()
      newPost.message = `${username.username} and ${friend.friend} became friends`
      addPost(db, newPost); 
    } catch (err) {
      throw new Error(`cannot add new friendship with ${err}`);
    }
  }; */

  /*const getFriends = async (db, username) => {
    try {
        const results = await db.collection('users').find({ _id: username }).toArray();
        const sol = results[0].friends; 
        return sol; 
      } catch (err) {
        throw new Error(`cannot get users friends with ${err}`);
      }
  }*/

  const deleteUser = async (db, username) => {
    try {
        const result = await db.collection('users').remove({_id:username});
        return result;
      } catch (err) {
        throw new Error(`cannot delete user with ${err}`);
      } 
  }

  const deleteNgo = async (db, name) => {
    try {
        const result = await db.collection('ngousers').remove({_id:name});
        return result;
      } catch (err) {
        throw new Error('cannot delete NGO');
      } 
  }

  const deleteEvent = async (db, eventid) => {
    try {
        const result = await db.collection('events').remove({_id:ObjectId(eventid._id)});
        return result;
      } catch (err) {
        throw new Error('cannot delete event');
      } 
  }

  const joinEvent = async (db, username, eventid) => {
    const currEvents = await getUserEvents(db, username)
    const event = await getEvent(db, eventid); 
    currEvents.push(eventid.eventid); 
    const currAttendees = await getAttendees(db, eventid)
   // const user = await getUser(db, username.username); 
    currAttendees.push(username.username); 
    try {
      await db.collection('users').updateOne({ _id: username.username }, { $set: { events: currEvents } });
      await db.collection('events').updateOne({ _id: ObjectId(eventid.eventid) }, { $set: { attendees: currAttendees } });
      const newPost = new Object(); 
      newPost.comments = []; 
      newPost.likes = []; 
      newPost.message = `${username.username} is going to volunteer at ${event[0].name}`
      addPost(db, newPost); 
    } catch (err) {
      throw new Error(`cannot join new event with ${err}`);
    }
  } 

  const leaveEvent = async (db, username, eventid) => {
    var currEvents = await getUserEvents(db, username)
    const event = await getEvent(db, eventid); 
    currEvents = currEvents.filter(item => item !== eventid.eventid)
    var currAttendees = await getAttendees(db, eventid)
    currAttendees = currAttendees.filter(item => item !== username.username)
    try {
      await db.collection('users').updateOne({ _id: username.username }, { $set: { events: currEvents } });
      await db.collection('events').updateOne({ _id: ObjectId(eventid.eventid) }, { $set: { attendees: currAttendees } });
      const newPost = new Object(); 
      newPost.comments = []; 
      newPost.likes = []; 
      newPost.message = `${username.username} is no longer going to volunteer at ${event[0].name}`
      addPost(db, newPost); 
    } catch (err) {
      throw new Error(`cannot join new event with ${err}`);
    }
  } 

  const getUserEvents = async (db, username) => {
      //console.log(username)
    try {
        const results = await db.collection('users').find({ _id: username.username }).toArray();
        const sol = results[0].events; 
        return sol; 
      } catch (err) {
        throw new Error(`cannot get users events + ${err}`);
      }
  }

  const getAttendees = async (db, eventid) => {
      //console.log(eventid)
    try {
        const results = await db.collection('events').find({ _id: ObjectId(eventid.eventid) }).toArray();
        const sol = results[0].attendees; 
        //console.log(sol)
        return sol; 
      } catch (err) {
        throw new Error('cannot get events attendees');
      }
  }

  const likePost = async (db, username, postid) => {
      const currLikes = await getPostLikes(db, postid.postid); 
      //const user = await getUser(db, username.username); 
      currLikes.push(username); 
      try {
        await db.collection('posts').updateOne({ _id: ObjectId(postid.postid) }, { $set: { likes: currLikes } });
      } catch (err) {
        throw new Error('cannot like post');
      }
  }

  const addComment = async (db, username, message, postid) => {
    const currComments = await getPostComments(db, postid.postid); 
    //const user = await getUser(db, username.username); 
    var toAdd = {
        'user': username, 
        'message': message, 
    };
    currComments.push(toAdd); 
    try {
      await db.collection('posts').updateOne({ _id: ObjectId(postid.postid) }, { $set: { comments: currComments } });
    } catch (err) {
      throw new Error('cannot comment on post');
    }
  }

  const getPostLikes = async (db, postid) => {
    try {
        const results = await db.collection('posts').find({ _id: ObjectId(postid) }).toArray();
        const sol = results[0].likes; 
        return sol; 
      } catch (err) {
        throw new Error(`cannot get posts list of likes with ${err}`);
      }
  }

const getFriendsPerOrg = async (db, name) => {
    console.log(name)
    var currUser; 
  if (name.username == null && name.name != null) {
      currUser = await getNgo(db, name.name); 
  } else if (name.name == null && name.username != null) {
      currUser = await getUser(db, name.username); 
  }
  const sol = currUser[0].friends; 
  var finalRep = []; 
  for (var i = 0; i < sol.length; i++) {
      var toAdd; 
      if (name.username == null && name.name != null) {
          toAdd = await getNgo(db, name.name); 
      } else if (name.name == null && name.username != null) {
          toAdd = await getUser(db, name.username); 
      }
      finalRep.push(toAdd)
  }
  return finalRep; 
}

  const getPostComments = async (db, postid) => {
    try {
        const results = await db.collection('posts').find({ _id: ObjectId(postid) }).toArray();
        const sol = results[0].comments; 
        return sol; 
      } catch (err) {
        throw new Error('cannot get posts list of comments ');
      }
  }

  const addFriend = async (db, name, friend) => {
    currFriends1 = await getFriends(db, {username: name.username}); 
    currFriends2 = await getFriends(db, {username: friend.friend}); 
    currFriends1.push(friend.friend); 
    currFriends2.push(name.username); 
    try {
        await db.collection('users').updateOne({ _id: name.username  }, { $set: { friends: currFriends1 } });
        await db.collection('users').updateOne({ _id: friend.friend }, { $set: { friends: currFriends2 } });
        const newPost = new Object(); 
        newPost.comments = []; 
        newPost.likes = []; 
        newPost.timestamp = Date.now()
        newPost.message = `${name.username} and ${friend.friend} became friends`
        addPost(db, newPost); 
    } catch(err) {
        throw new Error(`cannot add new friendship with ${err}`);
    }
}; 

    const getFriends = async (db, username) => {
        //console.log(username)
      try {
          const results = await db.collection('users').find({ _id: username.username }).toArray();
          const sol = results[0].friends; 
          return sol; 
        } catch (err) {
          throw new Error(`cannot get users friends with ${err}`);
        }
    }
  
    const getFriendsOfNgo = async (db, name) => {
      try {
          const results = await db.collection('ngousers').find({ _id: name.name }).toArray();
          const sol = results[0].friends; 
          return sol; 
        } catch (err) {
          throw new Error(`cannot get users friends with ${err}`);
        }
    }

    const getFriendsPerUser = async (db, username) => {
        //console.log(username)
      const currUser = await getUser(db, username); 
      const sol = currUser[0].friends; 
      var finalRep = []; 
      for (var i = 0; i < sol.length; i++) {
          //console.log(sol[i])
          const toAdd = await getUser(db, sol[i])
          finalRep.push(toAdd)
      }
      return finalRep; 
    }
  
    const getFriendsPerNgo = async (db, name) => {
      //console.log(name)
    const currUser = await getNgo(db, name); 
    const sol = currUser[0].friends; 
    var finalRep = []; 
    for (var i = 0; i < sol.length; i++) {
        //console.log(sol[i])
        const toAdd = await getNgo(db, sol[i])
        finalRep.push(toAdd)
    }
    return finalRep; 
  }

  const getEventsPerUser = async (db, username) => {
    const currUser = await getUser(db, username); 
    const sol = currUser[0].events; 
    var finalRep = []; 
    for (var i = 0; i < sol.length; i++) {
        const toAdd = await getEvent(db, {eventid: sol[i]})
        finalRep.push(toAdd)
    }
    //console.log(finalRep)
    return finalRep; 
  }

  const getEventsPerNgo = async (db, name) => {
    const currNgo = await getNgo(db, name); 
    const sol = currNgo[0].events; 
    var finalRep = []; 
    for (var i = 0; i < sol.length; i++) {
        const toAdd = await getEvent(db, {eventid: sol[i]})
        finalRep.push(toAdd)
    }
    return finalRep; 
  }
  

module.exports = {
  connect,
  addUser,
  addNgo, 
  deleteUser,
  getUser,
  getAttendees, 
  getEvent,
  getUserEvents, 
  joinEvent, 
  deleteNgo, 
  deleteEvent, 
  getFriends, 
getEventsPerUser,
getFriendsPerUser,
getFriendsPerNgo,
  addFriend, 
  getPost, 
  getNgo, 
  addEvent,
getEventsPerNgo,
  likePost, 
  addComment, 
  getPostLikes, 
  getPostComments,
  addPost, 
  leaveEvent,
  getFriendsOfNgo,
  getTotalEvents,
  getTotalUsers,
  getTotalNgos,
  getTotalPosts,
  getTotalRepPosts,
  getTotalRepNgos,
  getFriendsPerOrg,
  getTotalRepUsers,
  getTotalRepEvents
}; 

const main = async() => {
    const db = await connect('mongodb+srv://phlame:phlame@cluster0.n16ha.mongodb.net/phlame?retryWrites=true&w=majority')
    const newUser = new Object(); 
    newUser.username = "nafessaj"
    newUser.password = "nafessaj"
    newUser.interests = ["climate change", "environmental"] 
    newUser.commitment = "low"
    newUser.friends = []; 
    newUser.events = []; 
    newUser.age = 9; 
    await getTotalRepPosts(db); 

    //await addUser(db, newUser)
    //const passin = { username: 'nafessaj' }
    //await deleteUser(db, passin)
    //await getFriends(db, "nafessaj")
    //await addFriend(db, "nafessaj", "nafessaj1")
    //getUser(db, "nafessajhd")
}; 

main(); 
//connect();