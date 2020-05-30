# Notes:

Event based architecture!!

1db per service, and when data comes in, an event is dispatched. Any service that needs to share data listens for that event and takes the data it needs.

NX notes:

nx generate @nrwl/express:application posts-service

generate react component nx generate @nrwl/react:component comment-list --project=blog

Adding bulma

npm i bulma

docker exec -it posts-service /bin/bash to check what's going on inside the container

https://dev.to/martzcodes/migrating-full-stack-apps-from-poly-repo-to-mono-repo-17go#dockerfile


k8s

services handle requests between and to pods
Cluster IP services are for communications in the cluster
Load Balancer is for communications outside the cluster (Node port also, but that is more for development)

posts-service 31939
http://localhost:31939/posts-service


rolling out updates in k8s
k rollout restart deployment event-bus-depl

curl -X POST http://localhost:32198/posts-service -d '{"title": "Test Post"}' -H "Content-Type: application/json"

curl -X POST http://localhost:32608/comments-service/posts/bd974191/comments -d '{"content": "First Comment"}' -H "Content-Type: application/json"

curl -X GET http://localhost:30433/query-service/posts

ingress-nginx:

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml

creates a load balancer and ingress controler for routing to pods
k rollout restart service -f infrastructure/k8s/*.yaml
ingress needs to just be reapplied I believe
k apply -f infrastructure/k8s/ingress-srv.yaml

dev automation - skaffold
brew install skaffold

nx run-many --target=build --all --watch --parallel --maxParallel=6

this will build and watch all apps, skaffold is set to watch these and swap out changes into individual images or rebuild if needed

skaffold dev
