import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { finalize, map, Observable, switchMap } from 'rxjs';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore, private auth: Auth){}

  private storage = getStorage();

  uploadFile(file: File): Observable<string> {
    return new Observable((observer) => {
      const filePath = `movies/${file.name}`;
      const storageRef = ref(this.storage, filePath);

      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          observer.next(downloadURL); // Emitir la URL del archivo
          observer.complete(); // Completar el observable
        });
      }).catch((error) => {
        observer.error(error); // Emitir error si ocurre
      });
    });
  }

  async saveMovie(movieData: any): Promise<void> {
    const moviesCollection = collection(this.firestore, 'movies');
    await addDoc(moviesCollection, movieData);
  }

  guardarActor(data: any){
    const col = collection(this.firestore,'actores');
    addDoc(col,data);
  }

  guardarChofer(data: any){
    const col = collection(this.firestore,'choferes');
    addDoc(col,data);
  }


  traerActores(): Observable<any[]> {
    const actoresCollection = collection(this.firestore, 'actores'); // Acceder a la colección 'actores'
    return collectionData(actoresCollection); // Obtener los datos de la colección
  }

  traerChoferes(): Observable<any[]> {
    const choferesCollection = collection(this.firestore, 'choferes'); // Acceder a la colección 'choferes'
    return collectionData(choferesCollection); // Obtener los datos de la colección
  }

  traerPeliculas(): Observable<any[]> {
    const actoresCollection = collection(this.firestore, 'movies'); // Acceder a la colección 'movies'
    return collectionData(actoresCollection); // Obtener los datos de la colección
  }

  traerPeliculasPorDocumento(documentoProtagonista: string): Observable<any[]> {
    const actoresCollection = collection(this.firestore, 'movies'); // Acceder a la colección 'movies'
    
    // Crear la consulta con el filtro por 'documentoProtagonista'
    const q = query(actoresCollection, where('documentoProtagonista', '==', documentoProtagonista));
    
    // Obtener los datos filtrados de la colección
    return collectionData(q);
  }

  // Método para iniciar sesión con email y contraseña
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

}
