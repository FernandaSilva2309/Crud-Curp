// curp-form.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curp-form',
  templateUrl: './curp-form.component.html',
  styleUrls: ['./curp-form.component.css']
})
export class CurpFormComponent {
  newCurp = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    entidad: '',
    sexo: '',
    curp: ''
  };

  private apiUrl = 'http://127.0.0.1:8000/api/curps'; // URL de tu API de CURP

  constructor(private router: Router, private http: HttpClient) {}

  registerCurp() {
    // Formatear la fecha de nacimiento si es necesario
    if (this.newCurp.fecha_nacimiento) {
      const formattedDate = new Date(this.newCurp.fecha_nacimiento).toISOString().split('T')[0];
      this.newCurp.fecha_nacimiento = formattedDate;
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post(this.apiUrl, this.newCurp, { headers }).subscribe(
      response => {
        console.log('CURP registrada con éxito', response);
        this.router.navigate(['/dashboard']); // Ajusta la ruta según tu configuración
      },
      error => {
        console.error('Error registrando la CURP', error);
        if (error.status === 422) {
          console.error('Contenido no procesable: Verifica los datos enviados.');
        }
      }
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']); // Ajusta la ruta según tu configuración
  }

  editCurp(element: any): void {
    this.router.navigate(['/edit-user', element.id]);
  }

}
