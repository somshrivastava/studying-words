## Deployment Steps

firebase init hosting
firebase target:apply hosting studying-words studying-words
firebase deploy --only hosting:studying-words

## firebase.json 

{
  "hosting": {
    "target": "studying-words",
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
