# Todo Application - A Productivity App

## How to Build / Run

First, clone the project using :

```bash
git clone git@github.com:Nexus-coder/pet_adoption_app.git
```

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

This is a todo application built using the MERN stack.The project is a really common productivity tool that is used quite frequently.the reason I made it was to further my express javascript skills.


### Screenshot

![](./todo.png)


### Links

- Live Site URL: [Todo Application](https://pet-adoption-app-theta.vercel.app/)

## My Process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Desktop-first workflow
- [React](https://reactjs.org/) - JS library
- Express - NodeJS Framework


### What I learned

From this project I have learnt to use clusters and worker threads and also learnt the difference that clusters allow the server to be run cocurrently on different cores or logical cpu while worker threads just make the instance of the same code in the same file.

I have learnt to do this using the pm2 library which is very handy in helping one to manage processes.

To see how you can add code snippets, see below:

```js
export default async function fetchSearch({ queryKey }) {
    const { animal, location, breed } = queryKey[1];
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
    if (!res.ok) { throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`); }
    return res.json();
}
```

Also from the project I have gotten experience scripting with npm and boosting my productivity.

Finally I have also learnt how to use Mongodb as a database knew it before but I have now gotten better understanding of it.

Also generally i have learnt how to apply node best practices on my projects that i will probably use from now on.

### MVC

#### Controllers

Using the mvc architecture the route handlers are our controllers in this case cause they change how our data looks like

Use named functions instead of arrow functions because node can easily identify the named function easier when an error occurs.

#### Models
Now the model is the representation of our data regardless of where it comes from even the database.What this says is we can have the data in multiple views from  multiple dbs.

#### Views
The view is how the client or the initiator of a request views the data.This can b usefull for abstraction as the client can only see what is useful to them and the rest remains hidden

#### Scripting
So on scripting we use the package.json in the parent folder to run script simultaneously in the the individual folder.
This can be done better using npm scripts eg. ```bash --prefix ```
The prefix command runs the specified script in the folder referenced eg
```bash npm run start --prefix client``` 
The code above runs the specified  script in the client folder.

#### Testing
Then there is testing and this is testing with  jest
To test with jest you use ```bash npm run test``` which basically runs ```bash jest ``` in the background.
The javascript code is 

```js 
  describe("Test GET /categories", () => {
    test("It should respond with code 200 success", async () => {
      //Calls the app object adds a listen function and then allows you to make requests directly against the resulting http server
      //Just the browser's fetch function
      const response = await request(app)
        .get("/categories")
        .expect("Content-type", /json/)
        .expect(200);

      // expect(response.statusCode).toBe(200);
    });
  });
```
Describe method makes a block of our defined tests

#### Optimizing techniques
We can use ```bash pm2 start server.js -l log.txt -i max``` to cluster our application
We use the i to set the instances and a number or max to set the maximum number of instances available to use.
We use the -l log.txt to send the data to te log.txt
Cluster module is a good way for load balancing and optimization techniques.
We do not use pm2 as much during development.
We can use ```bash pm2 show``` to show info about a specific service.
We can use ```bash pm2 monit``` to show a beautiful monitor to use

*Zero Down Time*
We can use ```bash pm2 reload server``` to show a beautiful monitor to use
This is the best way for live servers with users

### Sessions 
This is data that is useful to the user while they are browsing
For example a user when they are buying items in an e-commerce store.
Store data about the current web user that is logged in to the application.
we have two types of sessions a client side session and a server side session in reference to where the data is stored.
When we use the client then cookies are used as our sessions.

Depeding on the one of the methods listed above we either use staefu cookies or stateless cookies.
A stateful cookie is one that holds some id to a session that lives somewhere on the server
We use them when doing server side sessions.
So the id is loooked up on the session database however it can be hard to scale since it would mean performing reads and writes on every user 

Stateless cookies/ Client side cookies
All the information needed lives on the client side already
Each piece of session data corresponds to one cookie value.
The server signs the cookies before sending them back to us to prevent the cookie from being tampered with.
The server signs the coolie with a secret that is only available to the server.

There are different benefits to storing the sessions in the above ways.
If we are concerned about the data in our session then we can keep the information on the server side.
Also when we are playing a game its ok for a user to see their score but it is not ok for them to change their score.
Only the server has a key to sign the cookie this siplifies our backend.
Cookies are limited by size by the server. 

We also do not need to waste a lot of data sending the
### Serving the frontend via the express application
Just build the frontend and serve the assets and build via te express app.

### Organization

### Continued development

I will continue learning on how to make use of the express framework to bring a lot of projects to life and thus it has been a really amazing time learning all the concepts down to even learning how to test using jest.I will continue using the above guides even as I build more web applications that can serve users with a seamless experience while also mainting the best developer practices.

### Useful resources

- [Express Docs](https://expressjs.com/) - This helped me in bringing the express application to life and also searching for the solutions to bugs where I encountered them

## Author

- Website - [Portfolio](https://portfolio-page-navy-eight.vercel.app/)
- Twitter - [@AndrewK51659634](https://twitter.com/AndrewK51659634)






