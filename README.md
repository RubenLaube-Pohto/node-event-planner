# Event Planner

Event Planner is a Node Express REST API to find a suitable date for an event that suits all parties involved. [It is live as of writing][live].

The event data is saved to Google Cloud Platform's Firestore (nosql). The app is hosted as a GCP Function which feels a bit overkill but I wanted to try it out. With small modifications the app could be hosted in a more traditional way in GCP AppEngine, for example.

See the API docs [here][apidocs]!

## Setup

Basic node app so `npm i`. Firestore needs to be setup in a GCP project. Configuration of Firestore connection requires a service-account.json when run locally.

See the `package.json` for the env vars used when running locally or when deploying

## Deployment

Current script deploys to GCP Functions. Need to configure local `gcloud` cli with user's own credentials.

## API Documentation

OpenAPI (Swagger) compliant documentation can be generated from the source code. This `.json` or `.yaml` document can be used with Swagger UI, for example.

[live]: https://europe-west1-event-planner-245013.cloudfunctions.net/eventPlanner
[apidocs]: https://app.swaggerhub.com/apis/RubenLaube-Pohto/event-planner/0.0.1
