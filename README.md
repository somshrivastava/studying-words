# Studying Words 📚

### Live Demo

The app is deployed and available at: [https://studying-words.web.app](https://studying-words.web.app)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

This project was built to help my sister study sight words in kindergarten during the COVID-19 pandemic, when my parents were busy with work and she had nothing to do in her free time with no one to check on her. Studying Words is a web application for practicing, tracking, and reviewing sight words. Built with Angular and Firebase, it allows users to create word collections, study them, and track progress interactively.

## Features

- Create and manage multiple word collections
- Study mode for practicing sight words
- Track progress and review results
- Responsive UI with PrimeNG components
- Firebase hosting and Firestore integration

## Tech Stack

- Angular 10/11
- Firebase (Firestore, Hosting)
- PrimeNG UI library
- TypeScript, SCSS

## Installation

1. Clone the repository:

```sh
git clone https://github.com/somshrivastava/studying-words.git
cd studying-words
```

2. Install dependencies:

```sh
npm install --legacy-peer-deps
```

3. Set up Firebase:

- Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
- Add your Firebase config to `src/environments/environment.ts`

4. Run the app locally:

```sh
npx ng serve
```

## Usage

- Create a new collection and add sight words
- Use study mode to practice words
- Review your progress and results

**Example:**

```sh
npx ng serve
# Open http://localhost:4200 in your browser
```

## License

This project is licensed under the MIT License.
