import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  livros = [
    { data: '1997', edicao: '2', titulo: 'Três porquinhos' },
    { data: '2012', edicao: '1', titulo: 'Meu ensino médio' },
    { data: '2021', edicao: '1', titulo: 'Estudando no imd' },
    { data: '2022', edicao: '5', titulo: 'Como ser rico' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
