# Choosy: Pick a movie!

### Development Environment

- `make dev`
- navigate to `localhost`

# TODO

- [ ] Input suggestions based on all choices ever
- [ ] Delete choices
- [ ] Delete rooms
- [ ] Router based on room hash in URL
- [ ] Autocopy room ID
- [ ] Connect bracket
- [ ] SSL

### Issues

- [ ] deploying deletes database (need to run MySQL on a dedicated server)
- [ ] room "movietn" crashes
- [ ] sometimes choice input only changes last character
- [ ] choice which you are editing isn't always at the top?

### First iteration, group voting
- [X] Group socket connection for lists
- [X] Create item
- [X] Signup
- [X] Login
- [X] Logout
- [X] Create room
- [X] Swipe to vote
- [X] Get results

### Second iteration, informed voting
- [ ] Display choice's position in any list for voting

### Third iteration, fancy features
- [X] Real-time input updates to room
