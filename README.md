# MUSIC MEDIA STRUCTURE
Think Twitter but for music. Ye, that's what this is.

The deployment is currently broken but the live site can be found here: https://protected-lowlands-14456.herokuapp.com/

## Client
Everything within the client directory is the front-end resources (including React, Redux). This serves as the UI for our web application.

Specifics, we use Redux (and Redux form) to make HTTP requests to our backend. These endpoints live within the /client/src/actions directory.

### Components
Another technology we use is redux-form. We import its reducer into our reducers folder (under the combineReducers({})) and add it as a key so that our components can have access to it. How to allow React components to talk to our redux store (which again, contains all of our reducers), we import a redux-form helper into our components. That's all of the hard work we have to do. Outside of that, redux-form will call action creators (upon form changes), updates the state in redux store. All we have to do is hook it with reduxForm() instead of connect().

Low-level, we use <Field /> components to render HTML elements on our redux forms. It takes in a name attribute, which when the <Field /> takes in some value, that value will be stored in the redux store (aka called an action creator, returned a dispatched action) under the key of said name.

For our components, we use JSX which is a Javascript syntax extension. It mimics HTML elements but behind the scenes, the React library converts it to Javascript.

## Config
The config folder stores all of our configurations, both for development and production. Obviously, the dev.js keys are not on Github. Ask me for them if you need them. As for the prod.js keys, they point to the environmental variables on the Heroku servers. When our application runs (either on Heroku or locally), the process.env variables to see if we're in production or development mode, and subsequently see which set of keys to use.

## Models
The models for our middle-tier such as the User.js model. Any models returned from our database is converted into this model so the front-end and middle-tier can use it nicely.

## Routes
The routes folder has all of the backend Express route handling. Whenever a user routes around our application with data requests,Express will retrieve said requests from the database. This should contain most of the logic. It acts as a "controller" and will transform data as need be between the front-end and backend (think arbiter).

### History
The history object is a dependency of React Router, and the history object has many implementations. In our codebase, we use the browserHistory.

You pass this type of history into the Route like so:

<Router history={history} />

In doing so, we have access to the router's history session. We can push, replace or pop routes on to the stack; we can go back or go forward; we also have access to the current location, pathname and state.

## Services
These are helpers like our OAuth system.

## Database
Something to note, this project makes use of pools. Pools contain a pool of connections. In our project, we've defined 100 as the maximum number of connections at any given time. Every time we query, we make a new connection from the pool, lock on to the connection and release it back to the pool. 

We do this to achieve an asynchronous behavior because mysql is otherwise sequential, and will run queries one after another utilizing the same connection.

The pool itself is a singleton because we really only ever need one.

# MISC.

## Before you submit a pull request, ask yourself...
1) Do you need to add anything to the activity log?
2) Do you have to add any unit tests?
3) Do you have to handle errors and if so, direct them to our errors page?
4) Adding on to the above point, do we need to log the error in our database?

## Workflow
1) Starting in the front-end, We import the actions folder (and thus, all the endpoints in it) to the component of interest
2) These endpoints are passed in to the components as props. You can destructure these unless it's a class component (in which case, it's readily available without further logic)
3) We then call the endpoints using the axios library (supports AJAX requests in HTTP form) to our backend. These endpoints are proxied from the front-end to backend in development (in production, there is only one server)
4) Our backend will query our SQL database for data and if needed, transform the returned object into a more consumable object by the front-end
5) The response is then returned to the front-end and dispatched to all of the reducers. We dispatch this response as a variable named "payload" and a type. All of the reducers (authReducer, etc) will receive this dispatch, but we check against the dispatch type to handle the response correctly. For example, if we dispatch an action for specifically the authReducer to handle, then it will check against its type and handle accordingly (using a switch statement). Within this reducer, it'll return the action and update the store.

For context, a <Provider /> component (given by the react-redux library) takes in a store (from redux) and wraps around the root component (and in our case, the App.js component). This way, every action reducers return will be known by the store and thus, the root component and all of its children. There is logic in the components to hook up components with the store's reducers.

6) With their newly received data, the components will re-render appropriately. Their render() will always trigger when the props change (or a setState()).

## How to get the codebase working

1) Clone the project into your local machine
2) Run "npm install" under the client directory and the server directory. Npm will look at the respective package.json's dependencies and download the listed modules.
3) Ask me for the dev.js keys

## How does our Google OAuth work?

1) In the frontend, the user will navigate to the "/auth/google" route (which we define) which is sent to our server. The express route lives in our authRoutes.js.
2) This route takes in a "passport.authenticate('google')" parameter, which refers to the passport.use(...) method in passport.js. This is the configuration that specifies our google credentials so we can use the Google API; it also specifies the callback URL, which is the URL the user is redirected to once she's done OAuthing. In this case, it's "/auth/google/callback"
3) So, the user will login using Google and on the way back, we check if this user is already in our database or not (Has she OAuthed before, in other words) with the given "profile" variable. See passport.js.
4) If she hasn't, we call the insertUser endpoint to insert the new user model into the database
5) If she has, we just retrieve the user model
6) Next, we go to the callback URL (which again, is handled within the authRoutes.js). Here, we navigate to certain pages dependent if the user has set up her profile or not.

## How to test the OAuth workflow

1) If you have a test user already in the user table (in the database), delete it.
2) This is not all, though, as going to the browser will return a failed "api/current_user" call to the server.

The problem is, once you've gone through the OAuth process previously, Passport.js will deserialize the newly inserted model into a cookie for the browser to hold on to.

So, when you go to the browser, it has the user's ID to attempt server requests. This obviously won't work because the model is deleted from the database.

You'll have to clear your cookies in the browser (Application tab in the Chrome devtools)

3) Lastly, restart your server. CTRL+C in the terminal and then run "npm run dev" in the server directory.

# DEBUGGING

## How to debug the front-end:
1) Install React Devtools (Chrome extension)
2) In the browser, turn to the React tab
3) You can see the JSX component structure. Here, you can type in $r on the selected element to inspect its values
4) You can also change the props, states and so forth
5) You can also set breakpoints from within the Source tab

## How to debug the backend:

You can use the V8 Inspector tool to debug the Express routes but that won't do you much good. There is no point in creating dummy data to test a route -- it's not a real, full test and it has room for user error.

The best way to go about debugging the backend is to call the routes from the React side (and if React isn't working, we have tools to make sure data is sent over the right way). You can do this by binding axios to the window and making AJAX calls with dummy data or to interact with the UI itself.

In the backend, you can console.log everything.

## How does our code even get to the server for us to see and play with?
Before we start debugging, we have to understand how our code gets to the server (either remote server or a port on localhost) in the first place.

For our client-side code (React), we run "npm run start --prefix ./client". With this, Node.js will look for a scripts object in our package.json of our /client directory. If found, it'll run the scripts. This will minify and bundle all of our HTML, Javascript and CSS files and have the browser parse them. You can see the HTML and CSS in the inspector tools, where you can change them on the fly. The javascript is under the "Sources" tab, specifically under "static/js/..."

How it all works together, when we run our backend server, we'll whip up a port that is an endpoint of communication; it'll talk to our server, whether that's hosted on the cloud or our local machine. Any requests we make to our Express routes via the browser (on the designated port) will give us back the response.

As for the front-end, our script will bundle all of our JS, CSS and HTML and hand that to the browser for it to download and display.

## What's bundling and minification?
1) Bundling combines (or bundles) multiple files into a single file (i.e CSS bundles, JS bundles, etc). Fewer files means fewer HTTP requests to retrieve them, which means better page load performance.

2) Minification removes white space and comments and shortens variables names. Saves space.