npm run-script lint
npm run-script build
firebase serve --only functions

firebase target:apply hosting studying-words-deve studying-words-deve
firebase deploy --only hosting:studying-words-deve

{
  "hosting": {
    "target": "studying-words-deve",
    "public": "study",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [ {
      "source": "**",
      "destination": "/index.html"
    } ]
  }
}

firebase target:apply hosting studying-words-staging studying-words-staging
firebase deploy --only hosting:studying-words-staging

{
  "hosting": {
    "target": "studying-words-staging",
    "public": "study",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [ {
      "source": "**",
      "destination": "/index.html"
    } ]
  }
}

firebase target:apply hosting studying-words studying-words
firebase deploy --only hosting:studying-words

{
  "hosting": {
    "target": "studying-words",
    "public": "study",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [ {
      "source": "**",
      "destination": "/index.html"
    } ]
  }
}
