
# demo-playwright-test

This is a sample project to demonstrate [Playwright Test](https://playwright.dev/) usage, running tests against Contact List App [API](https://documenter.getpostman.com/view/4012288/TzK2bEa8/) and [Front-end](https://thinking-tester-contact-list.herokuapp.com/).

## Pre-requisites

### Node.js

Make sure you have the correct version of Node installed, which can be found in the `.nvmrc` file in the root of the repository. I also recommend running `npm i` to install all dependencies

## Structure

## Code is structured as shown below:

```
PLAYWRIGHT TEST FINAL PROJECT
├── .github
│   └── workflows
│       └── playwright.yml                              # GitHub Actions workflow file
├── app
│   ├── api
│   │   ├── AuthAPIClient.ts                            # Handles authentication API requests
│   │   ├── BaseAPIClient.ts                            # Base class for API clients with error handling
│   │   └── ContactAPIClient.ts                         # Handles contact-related API requests
│   └── context
│       ├── AuthorizedContext.ts                        # Context for authenticated requests
│       ├── BaseContext.ts                              # Base context for API requests
│       └── contextFactory.ts                           # Factory for creating API contexts
├── tests
│   ├── api
│   │   └── contacts
│   │       └── AddContact.specs.ts                     # Tests for adding contacts via API
│   └── users
│       └── LoginUser.specs.ts                          # Tests for user login via API
├── e2e                                                 # Directory for end-to-end tests
├── utils
│   └── constants
│       └── Routes.ts                                   # Constants for API routes
└── types
    ├── api
    │   └── clients                                     # Types for API clients
    └── Endpoints
        ├── AddContact.ts                               # Type definitions for adding contacts endpoint
        └── LoginUser.ts                                # Type definitions for user login
```

<!-- ### Yarn

The project also uses [Yarn](https://yarnpkg.com/), so follow the [installation steps](https://classic.yarnpkg.com/lang/en/docs/install/) in case you don't have it.

### Docker

The projects used Docker to spin up ServeRest API. Follow instructions from their [official docs](https://docs.docker.com/engine/install/) to install Docker engine in your environment. -->

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
