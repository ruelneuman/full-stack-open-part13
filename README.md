# Blog List App Back End (PostgreSQL)
My project for [Part 13](https://fullstackopen.com/en/part13) of Full Stack Open from the University of Helsinki. It is a recreation and extension of the back end [blog app]((https://github.com/ruelneuman/full-stack-open/blob/master/README.md#part-7---react-router-custom-hooks-styling-apps-with-css-and-webpack)) from Parts [4](https://fullstackopen.com/en/part4) and [7](https://fullstackopen.com/en/part7) using PostgreSQL and Sequelize instead of MongoDB and Mongoose.

The application is used for creating, reading, updating or deleting blog post and author data. Users can also create reading lists and mark blogs posts as read.

## How It's Made

**Tech used:** JavaScript, Node.js, Express, PostgreSQL, Sequelize

This RESTful backend is built using Express. Sequelize ORM is used to run SQL queries to a PostgreSQL database. Sequelize migrations are used to make database changes and to keep a log of those changes.

Complex data are returned using table joins, query strings to specify data subsets, and aggregate SQL functions to provide data summaries.

User authentication is accomplished using JSON web tokens. Tokens can also be blacklisted to prevent further use and users can be disabled entirely. 

## Lessons Learned

User authentication and authorization can be difficult to implement correctly. Improper implementation can lead to security flaws or unnecessary database queries. In the future I would use well tested authentication and authorization strategies already implemented in libraries such as Passport.js. 

One of the main advantages of JSON web tokens is that they are stateless. Using a token blacklist (as I did) requires additional database queries for any protected routes and eliminates this advantage. If I implemented this again I would need to consider if a token revocation is an important feature to implement for this use case. If it were I may use a refresh token in additiona to a short-lived access token, and revoke the refresh token only upon logout.
