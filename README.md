# SauceDemo Playwright Test Automation

## Overview
Automated UI tests for the SauceDemo training e-commerce website using Playwright Test, JavaScript, and Node.js.

## Scope
Authentication, Products page, Shopping Cart, Checkout, and Burger Menu.

## Prerequisites
- Node.js LTS and npm
- Git (optional for local execution)

## Installation
```bash
npm ci
npx playwright install chromium
```

## Run tests
```bash
npm test
npm run test:login
npm run test:products
npm run test:cart
npm run test:checkout
npm run test:menu
npm run test:headed
npm run report
```

## Architecture
Tests are grouped by functionality in tests/*.spec.js. Page Object classes are in tests/pages/. Test data is in tests/data/testData.js. playwright.config.js controls test execution and reporting.

## Reports
HTML: playwright-report/
JUnit: results/junit.xml
Failure evidence: test-results/

## Limitations
The project tests the public demo UI in Chromium. It does not validate backend services, real payment processing, production security, or database state.
