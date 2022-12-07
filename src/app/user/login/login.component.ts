import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
interface token {
  login: number;
  token: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    login: '',
    senha: '',
  };
  showAlert = false;
  alertMsg = 'Please wait! We are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  token = '';

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {}

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Por favor, espere! Estamos logando você.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    await this.http
      .post<token>(`/api/usuarios/auth`, this.credentials)
      .subscribe({
        next: (data) => {
          console.log('data' + data);

          this.token = data.token;
          let key = 'token';
          sessionStorage.setItem(key, this.token);
          this.auth.createUser();
        },
        error: (error) => {
          console.error(error);
          this.alertMsg =
            'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde';
          this.alertColor = 'red';
          this.inSubmission = false;
          return;
        },
      });

    this.alertMsg = 'login';
    this.alertColor = 'green';
  }
}
