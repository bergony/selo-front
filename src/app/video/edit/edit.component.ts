import { ClipService } from 'src/app/services/clip.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IPessoa from 'src/app/models/pessoa.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IPessoa | null = null;

  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating Clip';
  inSubmission = false;
  @Output() update = new EventEmitter();

  login = new FormControl('', {
    nonNullable: true,
  });
  nomeCompleto = new FormControl();

  cpf = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(14),
    ],
    nonNullable: true,
  });

  editForm = new FormGroup({
    nomeCompleto: this.nomeCompleto,
    login: this.login,
    cpf: this.cpf,
  });

  constructor(
    private modal: ModalService,
    private clipService: ClipService,
    private http: HttpClient
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip?.login) {
      return;
    }
    this.inSubmission = false;
    this.showAlert = false;

    this.login.setValue(this.activeClip.login);
    this.nomeCompleto.setValue(this.activeClip.nomeCompleto);
    this.cpf.setValue(this.activeClip.cpf);
  }
  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating Clip';

    this.activeClip.nomeCompleto = this.nomeCompleto.value;
    this.activeClip.login = this.login.value;
    this.activeClip.cpf = this.cpf.value;

    console.log('error foi' + this.activeClip);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });

    await this.http
      .put(`/api/pessoas/` + this.activeClip.id, this.activeClip, {
        headers: reqHeader,
      })
      .subscribe({
        next: (v) => console.log('next' + v),
        error: (e) => {
          console.error('error foi' + e);
          this.inSubmission = false;
          this.alertColor = 'red';
          this.alertMsg = 'Something went wrong. Try again later';
          return;
        },
      });

    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';
  }
}
