broswer->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->broswer: HTML-code
broswer->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->broswer: spa.js
broswer->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
server-->broswer: favicon.ico

note over broswer:
browser starts executing js-code
that requests JSON data from server
end note

broswer->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->broswer: [{ content: "<b>Bold of you</b>", date: "2021-08-30T14:49:13.168Z" }, ...]

note over broswer:
browser executes the event handler
that renders notes to display
end note
