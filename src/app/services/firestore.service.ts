import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentReference, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, finalize, map, Observable, switchMap } from 'rxjs';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private firestore: Firestore, private auth: Auth){
    this.initAuthStateListener();
  }

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

  guardarChofer(data: any): Promise<void> {
    const col = collection(this.firestore, 'choferes');
    return addDoc(col, data)
      .then((docRef: DocumentReference<DocumentData>) => {
        console.log('Chofer guardado con ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error al guardar el chofer:', error);
        throw error; // Propagar el error para manejarlo en el llamado
      });
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
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Verificamos si el correo es admin@example.com
        if (user.email === 'admin@example.com') {
          localStorage.setItem('rol', 'admin');  // Guardamos el rol de admin en localStorage
        } else {
          localStorage.removeItem('rol');  // En caso de que no sea admin, eliminamos el rol
        }

        return userCredential; // Retornamos el UserCredential después del login
      })
      .catch((error) => {
        console.error('Error during login:', error);
        throw error;
      });
  }

  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        console.log('Usuario ha cerrado sesión exitosamente');
        
        // Borrar los datos del localStorage
        localStorage.removeItem('rol');  // Eliminar el rol
        localStorage.removeItem('token'); // Eliminar token de autenticación u otros datos si es necesario
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        throw error; // Rechazar el Promise para que el llamador pueda manejar el error
      });
  }

  getAuth(): Observable<any> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          observer.next(user); // Emitir el usuario autenticado
        } else {
          observer.next(null); // Emitir null si no hay usuario
        }
        observer.complete(); // Completar el observable
      }, (error) => {
        observer.error(error); // Emitir error si ocurre
      });
    });
  }


  private initAuthStateListener() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedInSubject.next(!!user); // Emitir true si hay usuario, false si no
    });
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable(); // Permitir suscripción al estado
  }

  isUserLoggedInSync(): boolean {
    return this.isLoggedInSubject.value; // Devolver valor actual sincrónicamente
  }

  guardarVehiculo(data: any): Promise<DocumentReference<DocumentData>> {
    const col = collection(this.firestore, 'vehiculos');
    return addDoc(col, data);
  }

  traerVehiculos(): Observable<any[]> {
    const vehiculosCollection = collection(this.firestore, 'vehiculos');
    return collectionData(vehiculosCollection, { idField: 'id' }); // Agrega idField para obtener el ID del documento
  }

  actualizarVehiculo(vehiculo: any): Promise<void> {
    // Asegúrate de que el vehículo tiene un ID válido antes de intentar actualizarlo
    if (!vehiculo.id) {
      return Promise.reject('No se proporcionó un ID de vehículo válido');
    }
  
    const vehiculoRef = doc(this.firestore, `vehiculos/${vehiculo.id}`);
  
    // Realiza la actualización solo con los campos necesarios
    return updateDoc(vehiculoRef, {
      tipo: vehiculo.tipo,
      cantidadRuedas: vehiculo.cantidadRuedas,
      capacidadPromedio: vehiculo.capacidadPromedio
    });
  }

  eliminarVehiculo(vehiculoId: string): Promise<void> {
    // Referencia al documento del vehículo en la colección "vehiculos"
    const vehiculoRef = doc(this.firestore, `vehiculos/${vehiculoId}`);
    
    // Elimina el documento del vehículo
    return deleteDoc(vehiculoRef)
      .then(() => {
        console.log(`Vehículo con ID ${vehiculoId} eliminado con éxito.`);
      })
      .catch((error) => {
        console.error("Error al eliminar el vehículo: ", error);
        throw error;  // Lanzar el error para que pueda ser manejado en el componente
      });
  }
}
