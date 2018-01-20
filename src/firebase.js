import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCN8bqjfAoeZYi5eYu0y3iTlbGnQOj0Aog",
    authDomain: "tomaszbanach01-sandbox.firebaseapp.com",
    databaseURL: "https://tomaszbanach01-sandbox.firebaseio.com",
    projectId: "tomaszbanach01-sandbox",
    storageBucket: "tomaszbanach01-sandbox.appspot.com",
    messagingSenderId: "116193409475"
};
firebase.initializeApp(config);

export const database = firebase.database()