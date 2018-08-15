# Salesforce Users Manager

- Users can request creation of new user or deactivation of existing one, and see the list of requests
- System administrators can review list of requests and approve/reject

## Requiements

### In salesforce

- Add http://localhost:4200 to whitelist for cross-origin resource sharing (CORS)
- Make a "Connected App".

### In this app

- Replace appId in src/environments with the one of created "Connected App"

## What this app does/doesn't on salesforce records

### Does

- Retrieve users list

### Does not

- Any record creation nor modification

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
