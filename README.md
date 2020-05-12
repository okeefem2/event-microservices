# Notes:

Event based architecture!!

1db per service, and when data comes in, an event is dispatched. Any service that needs to share data listens for that event and takes the data it needs.

NX notes:

nx generate @nrwl/express:application posts-service

generate react component nx generate @nrwl/react:component comment-list --project=blog

Adding bulma

npm i bulma
