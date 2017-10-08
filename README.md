*DEBUGGING*

*How to debug the front-end:*
1) Install React Devtools (Chrome extension)
2) In the browser, turn to the React tab
3) You can see the JSX component structure. Here, you can type in $r on the selected element to inspect its values
4) You can also change the props, states and so forth
5) You can also set breakpoints from within the Source tab

*How to debug the backend:*

You can use the V8 Inspector tool to debug the Express routes but that won't do you much good. There is no point in creating dummy data to test a route -- it's not a real, full test and it has room for user error.

The best way to go about debugging the backend is to call the routes from the React side (and if React isn't working, we have tools to make sure data is sent over the right way). You can do this by binding axios to the window and making AJAX calls with dummy data or to interact with the UI itself.

In the backend, you can console.log everything.