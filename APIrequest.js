const requestOptions = {
    method : "POST",
    headers: {
        'Content-Type' : 'application/json',
        Authorization: 'Bearer your_token_here',
    },
    body : JSON.stringify({
        name : 'John Doe',
        email : 'johndoe@gmail.com',
        age: 30,
    }),

};

fetch('http://api.example.com/users', requestOptions);

//fetch is the function responsible for making the API call itself. It abstracts away the complexities of all the networking done under the hood to make the connection between the target server and the client code.


//Server-side API for creating an API response

app.post("/users", (req, res) => {
    const userData = req.body;
    if(userData){
        res.status(200).json({
            message : "User created succesfully."
        })
    }
    else{
        res.status(400).json({
            message: "Failed to create user. Missing data."
        })
    }
});