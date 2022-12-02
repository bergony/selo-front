import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };
  showAlert = false;
  alertMsg = 'Please wait! We are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth, private http: HttpClient) {}

  ngOnInit(): void {}

  async login() {
    return;
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      console.error(error);
      this.alertMsg = 'An unexpected Error Occurred. Please try again later';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }
    this.alertMsg = 'login';
    this.alertColor = 'green';
  }
  adicionarProduto() {
    var produto = {
      nomeCompleto: 'Bergony',
      login: 'admin693342',
      senha: '123',
      role: 3,
      cpf: '21',
    };

    this.http.post(`/api/usuarios`, produto).subscribe(
      (resultado) => {
        console.log(resultado);
      },
      (erro) => {
        if (erro.status == 400) {
          console.log(erro);
        }
      }
    );
  }
}
