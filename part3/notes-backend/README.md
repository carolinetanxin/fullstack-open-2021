## Problem record about [notes-backend] file

### 1.How to publish react app on Heroku
[Click me to read (Medium)] [1]

[1]: https://medium.com/%E8%8F%9C%E9%B3%A5%E5%B7%A5%E7%A8%8B%E5%B8%AB%E6%97%A5%E8%A8%98/heroku-%E5%9C%A8heroku%E4%B8%8A%E9%83%A8%E7%BD%B2react-app-8126e63e4d81

### 2.move [part2/notes/build] to note-backend

in `part2/notes` file, run `cp -r build ../../part3/notes-backend`

### 3.proxy in [part2/notes]

in `package.json`, if you set `baseUrl = '/api/notes'`, you should set `"proxy": "http://localhost:3001/api"`

### 4.how to rename your project name on Heroku
[Click me to read (Heroku)] [2]

[2]:https://devcenter.heroku.com/articles/renaming-apps#updating-git-remotes
