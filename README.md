# MUSIC MEDIA STRUCTURE

## Client
Everything within the client directory is the front-end resources (including React, Redux). This serves as the UI for our web application.

Specifics, we use Redux (and Redux form) to make HTTP requests to our backend. These endpoints live within the /client/src/actions directory.

## Config
The config folder stores all of our configurations, both for development and production.

## Models
The models for our middle-tier.

## Routes
The routes folder has all of the backend Express route handling. Whenever a user routes around our application with data requests,Express will retrieve said requests from the database.

## Services
These are helpers like our OAuth system.

## Database
Something to note, this project makes use of pools. Pools contain a pool of connections. In our project, we've defined 100 as the maximum number of connections at any given time. Every time we query, we make a new connection from the pool, lock on to the connection and release it (it's automatically released since we're using pools) back to the pool. 

We do this to achieve an asynchronous behavior because mysql is otherwise sequential, and will run queries one after another utilizing the same connection.

## Workflow
1) Starting in the front-end, We import the actions folder (and thus, all the endpoints in it) to the component of interest
2) These endpoints are passed in to the components as props. You can destructure these unless it's a class component (in which case, it's readily available without further logic)
3) We then call the endpoints using the axios library (supports AJAX requests in HTTP form) to our backend. These endpoints are proxied from the front-end to backend in development (in production, there is only one server)
4) Our backend will query our SQL database for data and if needed, transform the returned object into a more consumable object by the front-end
5) The response is then returned to the front-end and dispatched to all of the reducers. We dispatch this response as a variable named "payload" and a type. All of the reducers (authReducer, etc) will receive this dispatch, but we check against the dispatch type to handle the response correctly. For example, if we dispatch an action for specifically the authReducer to handle, then it will check against its type and handle accordingly (using a switch statement). Within this reducer, it'll return the action and update the store.

For context, a <Provider /> component (given by the react-redux library) takes in a store (from redux) and wraps around the root component (and in our case, the App.js component). This way, every action reducers return will be known by the store and thus, the root component and all of its children. There is logic in the components to hook up components with the store's reducers.

6) With their newly received data, the components will re-render appropriately. Their render() will always trigger when the props change (or a setState()).

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