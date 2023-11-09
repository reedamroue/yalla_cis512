// import express
const express = require('express');

// create our express app
const webapp = express();

const bodyParser = require('body-parser');

const cors = require("cors")

// import database functions
const lib = require('./dbOperations');
// declare the database object
let db;

// MongoDB URL
const url = 'mongodb+srv://phlame:phlame@cluster0.n16ha.mongodb.net/phlame?retryWrites=true&w=majority';

// configure the app to handle JSON and to parse request body
/*webapp.use(express.json());
webapp.use(cors())
webapp.use(express.urlencoded({
  extended: false,
}));*/
webapp.use(cors())
webapp.use(bodyParser.json());
webapp.use(bodyParser.urlencoded({ extended: false }));

/*webapp.use(bodyParser.urlencoded({
    extended: true
}))*/

//webapp.use(bodyParser.json())

/*webapp.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Accept, Content-Type")
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000")
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH")
    next()
})*/

// implement the endpoints
// Root endpoint
webapp.get('/', (req, resp) => resp.json({ message: 'Welcome to Phlame' }));

webapp.post('/adduser', async (req, resp) => {
    if (!req.body.username || !req.body.password || !req.body.age || !req.body.interests || !req.body.goal ) {
        return resp.status(404).json({ error: 'not all fields filled out!' });
    } try {
        const newUser = new Object(); 
        //newUser._id = req.body.username; 
        newUser.password = req.body.password; 
        newUser.age = req.body.age; 
        newUser.interests = req.body.interests; 
        newUser.goal = req.body.goal; 
        await lib.addUser(db,  newUser, req.body.username ); 
        return resp.status(201).json({ message: `User added with name ${req.body.username}` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.post('/addngo', async (req, resp) => {
    if (!req.body.name || !req.body.goal || !req.body.password || !req.body.description || !req.body.location || !req.body.contact ) {
        return resp.status(404).json({ error: 'not all fields filled out!' });
    } try {
        const newNgo = new Object(); 
        newNgo.description = req.body.description; 
        newNgo.location = req.body.location; 
        newNgo.contact = req.body.contact; 
        newNgo.goal = req.body.goal; 
        newNgo.password = req.body.password; 
        await lib.addNgo(db, newNgo, req.body.name); 
        return resp.status(201).json({ message: `Ngo added with name ${req.body.name}` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.post('/addevent', async (req, resp) => {
    if (!req.body.name || !req.body.date || !req.body.address || !req.body.city || !req.body.state || !req.body.zipcode || !req.body.starttime || !req.body.endtime || !req.body.description || !req.body.requirements ) {
        return resp.status(404).json({ error: 'not all fields filled out!' });
    } try {
        const newEvent = new Object(); 
        newEvent.name = req.body.name; 
        newEvent.date = req.body.date; 
        newEvent.address = req.body.address; 
        newEvent.city = req.body.city; 
        newEvent.state = req.body.state; 
        newEvent.zipcode = req.body.zipcode; 
        newEvent.starttime = req.body.starttime; 
        newEvent.endtime = req.body.endtime; 
        newEvent.description = req.body.description; 
        newEvent.requirements = req.body.requirements; 
        newEvent.comments = req.body.comments; 
        await lib.addEvent(db, newEvent ); 
        return resp.status(201).json({ message: `Event added with name ${req.body.name}` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.post('/addpost', async (req, resp) => {
    if (!req.body.message || !req.body.username) {
        return resp.status(404).json({ error: 'empty post message' });
    } try {
        const newPost = new Object(); 
        newPost.message = req.body.message; 
        newPost.event = req.body.event; 
        await lib.addPost(db, newPost, req.body.username); 
        return resp.status(201).json({ message: `New Post added to wall` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.get('/getuser/:username', async (req, resp) => {
    if (!req.params.username) {
        return resp.status(404).json({ error: 'username not provided' });
    }
    try {
      const results = await lib.getUser(db, req.params.username );
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: `try again later with ${err}` });
    }
  });

webapp.get('/getngo/:name', async (req, resp) => {
    if (!req.params.name) {
        return resp.status(404).json({ error: 'NGO name not provided' });
    }
    try {
      const results = await lib.getNgo(db, req.params.name );
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

webapp.get('/getevent/:eventid', async (req, resp) => {
    if (!req.params.eventid) {
        return resp.status(404).json({ error: 'eventid not provided' });
    }
    try {
      const results = await lib.getEvent(db, { eventid: req.params.eventid });
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: `try again later with ${err}` });
    }
  });

  webapp.get('/getEventsPerUser/:username', async (req, resp) => {
    if (!req.params.username) {
        return resp.status(404).json({ error: `not all data points inputted` });
    } try {
      const results = await lib.getEventsPerUser(db, req.params.username);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getEventsPerNgo', async (_req, resp) => {
    if (!req.body.name) {
        return resp.status(404).json({ error: `not all data points inputted` });
    } try {
      const results = await lib.getEventsPerNgo(db, req.body.name);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

webapp.get('/getpost/:postid', async (req, resp) => {
    if (!req.params.postid) {
        return resp.status(404).json({ error: 'postid not provided' });
    }
    try {
      const results = await lib.getPost(db, { postid: req.params.postid });
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getTotalEvents', async (_req, resp) => {
    try {
      const results = await lib.getTotalEvents(db);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getTotalRepPosts', async (_req, resp) => {
    try {
      const results = await lib.getTotalRepPosts(db);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getTotalRepEvents', async (_req, resp) => {
    try {
      const results = await lib.getTotalRepEvents(db);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getTotalRepNgos', async (_req, resp) => {
    try {
      const results = await lib.getTotalRepNgos(db);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getTotalRepUsers', async (_req, resp) => {
    try {
      const results = await lib.getTotalRepUsers(db);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getTotalUsers', async (_req, resp) => {
    try {
      const results = await lib.getTotalUsers(db);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getTotalPosts', async (_req, resp) => {
    try {
      const results = await lib.getTotalPosts(db);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: `try again later with ${err}` });
    }
  });

  webapp.get('/getTotalNgos', async (_req, resp) => {
    try {
      const results = await lib.getTotalNgos(db);
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.put('/addfriend', async (req, resp) => {
    if (!req.body.friend || !req.body.username) {
        return resp.status(404).json({ error: `friend data points inputted` });
    } try {
            await lib.addFriend(db, { username: req.body.username }, { friend: req.body.friend }); 
        return resp.status(201).json({ message: `New Friend created` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.get('/getfriends/:username', async (req, resp) => {
    if (!req.params.username ) {
        return resp.status(404).json({ error: 'username not provided' });
    } try {
      const results = await lib.getFriends(db, req.params.username );
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: `try again later with ${err}` });
    }
  });

webapp.get('/getFriendsPerOrg', async (req, resp) => {
    var results; 
try {
  if (req.body.username != null) {
      results = await lib.getFriendsPerOrg(db, {username: req.body.username});
  } else if (req.body.name != null) {
      results = await lib.getFriendsPerOrg(db, {name: req.body.name});
  }
    return resp.status(200).json({ data: results });
  } catch (err) {
    return resp.status(500).json({ error: `try again later with ${err}` });
  }
});

webapp.get('/getfriendsofuser/:username', async (req, resp) => {
    if (!req.params.username ) {
        return resp.status(404).json({ error: 'username not provided' });
    } try {
      const results = await lib.getFriendsPerUser(db, req.params.username );
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: `try again later with ${err}` });
    }
  });

  webapp.get('/getfriendsofngo/:name', async (req, resp) => {
    if (!req.params.name ) {
        return resp.status(404).json({ error: 'ngo not provided' });
    } try {
      const results = await lib.getFriendsPerNgo(db, req.params.name );
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: `try again later with ${err}` });
    }
  });


webapp.delete('/deleteuser/:username', async (req, resp) => {
    if (!req.params.username) {
      return resp.status(404).json({ error: 'username not provided' });
    } try {
      await lib.deleteUser(db, req.params.username );
      // send the response
      return resp.status(202).json({ message: `Player deleted with name ${req.params.username}` });
    } catch (err) {
      return resp.status(500).json({ error: `try again later with ${err}` });
    }
  });
  
webapp.delete('/deletengo/:name', async (req, resp) => {
    if (!req.params.name) {
      return resp.status(404).json({ error: 'NGO id not provided' });
    } try {
      await lib.deleteNgo(db, req.params.name );
      // send the response
      return resp.status(202).json({ message: `NGO deleted with name ${req.params.name}` });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.delete('/deleteevent/:eventid', async (req, resp) => {
    if (!req.params.eventid) {
      return resp.status(404).json({ error: 'Event id not provided' });
    } try {
      await lib.deleteEvent(db, { _id: req.params.eventid });
      // send the response
      return resp.status(202).json({ message: `Event deleted with name ${req.params.eventid}` });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.put('/joinevent', async (req, resp) => {
    if (!req.body.username || !req.body.eventid) {
        return resp.status(404).json({ error: 'not all data points inputted' });
    } try {
        await lib.joinEvent(db, { username: req.body.username }, { eventid: req.body.eventid }); 
        return resp.status(201).json({ message: `New event joined` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.put('/leaveevent', async (req, resp) => {
    if (!req.body.username || !req.body.eventid) {
        return resp.status(404).json({ error: 'not all data points inputted' });
    } try {
        await lib.leaveEvent(db, { username: req.body.username }, { eventid: req.body.eventid }); 
        return resp.status(201).json({ message: `New event left` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.get('/getuserevents/:username', async (req, resp) => {
    if (!req.params.username) {
        return resp.status(404).json({ error: 'username not provided' });
    } try {
      const results = await lib.getUserEvents(db, { username: req.params.username });
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

webapp.get('/getattendees/:eventid', async (req, resp) => {
    if (!req.params.eventid) {
        return resp.status(404).json({ error: 'eventid not provided' });
    } try {
      const results = await lib.getAttendees(db, { eventid: req.params.eventid });
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.put('/likepost', async (req, resp) => {
    if (!req.body.username || !req.body.postid) {
        return resp.status(404).json({ error: 'not all data points inputted' });
    } try {
        await lib.likePost(db, { username: req.body.username }, { postid: req.body.postid }); 
        return resp.status(201).json({ message: `Post successfully liked` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.put('/addcomment', async (req, resp) => {
    if (!req.body.username || !req.body.postid || !req.body.message ) {
        return resp.status(404).json({ error: 'not all data points inputted' });
    } try {
        await lib.addComment(db, { username: req.body.username }, { message: req.body.message }, { postid: req.body.postid }); 
        return resp.status(201).json({ message: `Comment successfully added` });
    } catch (err) {
        return resp.status(500).json({ error: `try again later with ${err}`});
    }
})

webapp.get('/getpostlikes', async (req, resp) => {
    if (!req.body.postid) {
        return resp.status(404).json({ error: 'postid not provided' });
    } try {
      const results = await lib.getPostLikes(db, { postid: req.body.postid });
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

  webapp.get('/getpostcomments', async (req, resp) => {
    if (!req.body.postid) {
        return resp.status(404).json({ error: 'postid not provided' });
    } try {
      const results = await lib.getPostComments(db, { postid: req.body.postid });
      return resp.status(200).json({ data: results });
    } catch (err) {
      return resp.status(500).json({ error: 'try again later' });
    }
  });

// declare the port
const port = process.env.PORT || 5001;

// start the app and connect to the DB
webapp.listen(port, async () => {
  db = await lib.connect(url);
  console.log(`Express server running on port:${port}`);
});

module.exports = webapp;