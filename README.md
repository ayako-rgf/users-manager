# Salesforce Users Manager

- Users can request creation of new user or deactivation of existing one, and see the list of requests
- System administrators can review list of requests and approve/reject

## Requiements

Make a "Connected App" on salesforce and modify settings in src/environments.

## What it does/doesn't on salesforce records

- When system administrator approves a user deactivation request, it actually change User.IsActive to fales on salesforce
- When system administrator approves a user creation request, it does not create user on salesforce

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
