import { HttpClient } from '@angular/common/http';
import { EmailTaken } from './../validators/email-taken';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private emailTaken: EmailTaken,
    private http: HttpClient
  ) {}

  inSubmission = false;
  userDate: IUser | null = null;

  nomeCompleto = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  login = new FormControl('', [Validators.required, Validators.email]);

  senha = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  cpf = new FormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
  ]);

  showAlert = false;
  alertMsg = 'Please wait! Your accont is being created.';
  alertColor = 'blue';

  registerForm = new FormGroup({
    nomeCompleto: this.nomeCompleto,
    login: this.login,
    senha: this.senha,
    cpf: this.cpf,
  });

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your accont is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    const { login, senha, nomeCompleto, cpf } = this.registerForm.value;
    this.userDate = this.registerForm.value as IUser;

    this.userDate.role = 3;

    await this.http.post(`/api/usuarios`, this.userDate).subscribe({
      next: (v) => console.log('next' + v),
      error: (e) => {
        console.error('error foi' + e);
        this.alertMsg = 'An unexpected Error Occurred. Please try again later';
        this.alertColor = 'red';
        this.inSubmission = false;

        return;
      },
    });

    this.alertMsg = 'Sucess! Your account has been created';
    this.alertColor = 'green';
  }
}
