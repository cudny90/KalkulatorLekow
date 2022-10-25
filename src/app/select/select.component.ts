import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(private medicineService: MedicineService) { }
  ngOnInit(): void {
    this.concentrations$ = this.medicineService.concentrations$;
  }

  selectedName: string = "";
  possibleConcentrations: number[];
  selectedMass: number;
  selectedPortion: number;
  numberOfPortions: number;
  selectedConcentration: number;
  result: number;

  concentrations$: Observable<number[]>;

  clearData() {
    this.possibleConcentrations = [];
    this.selectedMass = 0;
    this.selectedPortion = 0;
    this.numberOfPortions = 0;
  }

  // updateConcentrations(medicineName: string) {
  //     this.possibleConcentrations = this.medicineService.updateConcentrations(medicineName);
  //     console.log('Possible concentrations: ', this.possibleConcentrations);
  //   }

  setNumberOfPortions(numberOfPortions: number) {
    console.log("setNumberOfPortions: ", numberOfPortions);
    this.numberOfPortions = numberOfPortions;
    this.calculate();
  }

  calculate() {
    let res = this.selectedMass * this.selectedPortion / this.selectedConcentration / this.numberOfPortions;
    this.result = Math.round(res * 100)/100;
    console.log(`mass: ${this.selectedMass}, portion: ${this.selectedPortion}, concentration: ${this.selectedConcentration}, result: ${this.result}`);
  }
}