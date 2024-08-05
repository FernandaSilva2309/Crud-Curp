import { Component, OnInit, ViewChild, ChangeDetectorRef, TemplateRef, AfterViewInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;

  users: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'password', 'actions'];
  pageSize = 5;
  pageIndex = 0;
  totalLength = 0;
  editForm!: FormGroup;
  currentUser!: any;

  private apiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.onPageChange(event);
    });
  }

  loadUsers(): void {
    const params = new HttpParams()
      .set('page', (this.pageIndex + 1).toString())
      .set('per_page', this.pageSize.toString());

    this.http.get<any>(this.apiUrl, { params }).subscribe(
      response => {
        this.users = response.data;
        this.totalLength = response.total;
        this.cdr.markForCheck();
      },
      error => {
        console.error('Error loading user data:', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  openEditDialog(user: any): void {
    this.currentUser = user;
    this.editForm.setValue({
      name: user.name,
      email: user.email,
      password: user.password
    });
    this.dialog.open(this.editDialog);
  }

  saveUser(): void {
    const updatedUser = { ...this.currentUser, ...this.editForm.value };
    this.http.put(`${this.apiUrl}/${updatedUser.id}`, updatedUser).subscribe(
      () => {
        this.loadUsers(); // Recarga los datos
        this.dialog.closeAll();
        console.log('User updated successfully');
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  deleteUser(user: any): void {
    if (confirm('Estas seguro de que quieres borrar a este usuario?')) {
      this.http.delete(`${this.apiUrl}/${user.id}`).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== user.id);
          console.log('User borrado exitosamente');
          this.loadUsers(); // Recarga los datos
        },
        error => {
          console.error('Error al borrar usuario:', error);
        }
      );
    }
  }

  navigateToAddUser(): void {
    this.router.navigate(['/add-user']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
