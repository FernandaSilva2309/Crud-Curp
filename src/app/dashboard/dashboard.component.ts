import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('userDetailsModal', { static: true }) userDetailsModal!: TemplateRef<any>;
  @ViewChild('curpDetailsModal', { static: true }) curpDetailsModal!: TemplateRef<any>;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  user: any;
  curps: any[] = [];
  selectedCurp: any = null;
  isEditing: boolean = false;
  displayedColumns: string[] = ['id', 'nombre', 'apellido_paterno', 'apellido_materno', 'fecha_nacimiento', 'entidad', 'sexo', 'curp', 'actions'];
  pageSize = 10; // Número de elementos por página
  pageIndex = 0; // Índice de la página actual
  totalLength = 0; // Total de elementos

  private apiUrl = 'http://127.0.0.1:8000/api/curps'; // URL de tu API de CURP
  private usersApiUrl = 'http://127.0.0.1:8000/api/users'; // URL de tu API de usuarios

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (e) {
        console.error('Error al analizar los datos del usuario', e);
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }

    this.loadCurps();
  }

  loadCurps(): void {
    const params = {
      page: this.pageIndex + 1,
      per_page: this.pageSize
    };

    this.http.get<any>(this.apiUrl, { params }).subscribe(
      response => {
        console.log(response); // Verifica la estructura de la respuesta aquí
        this.curps = Array.isArray(response.data) ? response.data : response; // Ajusta según la estructura de la respuesta
        this.totalLength = response.total; // Ajusta según la estructura de la respuesta
        this.cdr.markForCheck();
      },
      error => {
        console.error('Error al cragar los datos de la CURP:', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCurps();
  }

  openUserDetailsDialog(): void {
    this.dialog.open(this.userDetailsModal);
  }

  closeUserDetailsModal(): void {
    this.dialog.closeAll();
  }

  openModal(curp: any): void {
    this.selectedCurp = { ...curp }; // Copia el CURP seleccionado para editar
    this.isEditing = false;
    this.dialog.open(this.curpDetailsModal);
  }

  editCurp(curp: any): void {
    this.selectedCurp = { ...curp }; // Copia el CURP seleccionado para editar
    this.isEditing = true;
    this.dialog.open(this.curpDetailsModal);
  }

  saveChanges(): void {
    if (this.selectedCurp) {
      this.http.put(`${this.apiUrl}/${this.selectedCurp.id}`, this.selectedCurp).subscribe(
        () => {
          // Actualiza la lista local de CURPs
          const index = this.curps.findIndex(c => c.id === this.selectedCurp.id);
          if (index > -1) {
            this.curps[index] = { ...this.selectedCurp };
            // Actualiza la vista
            this.cdr.markForCheck();
          }
          this.closeModal();
        },
        error => {
          console.error('Error ual actualizar la CURP:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  deleteCurp(curp: any): void {
    if (confirm('Estas seguro de que quiere borrar esta CURP?')) {
      this.http.delete(`${this.apiUrl}/${curp.id}`).subscribe(
        () => {
          this.curps = this.curps.filter(c => c.id !== curp.id);
          console.log('CURP borrada exitosamente ');
          this.loadCurps(); // Recarga los datos
        },
        error => {
          console.error('Error al borrar la CURP:', error);
        }
      );
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  navigateTo(option: string): void {
    switch (option) {
      case 'modify-user':
        // Implementa la navegación o lógica para modificar usuario
        break;
      case 'view-user-data':
        this.openUserDetailsDialog();
        break;
      case 'edit-curp':
        // Implementa la lógica para editar CURP
        break;
      case 'add-curp':
        this.selectedCurp = {};
        this.isEditing = true;
        this.dialog.open(this.curpDetailsModal);
        break;
      case 'view-users':  // Nueva opción para ver usuarios
        this.navigateToUserTable();
        break;
    }
  }

  navigateToUserTable(): void {
    this.router.navigate(['/user-table']);
  }
}
