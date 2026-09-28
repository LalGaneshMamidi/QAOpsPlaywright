# QAOps Playwright Automation Framework

End-to-end test automation framework built with **Playwright** (JavaScript + TypeScript), covering web UI and REST API testing, BDD with Cucumber, Excel-driven test data, Allure reporting and CI/CD through **GitHub Actions** and **Jenkins**.

## Tech stack
Playwright · JavaScript · TypeScript · Node.js · Cucumber (BDD) · ExcelJS · Allure · GitHub Actions · Jenkins

## Features
- Page Object Model (`POM/` for JavaScript, `POM_TS/` for TypeScript)
- Web UI and API tests, selectable by tag (`@web`, `@API`, `@Regression`)
- BDD scenarios in Gherkin (`features/`) with Cucumber HTML report
- Data-driven testing using Excel files (`ExcelJSUtil/`)
- Login session reuse with Playwright storage state
- Allure reports with screenshots and failure details
- CI pipelines: GitHub Actions (`.github/workflows/`) and Jenkins (`Jenkinsfile`)

## Project structure
```
.github/workflows/   GitHub Actions pipeline
POM/  POM_TS/        Page objects (JS / TS)
tests/               Playwright test specs
features/            Cucumber feature files and step definitions
ExcelJSUtil/         Excel read/write helpers for data-driven tests
utils/  utils_ts/    Shared helpers (JS / TS)
Jenkinsfile          Jenkins declarative pipeline
playwright.config.js Playwright configuration
cucumber.js          Cucumber configuration
```

## Getting started
```bash
git clone https://github.com/LalGaneshMamidi/QAOpsPlaywright.git
cd QAOpsPlaywright
npm ci
npx playwright install
```

## Run tests
```bash
npm run regression            # all Playwright tests
npm run webTests              # tests tagged @web
npm run APITests              # tests tagged @API
npm run CucumberRegression    # Cucumber scenarios tagged @Regression
```

## Reports
```bash
npx playwright test --reporter=allure-playwright
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```
Cucumber HTML report is written to `cucumber-report.html`.

## CI/CD
- **GitHub Actions:** runs on push / pull request (see `.github/workflows/`).
- **Jenkins:** `Jenkinsfile` defines a parameterised declarative pipeline: checkout → install → run selected suite → publish Allure report → archive artifacts. Also runs nightly on weekdays.

## Screenshots
Add screenshots of the Allure report and Cucumber report here.

## Author
**Lal Ganesh Mamidi** - QA Automation Engineer
[LinkedIn](https://linkedin.com/in/lal-ganesh-mamidi-55a50b20b) · lalganeshmamidi123@gmail.com
