import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any = {};

  // Simulación de datos
  users = [
    { id: 1, nombre: 'Juan', apellido_paterno: 'Pérez', apellido_materno: 'Gómez', fecha_nacimiento: '1990-01-01', entidad: 'CDMX', sexo: 'M' },
    { id: 2, nombre: 'María', apellido_paterno: 'López', apellido_materno: 'Sánchez', fecha_nacimiento: '1992-02-02', entidad: 'EdoMex', sexo: 'F' }
    // Agrega más datos según sea necesario
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null && !isNaN(id)) {
      this.user = this.users.find(user => user.id === id) || {};
    } else {
      // Manejo del error, como redirigir a una página de error o mostrar un mensaje
      console.error('ID inválido');
      this.router.navigate(['/view-user-data']);
    }
  }

  saveChanges(): void {
    // Aquí se actualizaría el dato, por ahora solo redirige
    this.router.navigate(['/view-user-data']); // Redirige después de la actualización
  }
}
