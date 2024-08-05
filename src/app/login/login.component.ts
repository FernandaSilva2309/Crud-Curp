  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
  export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    users: any[] = [];  // Lista de usuarios obtenidos de la API

    constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        rememberMe: [false],
      });
    }

    ngOnInit(): void {
      // Obtener la lista de usuarios desde la API
      this.http.get<any[]>('http://127.0.0.1:8000/api/users').subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      );
    }

    onSubmit(): void {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;

        // Buscar el usuario con el email ingresado en la lista obtenida
        const user = this.users.find(u => u.email === email);

        if (user) {
          // Verificar la contraseña (esto es solo un ejemplo, en una API real no deberías manejar contraseñas de esta manera)
          if (user.password === password) {
            // Usuario y contraseña válidos
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/dashboard']);
          } else {
            // Contraseña incorrecta
            alert('Contraseña incorrecta');
          }
        } else {
          // Usuario no encontrado
          alert('Usuario no encontrado');
        }
      }
    }
  }
