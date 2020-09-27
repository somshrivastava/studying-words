## Deployment Steps

firebase init hosting
firebase target:apply hosting studying-words-staging studying-words-staging
firebase deploy --only hosting:studying-words-staging

## firebase.json 

{
  "hosting": {
    "target": "studying-words-staging",
    "public": "public",
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
