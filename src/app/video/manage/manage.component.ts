import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ClipService } from './../../services/clip.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { BehaviorSubject } from 'rxjs';
import IPessoa from 'src/app/models/pessoa.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  clips: IClip[] = [];
  pessoas: IPessoa[] = [];
  activeClip: IPessoa | null = null;
  sort$: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private modal: ModalService,
    private http: HttpClient
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);
  }

  ngOnInit(): void {
    this.carregarPessas();

    this.pessoas.forEach((element) => {
      console.log('arr' + element);
    });
  }

  async carregarPessas() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });

    this.http.get<IPessoa[]>(`/api/pessoas`, { headers: reqHeader }).subscribe({
      next: (data) => {
        console.log('data1' + data);
        this.pessoas = data;
        console.log('data1 2' + this.pessoas);
      },
      error: (error) => {
        console.error(error);
        if (error.status === 403) {
          //this.auth.logout();
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `,
            error.error
          );
        }
        return;
      },
    });
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
    });
  }

  openModal($event: Event, clip: IPessoa) {
    $event.preventDefault();
    this.activeClip = clip;
    this.modal.toggleModal('editClip');
  }

  update($event: IPessoa) {
    this.pessoas.forEach((element, index) => {
      if (element.login == $event.login) {
        this.pessoas[index].nomeCompleto == $event.nomeCompleto;
      }
    });
  }

  deleteClip($event: Event, clip: IPessoa) {
    $event.preventDefault();

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });

    this.http
      .delete(`/api/pessoas/` + clip.id, { headers: reqHeader })
      .subscribe({
        next: (data) => {
          console.log('data1' + data);
          console.log('data1 2' + this.pessoas);
        },
        error: (error) => {
          console.error(error);
          if (error.status === 403) {
            //this.auth.logout();
            console.error('An error occurred:', error.error);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, body was: `,
              error.error
            );
          }
          return;
        },
      });

    this.pessoas.forEach((element, index) => {
      if (element.login == clip.login) {
        this.pessoas.splice(index, 1);
      }
    });
  }

  async copyToClipboard($event: MouseEvent, docId: string | undefined) {
    $event.preventDefault();
    if (!docId) {
      return;
    }

    const url = `${location.origin}/clip/${docId}`;

    await navigator.clipboard.writeText(url);

    alert('Link Copied!');
  }
}
