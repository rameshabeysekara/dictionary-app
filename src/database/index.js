import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAn4a4MMTXKZBZ8-uAKxf22GP3nK4tfX-U",
  authDomain: "info-6129-project-02.firebaseapp.com",
  projectId: "info-6129-project-02",
  storageBucket: "info-6129-project-02.appspot.com",
  messagingSenderId: "1032149609670",
  appId: "1:1032149609670:web:c4fde4bff806458f183bc7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function save(data) {
  try {
    const dbCollection = collection(db, "words");
    const docRef = await addDoc(dbCollection, data);
    return docRef.id;
  } catch (e) {
    return null;
  }
}

export async function load() {
  const data = [];

  const querySnapshot = await getDocs(collection(db, "words"));
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return data;
}

export async function remove(id) {
  try {
    const docRef = doc(db, "words", id);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    return false;
  }
}
