import express from "express";
import bcrypt from "bcrypt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJI_-St234np1DTcG7pUVwYX62j0ydNLU",
  authDomain: "ecommerce-68d1e.firebaseapp.com",
  projectId: "ecommerce-68d1e",
  storageBucket: "ecommerce-68d1e.appspot.com",
  messagingSenderId: "550638970412",
  appId: "1:550638970412:web:5f2d83455626c92d635389"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

//initialize server
const app = express();

//middlewares
app.use(express.static("public"));
app.use(express.json()) //enables form sharing

//route
//home route
app.get('/', (req, res) => {
    res.sendFile("index.html", {root : "public"})
})

//signup
app.get('/signup', (req, res) =>{
    res.sendFile("signup.html", {root: "public"})
})

app.post('/signup', (req, res) => {
    const {name, email, password, number, tac} = req.body;

    //form validation
    if(name.length < 3){
       res.json({ 'alert' : 'name must be 3 letters long'});
    }else if(!email.length){
       res.json({ 'alert' : 'enter your email'});
    }else if(password.length < 8){
       res.json({ 'alert' : 'password must be more than 7 letters log'});
    }else if(number.length < 10){
       res.json({ 'alert' : 'Invalid phone number'});
    }else if(!tac){
       res.json({ 'alert' : 'you must agree to our terms and conditions'});
    }else{
        //store data in firebase
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({'alert' : 'email already exists'})
            }else{
                // encrypt the password
                bcrypt.genSalt(10,(err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        //set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        })
                    })
                })
            }
        })
    }
})

//404 route
app.get('/404', (req, res) => {
    res.sendFile("404.html", {root: "public"})
})

app.use((req, res) => {
    res.redirect('/404')
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})