# NeoScratch
A Scratch project advertisement script for educational purposes.

## Please note that the use of this script may break the Scratch ToS (no spamming) and get you banned.
So if you really need to use it, use it with caution.

How to use: go on a scratch studio that allows anyone to add projects while logged in, and paste the [script](neoscratch.js) in to the browser console. It explains the rest.

### What does it do?
It cycles through the provided studio & project ids, removing and adding each project to each studio. This causes you projects to always appear first.

### How does it work?
It overrides `XMLHttpRequest.prototype.setRequestHeader` to get you login token. (This means that a modified version of this script could potentially delete your Scratch account and all of its projects.)
Then, it sends fetch requests to `https://api.scratch.mit.edu/studios/{studioId}/project/{projectId}` with either `DELETE` or `POST`, while providing the token in a header.

### How do I customize it?
Edit the variables at the top of the [script](neoscratch.js). 
