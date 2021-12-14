/* eslint-disable no-undef */
db.createUser({
    user: "the_username",
    pwd: "the_password",
    roles: [
        {
            role: "dbOwner",
            db: "the_database",
        },
    ],
})
  
db.createCollection("todos")
  
db.todos.insert({ content: "Number 1" })
db.todos.insert({ content: "Configure CI" })