## Deployment Steps

firebase init hosting
firebase target:apply hosting studying-words-deve studying-words-deve
firebase deploy --only hosting:studying-words-deve

## firebase.json 

{
  "hosting": {
    "target": "studying-words-deve",
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
