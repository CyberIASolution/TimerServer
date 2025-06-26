## INTERFACE
### REST
- "/register": POST register an account
- "/auth": POST authenticate user and create a server side session
### SOCKET.IO
- "register": IN create a timer or subscribe to one in the user's timer list
- "register:success": OUT indicate that the timer registration are done
- "register:error": OUT indicate that the timer registration failed

- "start": IN start a timer with the given id
- "start:sucess": OUT indicate that the timer have started
- "start:error": OUT indicate that the timer filed to start or are already started

- "pause": IN pause a timer with the given id
- "pause:sucess": OUT indicate that the timer have being paused
- "pause:error": OUT indicate that the timer filed to pause or are already paused

- "stop": IN stop a timer with the given id
- "stop:sucess": OUT indicate that the timer have stopped
- "stop:error": OUT indicate that the timer filed to stop or are already stopped

- "status": IN request the timer's current status
- "status:success": OUT indicate the timer's status
- "status:error": OUT indicate that the server failed to get the timer's status