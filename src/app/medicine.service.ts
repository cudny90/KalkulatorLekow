import { Injectable } from '@angular/core';
import { Lek } from './Lek';
import { LEKI } from './mock-leki';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MedicineService {  

  selectedName: string = '';
  private concentractionsSubject = new Subject<number[]>();
  readonly concentrations$ = this.concentractionsSubject.asObservable();

  constructor() { }

  getMedicine(): Lek[] {
    return LEKI;
  }

  setName(name: string) {
    console.log("setname");
    this.selectedName = name;
    this.concentractionsSubject.next(this.updateConcentrations(this.selectedName));
  }

  updateConcentrations(medicineName: string): number[] {
    console.log("wdpokw");
    return LEKI.filter(item => item.name === medicineName)[0].concentrations;
  }  
}