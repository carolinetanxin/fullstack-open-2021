browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

note over browser:
browser post json to server
{"content":"carolinetanxin test2","date":"2021-08-31T05:51:56.881Z"}
end note

server-->browser: {"message":"note created"}

note over browser:
browser executes the event handler
that renders notes to display
end note
