//this is the main server that listens for fetch request and other things


const express = require('express');
const cors = require('cors');
const app = express();
var handle = require('./handler.js')
var person = require('./person.js')
app.use(cors());

app.listen(3000, () => console.log("listening at 3000"));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static('public'))
app.use(express.json());

//up to this point is a bunch of boilerplate code 
trackedname = new person.CurrentValues("null");
//this is the server side processing for checking whether you are in the server or not
app.post('/api/data', async (request, response) => {
  value = await handle.handler(person.retrieveuserdatabyperson, request.body.firstname).then(value => {return value});
  if(value) {

    // returns a true value if you are in the database along with a welcome message
    const data = 
      {
        message: "Welcome back " + request.body.firstname + " you are in our database",
        success: true
      };

      trackedname.changename(request.body.firstname);
      console.log(trackedname.getfirstname())
      response.json(data);
  
    }

    // if you are not in the database this returns a false value and you allows you submit a new username

  else {
    const data = 
      {
        message: "Hello " + request.body.firstname + " you are not in our database",
        success: false
      };
      response.json(data);
                                                                                            
    }
  response.end()

  

});

// this piece of code right here will sign you up if you are not in the server

app.post('/response', async (request, response) => {
  object = {name: request.body.firstname};
  await handle.handler(person.writeuserdata, object);
  trackedname.changename(request.body.firstname);
  console.log(trackedname.getfirstname())
  response.send("Thank you for signing up " + request.body.firstname + " " + request.body.lastname);
  response.end();
})

app.get('/music', async (request, response) => {
  value = await handle.handler(person.retrieveusersong, trackedname.getfirstname());
  if(value) {
    const data = 
      {
        music: value
      };
      response.json(data);
  }

  else {
    const data = {
      music: "your person has not submitted a song for this week because they are a bitch, consult your person about how they are a bitch"
    };
    response.json(data)
  }
  
  
  response.end();
  
})

// this piece of code returns the person who you must give a song to this week

app.get('/myperson', async (request, response) => {
  const data = 
  {
    name: await handle.handler(person.retrieveuserperson, trackedname.getfirstname())
  };
  response.json(data);
  response.end();

})

app.post('/givesong', async (request, response) => {
  object = {
    person: trackedname.getfirstname(),
    song: request.body.mname
  };
  await handle.handler(person.insertsong, object);
  response.send("your song has been recorded in our database");
  response.end();
})



