# full-stack-open-part13
[Part 13](https://fullstackopen.com/en/part13) of Full Stack Open.

A recreation and extension of the RESTful back end in Express from Part 4 using PostgreSQL instead of MongoDB. The application is used for creating, reading, updating or deleting blog post and author data. Users can also create reading lists and mark blogs posts as read. User authentication is accomplished using JSON web tokens. Tokens can also be blacklisted to prevent further use and users can be disabled entirely. Complex data are returned using table joins, query strings to specify data subsets, and aggregate SQL functions to provide data summaries. Sequelize migrations are used to make database changes and to keep a log of those changes.

