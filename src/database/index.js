import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn4a4MMTXKZBZ8-uAKxf22GP3nK4tfX-U",
  authDomain: "info-6129-project-02.firebaseapp.com",
  projectId: "info-6129-project-02",
  storageBucket: "info-6129-project-02.appspot.com",
  messagingSenderId: "1032149609670",
  appId: "1:1032149609670:web:c4fde4bff806458f183bc7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

/**
 * Adds a data to the list of words.
 *
 * @param {object} data
 *   The data to be added.
 * @returns
 *   If successful, returns the id of the added words.
 *   If error, returns null.
 */
export async function save(data) {
  try {
    const dbCollection = collection(db, "words");
    const docRef = await addDoc(dbCollection, data);
    return docRef.id;
  } catch (e) {
    return null;
  }
}

/**
 * Loads all documents from the words collection.
 *
 * @returns
 *   Array with the words.
 */
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

/**
 * Update a word in the database.
 *
 * @param {string} id
 *   The id of the word to be updated.
 * @param {object} data
 *   The updated data.
 * @returns
 *   Whether the data was updated.
 */
export async function update(id, data) {
  try {
    const docRef = doc(db, "words", id);
    await updateDoc(docRef, data);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Deletes a word from the string.
 *
 * @param {string} id
 *   The id of the word to be removed.
 * @returns
 *   Whether the word was removed.
 */
export async function remove(id) {
  try {
    const docRef = doc(db, "words", id);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    return false;
  }
}
