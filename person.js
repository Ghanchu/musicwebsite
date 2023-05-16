

var person = {

  CurrentValues: class {
    constructor(firstname) {
      this.firstname = firstname;
    }

    getfirstname() {
      return this.firstname;
    }

    changename(name) {
      this.firstname = name;
    }
  },
  // retrivers a document just by the username of the person
  retrieveuserdatabyperson: async function(client, person) {
    person = person.charAt(0).toUpperCase() + person.slice(1);
    const result = await client.db("maindata").collection("person").findOne({name: person}).then(result => {return result});
    if(result) {
      return true;
    }
    else {
      return false;
    }
    
  },
  
  //writes an object back as a document
  writeuserdata: async function(client, object) {
    const result = await client.db("maindata").collection("person").insertOne(object);
    if(result) {
      
    } else {
      console.log("Did not find anyone with this thing");
    }

  },

  
  //sorts all new individuals for a new week
  sort: async function(client, object) {
    result = await client.db("maindata").collection("person").find({}).toArray() 
    choose = result;
    size = result.length
    offset = size
    while(offset == size) {offset = Math.floor(Math.random() * size) + 1}; 
    for(i = 0; i<size; i++) {
      result[i].song.Giver = choose[(offset+i)%size]._id
      myQuery = {name: result[i].name}
      poop = {MySong: result[i].song.MySong, Giver: result[i].song.Giver};
      newvalue = {$set: {song: poop}}
      await client.db("maindata").collection("person").updateOne(myQuery, newvalue);

    }
    

    
  
  },

  retrieveusersong: async function(client, person) {
    console.log(person);
    result = await client.db("maindata").collection("person").findOne({name: person})
    human = await client.db("maindata").collection("person").findOne({_id: result.song.Giver});
    return human.song.MySong

  },

  // this function takes a person, and returns the person to whom they must give a song to this week

  retrieveuserperson: async function(client, person) {
    result = await client.db("maindata").collection("person").findOne({'name': person});
    lookfor = result._id;
    people = await client.db("maindata").collection("person").findOne({"song.Giver": lookfor})
    return people.name;
    
  },

  insertsong: async function(client, myobject) {
    myQuery = {name: myobject.person};
    newValue = { $set: {"song.MySong": myobject.song}}
    await client.db("maindata").collection("person").updateOne(myQuery, newValue);
  }

  



};

module.exports = person;






 