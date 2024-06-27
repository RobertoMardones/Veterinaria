// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, updateDoc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqFNClaNQ1-FiyloBnjUjxptUCc7QPv8E",
    authDomain: "miapp2-be4f4.firebaseapp.com",
    projectId: "miapp2-be4f4",
    storageBucket: "miapp2-be4f4.appspot.com",
    messagingSenderId: "280355983537",
    appId: "1:280355983537:web:91e6792941a70e23e4d290"
  };


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const save = async (mascota) => {
    const q = query(collection(db, 'Veterinaria'), where("run", "==", mascota.run ))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty){
        await addDoc(collection(db, 'Veterinaria'), mascota)
        return true
    }
    else{
        console.log('Ya existe')
        return false
    }

}


export const getAll = (data) => {
    onSnapshot(collection(db, 'Veterinaria'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'Veterinaria', id))
}

export const selectOne = (id) => getDoc(doc(db, 'Veterinaria', id))



// ARREGLAR EDITAR AL CAMBIAR SOLAMENTE EL NOMBRE U OTRO DATO
export const edit = (id, mascota) => {
    updateDoc(doc(db, 'Veterinaria', id), mascota)
}

