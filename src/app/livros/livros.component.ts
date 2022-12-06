import { Component, OnInit } from '@angular/core';

import { Livro } from '../models/livro.model';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  livros: Livro[] = [
    { id: 1, emprestimo_id: 1, pessoa_id: 1, data_lancamento: '1997', edicao: '2', titulo: 'Três porquinhos' },
    { id: 2, emprestimo_id: 1, pessoa_id: 1, data_lancamento: '2022', edicao: '4', titulo: 'Ingles' },
    { id: 3, emprestimo_id: 1, pessoa_id: 1, data_lancamento: '1997', edicao: '2', titulo: 'Matematica' },
    { id: 4, emprestimo_id: 1, pessoa_id: 1, data_lancamento: '1997', edicao: '2', titulo: 'Portugues' },
  ];
  livro_completo = '';

  constructor() { }

  ngOnInit(): void {
  }

  mostrarDetalhes(livro: Livro) {
    this.livro_completo = `o Titulo é: ${livro.titulo} com ano ${livro.data_lancamento} e edição: ${livro.edicao} `;
  }

}
