import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
})
export class ClipComponent implements OnInit {
  id = '';

  constructor(public router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe((parans: Params) => {
      this.id = parans['id'];
    });
  }
}
