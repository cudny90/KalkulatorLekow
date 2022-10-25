import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Lek} from '../Lek'
import { MedicineService } from '../medicine.service';


@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl('');
  filteredOptions: Observable<Lek[]>;
  leki: Lek[] = [];

  constructor(private medicineService: MedicineService) {}

  ngOnInit() {
    this.getMedicine();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getMedicine(): void {
    this.leki = this.medicineService.getMedicine();
  }

  private _filter(value: string): Lek[] {
    const filterValue = value.toLowerCase();
    return this.leki.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectedMedicine(event) {
    this.medicineService.setName(event.option.value);
  }
}