# Getting Started

Fork of [Tour Of Heroes](https://github.com/johnpapa/angular-tour-of-heroes) introducing end-to-end tests using Protractor, Jasmine and Allure.

## Get the Code
```
git clone https://github.com/dgabka/angular-tour-of-heroes.git
cd angular-tour-of-heroes
npm i
```

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
By default test are run on port 4200 in Google Chrome.

## Allure Report

By default Allure report is genarated under `e2e/allure-results`.
To open the report first you need to have Allure [installed](https://docs.qameta.io/allure/#_get_started).
Then run `allure serve e2e/allure-results` from within project root directory.


