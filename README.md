Badge ServeRest
demo-playwright-test
This is a sample project to demonstrate Playwright Test usage, running tests against ServeRest API and Front-end.

Pre-requisites
Node.js
Make sure to have the correct Node version installed, which can be found in .nvmrc file in the repository root. It is recommended to use nvm to manage different Node versions in your environment.

Yarn
The project also uses Yarn, so follow the installation steps in case you don't have it.

Docker
The projects used Docker to spin up ServeRest API. Follow instructions from their official docs to install Docker engine in your environment.

Structure
Code is structured as shown below:

demo-playwright-test/
 ├── lib/
 │    ├── helpers.js                        # Helper functions used in tests
 ├── tests/
 │    ├── api
 │         ├── login.api.test.js            # API tests
 │    ├── e2e
 │         ├── create-user.e2e.test.js      # End-to-end tests
 │    ├── visual
 │         ├── login.visual.test.js         # Visual regression tests
 ├── playwright.config.js                   # Playwright configuration file
PS: Note that different test levels are configured to have proper extensions (e.g: *.api.test.js).

Running locally
Install dependencies: yarn install
Start Serverest server: yarn api:start
Run API tests: yarn test:api
Run End-to-end tests: yarn test:e2e
Run Visual Regression tests: yarn test:visual (you will need a Happo account and HAPPO_API_KEY/HAPPO_API_SECRET environment variables set)
Debugging
To run Playwright in debug mode, pass the PWDEBUG=1 environment variable in the command, for example: PWDEBUG=1 yarn test:e2e

When a test fails, the project is configured to save screenshots and a trace file, inside test-reports folder. You can run Playwright's Trace Viewer with show-trace command: yarn playwright show-trace test-results/some-test-path/trace.zip

Please refer to Playwright's Debugging docs for further information on debugging features.

Tips
To stop running ServeRest container: docker stop serverest
To restart ServeRest container: docker restart serverest
To remove ServeRest container (no need to stop it first, the -f option will force its removal even if it is running): docker rm -f serverest
Reporting
Test reports can be generated with Allure reports, following the steps below:

Generate report: yarn allure:generate
Open HTML report: yarn allure:open
CI
The project uses GitHub Actions and tests are run automatically on PRs and on merge to main branch.

Contributing
We have a Kanban board with a backlog of tasks to work on. If you are interested in contributing to the project, please reach out to @stefanteixeira to become a collaborator and get a task assigned to you.
