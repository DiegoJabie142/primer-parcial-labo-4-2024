import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tabla-paises.component.html',
  styleUrl: './tabla-paises.component.css'
})
export class TablaPaisesComponent {

  // Lista de países de América del Sur con nombre y bandera
  southAmericanCountries: { name: string, flag: string }[] = [];

  // EventEmitter para emitir el país seleccionado
  @Output() countrySelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    // Llamar a la función que obtiene los países cuando el componente se inicializa
    this.getSouthAmericanCountries();
  }

  // Método para obtener los países de América del Sur
  getSouthAmericanCountries() {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(countries => {
        // Filtrar los países de América del Sur y asignarlos a la variable
        this.southAmericanCountries = countries
          .filter((country: any) => country.subregion === 'South America')
          .map((country: any) => ({
            name: country.name.common,
            flag: country.flags.png // Obteniendo la URL de la bandera en formato PNG
          }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Método que se ejecuta al hacer clic en un país
  onCountryClick(country: string) {
    // Emitir el país seleccionado
    this.countrySelected.emit(country);
  }
}

