import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { TarjetaCredito } from '../models/TargetCredit';

@Injectable({
  providedIn: 'root',
})
export class TargetService {
  private tarjeta$=new Subject<any>();


  constructor(private firebase: AngularFirestore) {}
  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any> {
    return this.firebase.collection('tarjetas').add(tarjeta);
  }
  obtenerTarjetas(): Observable<any> {
    return this.firebase
      .collection('tarjetas', (ref) => ref.orderBy('fechaCreacion', 'desc'))
      .snapshotChanges();
  }
  eliminarTarjeta(id: string): Promise<any> {
    return this.firebase.collection('tarjetas').doc(id).delete();
  }

  editTarget(id:string,tarjeta:any):Promise<any>{
    return this.firebase.collection('tarjetas').doc(id).update(tarjeta);

  }

  addTargetEdit(tarjeta:TarjetaCredito){
    this.tarjeta$.next(tarjeta);

  }
  getTargetEdit():Observable<TarjetaCredito>{
    return this.tarjeta$.asObservable();
  }
}
