# spoonity-fb


## Project Anatomy

### At the top level, the project is composed of several folders:

- `public` contain entry point and css into the project

- `src` contain source files

- `.storybook` contain init files to run `Storybook-vue` 

- `tests` contain tests files

- `stories` contain stories, which are page definitions for Storybook. Stories allows you to visually examine individual component/page without navigating through the app

### Inside `src` the project takes the following structure

- `assets` contain static files such as images used by the project

- `components` contain subparts used to create individual `views`

- `logic` contain utility functions or calls to external services

- `views` contain individual "pages". Each page is associated with a routing target


## Project Overview for Developers

```
index.html -> main.js -> App.vue -> "views"
```

`App.vue` is injected into a `<div id='app'>` element inside `index.html`. `main.js` serves as the initialization file for Vue and controls this injection. Depending on user input each file in `views` is rendered inside a `<div>` in `App.vue`. `route.js` defines routes connecting `views` together as well as routing behavior such as redirection for unauthorized users. `store.js` is used to store app level states that are shared across individual views, maintaining consistency across navigation.


## Deployment

1. Add `secrets.js` file into `logic` folder which includes your Firebase key and OpenWeather API key.

The file should be structured as such:

```
export function firebaseKey(){
  // YOUR KEY HERE
}

export function openWeatherKey(){
  // YOUR KEY HERE
}
```
2. `npm install` or `yarn install` all required packages

3. `firebase login`

4. `firebase init`, choose `firestore` and `hosting`. Associate deployment folder to `dist`

5. `npm run build` or `yarn run build`, which should populate `dist` folder

6. `firebase deploy`

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Run Storybook
```
yarn storybook
```

### Lints 
```
yarn run lint
```

### Lints and fix files
```
yarn run lint --fix
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
