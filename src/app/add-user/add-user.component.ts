import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  private apiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name() {
    return this.addUserForm.get('name');
  }

  get email() {
    return this.addUserForm.get('email');
  }

  get password() {
    return this.addUserForm.get('password');
  }

  addUser(): void {
    if (this.addUserForm.valid) {
      this.http.post(this.apiUrl, this.addUserForm.value).subscribe(
        () => {
          this.snackBar.open('Usuario agregado con éxito!', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/user-table']);
        },
        error => {
          console.error('Error al agregar al usuario:', error);
          this.snackBar.open('Error al agregar el usuario. Inténtelo de nuevo.', 'Cerrar', {
            duration: 3000
          });
        }
      );
    } else {
      this.snackBar.open('Formulario inválido. Por favor, verifique los datos.', 'Cerrar', {
        duration: 3000
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/user-table']);
  }
}
