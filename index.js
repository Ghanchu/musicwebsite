//this makes the page load before anything else is done

document.addEventListener('DOMContentLoaded', event => {

    //this is the beginning of the code, it reauires to submit your first and last name
    var form = document.getElementById('mom')
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        //get the first and last name from the form data 
        var firstname = document.getElementById('fname').value;
        var lastname = document.getElementById('lname').value;

        //here are the first and last name
        const data = {firstname, lastname};
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
                
                
            }
            
        
        };
        //here we are posting the first and last name data 

        fetch('http://localhost:3000/api/data', options)
             .then(response => response.json())
             .then(data => {
                console.log(data)
                document.getElementById('response').innerHTML = data.message;

                //this returns true if you are a person in the data set and false if you are not in a person in the data set 

                if(!(data.success)) {
                    document.getElementById('doingyomom').classList.remove("hidden")
                    document.getElementById('singup').innerHTML = "put your first and last name in the form to sign up and then hit the button ^^^^^^^^^^^^^^^^^";
                    var button = document.getElementById('doingyomom');
                    button.addEventListener('click', function(event) {
                        event.preventDefault();
                        var firstname = document.getElementById('fname').value
                        var lastname = document.getElementById('lname').value
                        const data = {firstname, lastname};
                        const options = {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type' : 'application/json'
                                
                                
                            }
                        };
                        //this submits your first and last name if you were not in the system

                        fetch('http://localhost:3000/response', options)
                            .then(response => response.text())
                            .then(data => {
                                document.getElementById('postsign').innerHTML = data;
                            })
                        
                    })
                }
             })

             //this returns the person that was assigned to you for this week

             .then(() => {

                    // this piece of code right here unhides a bunch of fields and 
                    // asks what song you would like to submit for this week
                    document.getElementById('lolol').classList.remove('hidded')
                    fetch('http://localhost:3000/myperson')
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('abran').innerHTML = data.name;
                        })
                    var form = document.getElementById('musicsubmit');
                    form.addEventListener('submit', function(event) {
                        event.preventDefault();
                        var mname = document.getElementById('mname').value;
                        const data = {mname};
                        const options = {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type' : 'application/json'
                            }
                        };
                        //this posts the song that you want to submit to your person for the week to the server

                        fetch('http://localhost:3000/givesong', options)
                            .then(response => response.text())
                            .then(data => {
                                console.log(data)
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
            })
             .then(() => {
                fetch('http://localhost:3000/music')
                    .then(response => response.json())
                    .then(data => document.getElementById('musicoftheweek').innerHTML = "your song is " + data.music)

             })
             .catch(error => {
                console.log('Error:', error);
             })
             
       
       
     
        

    })




    
})



