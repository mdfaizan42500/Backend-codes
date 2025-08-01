let body = {

        //it will print the data line in postman 
        // method : "GET"

        // it will create new data
        method : "POST",
        body : JSON.stringify({
            "title" : "new todo",
            "desc" : "todo from frontend"
        }),
        // to define the type of data that we are send else it will not be shown in the server
        headers : {
            "Content-Type" : "application/json",
        }
    }


// this function is used as frontend
async function frontend() {
    let data = await fetch("http://localhost:3000/todos/",body)
    let jsonData = await data.json()
    console.log(jsonData)
}
frontend()