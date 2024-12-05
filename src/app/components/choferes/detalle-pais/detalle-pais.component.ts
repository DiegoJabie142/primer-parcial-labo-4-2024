import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, HttpClientModule, CommonModule],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css'
})
export class DetallePaisComponent {

@Input() countryName!: string; // Recibe el nombre del país como input
countryData: any;

constructor(private http: HttpClient) {}

ngOnInit() {
  this.loadCountryData(); // Carga los datos al inicializar
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['countryName']) {
    this.loadCountryData(); // Carga los datos cada vez que cambie el país
  }
}

loadCountryData() {
  if (this.countryName) {
    this.getCountryByName(this.countryName).subscribe(
      (data) => {
        this.countryData = data[0]; // El primer país encontrado
      },
      (error) => {
        console.error('Error fetching country data', error);
      }
    );
  }
}

getLanguages(languages: any): string {
  return Object.values(languages).join(', ');
}

getCurrencies(currencies: any): string {
  return Object.values(currencies)
    .map((currency: any) => `${currency.name} (${currency.symbol})`)
    .join(', ');
}


getCountryByName(countryName: string): Observable<any> {
  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;
  return this.http.get<any>(apiUrl);
}
}
