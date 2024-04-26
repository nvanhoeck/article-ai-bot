# How to run this project
## Setup
1. add a .env file to the root of your project
2. Add the following property to that file: AI_KEY=XXXXXX, where value is your api-key for open-ai.
3. Do a npm install
4. Then run npm start and the server should be up and running on port 8080

## Usage
There is one rest endpoint available to use.
First you must WAIT for the vector store to be created. Once you receive the message in the logs 'Vector Store created with files'.
This means the provided file in assets `Training_Data.json` has been uploaded to your AI assistant.
You can always replace the data there.
Each time your server starts up, a new AI assistant is made with the provided training data.

The endpoint:

1. POST = localhost:8080/rest/conversation
body(eg): `{"message": "Printplaat c-base is beschadigd. kan dit apart besteld worden? Artikelnummer? Prijs?. Geef me 1 itemnummer hiervoor. Antwoord in json structuur en enkel alleen de itemnummer."}`