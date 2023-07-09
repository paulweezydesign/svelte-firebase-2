import App from './App.svelte';
import { initializeApp } from "firebase/app";
import { getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';

import {getFirestore, collection, getDocs} from 'firebase/firestore'


const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;


// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBf9YaWd8vAYGAysEr8XulmoLrgsPf_3_k",
	authDomain: "hello-svelte-853b9.firebaseapp.com",
	projectId: "hello-svelte-853b9",
	storageBucket: "hello-svelte-853b9.appspot.com",
	messagingSenderId: "765795193544",
	appId: "1:765795193544:web:0543ade8492d88f4ad8bfd"
  };


// Initialize Firebase
initializeApp(firebaseConfig);



//firestore initialization and config
const db = getFirestore()
const colRef = collection(db, 'kittens')
getDocs(colRef) //get collection reference
	.then((snapshot) => {
		let kittens = []
		snapshot.docs.forEach((doc) => {
			kittens.push({...doc.data(), id: doc.id})
		})
		console.log(kittens)
	})
	.catch(err => {
		console.log(err.message)
	})



//firebase auth initialization
const auth = getAuth()

//signup form
const usignUp = document.querySelector('.signup')
usignUp.addEventListener('submit', (e) => {
	e.preventDefault()


	const email = usignUp.email.value
	const pass = usignUp.password.value

	createUserWithEmailAndPassword(auth, email, pass)
	.then((cred) => {
		console.log('this user has been created:', cred.user)
		usignUp.reset()
	})
	.catch((err) => {
		console.log(err.message)
	})
})



//login and logout function

const ulogout = document.querySelector('.logout')
ulogout.addEventListener('click', () => {
	signOut(auth)
	.then(() => {
		console.log('Thank you for using our service today')
	})
	.catch((err) => {
		console.log(err.message)
	})

})

const ulogin = document.querySelector('.login')
ulogin.addEventListener('submit', (e) => {
	e.preventDefault()

	const umail = ulogin.email.value
	const upass = ulogin.password.value

	signInWithEmailAndPassword(auth, umail, upass)
		.then((cred) => {
			console.log('This user logged in', cred.user)
		})
		.catch((err) => {
			console.log(err.message)
		})
})
