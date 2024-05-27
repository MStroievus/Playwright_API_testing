# Playwright API testing

This is a sample project to demonstrate [Playwright Test](https://playwright.dev/) usage, running tests against Contact List App [API](https://documenter.getpostman.com/view/4012288/TzK2bEa8/) and [Front-end](https://thinking-tester-contact-list.herokuapp.com/) (FE only started).

## Pre-requisites

### Node.js

Make sure you have the correct version of Node installed, which can be found in the `.nvmrc` file in the root of the repository. I also recommend running `npm i` to install all dependencies

## Packages and Descriptions

### [ajv](https://www.npmjs.com/package/ajv)

A JSON Schema validator for JavaScript, providing high-performance validation and error handling.

### [csv-parse](https://www.npmjs.com/package/csv-parse)

A CSV parsing library for JavaScript, allowing for asynchronous reading and parsing of CSV files.

### [dotenv](https://www.npmjs.com/package/dotenv)

A module that loads environment variables from a .env file into process.env, enhancing configuration management.

### [faker](https://www.npmjs.com/package/faker)

A library for generating fake data, useful for creating realistic test data for various scenarios.

### [joi](https://www.npmjs.com/package/joi)

A powerful schema description language and data validator for JavaScript, used to ensure data integrity and validity.

### [uuid](https://www.npmjs.com/package/uuid)

A library for generating unique identifiers (UUIDs), widely used for creating unique keys in databases and other systems.

## Structure

### Code is structured as shown below:

```

PLAYWRIGHT_TEST_FINAL_PROJECT
├── auth
│
├── .github
│   └── workflows                                        # GitHub Actions workflow files
│
├── .vscode
│   └── settings.json
│
├── app
│   ├── api
│   ├── components
│   ├── context
│   └── fixture
│       ├── combineFixture
│       └── logicFixture
│
├── pages
│
├── playwright-report
│
├── test-results
│
├── tests
│
├── utils
│   ├── constants
│   ├── data
│   ├── builder
│   ├── csv-files
│   ├── extensions
│   ├── helpers
│   ├── model
│   ├── schema
│   │   ├── requestAPI
│   │   ├── responseAPI
│   │   └── validators.ts
│   └── types
│       ├── api
│       │   ├── api-interfaces
│       │   └── endpoints
│       └── web
│           ├── browser
│           └── pages
|___________________________________________



```

**PS:** Note that different test levels are configured to have proper extensions (e.g: `*.api.test.js`).

## Running locally

- Install dependencies: `yarn install`
- Start Serverest server: `yarn api:start`
- Run API tests: `yarn test:api`
- Run End-to-end tests: `yarn test:e2e`
- Run Visual Regression tests: `yarn test:visual` (you will need a Happo account and `HAPPO_API_KEY`/`HAPPO_API_SECRET` environment variables set)

### Debugging

<!--
To run Playwright in debug mode, pass the `PWDEBUG=1` environment variable in the command, for example: `PWDEBUG=1 yarn test:e2e`

When a test fails, the project is configured to save screenshots and a trace file, inside `test-reports` folder. You can run [Playwright's Trace Viewer](https://playwright.dev/docs/trace-viewer) with `show-trace` command: `yarn playwright show-trace test-results/some-test-path/trace.zip`

Please refer to [Playwright's Debugging docs](https://playwright.dev/docs/debug) for further information on debugging features.

### Tips

- To stop running ServeRest container: `docker stop serverest`
- To restart ServeRest container: `docker restart serverest`
- To remove ServeRest container (no need to stop it first, the `-f` option will force its removal even if it is running): `docker rm -f serverest`

## Reporting

Test reports can be generated with [Allure reports](https://github.com/allure-framework/allure2), following the steps below:

- Generate report: `yarn allure:generate`
- Open HTML report: `yarn allure:open`

## CI

The project uses [GitHub Actions](https://docs.github.com/en/actions) and tests are run automatically on PRs and on merge to `main` branch.

---

## Contributing

We have a [Kanban board](https://github.com/stefanteixeira/demo-playwright-test/projects/1) with a backlog of tasks to work on. If you are interested in contributing to the project, please reach out to @stefanteixeira to become a collaborator and get a task assigned to you. --> -->
