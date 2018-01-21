import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin-start',
  templateUrl: './coin-start.component.html',
  styleUrls: ['./coin-start.component.css']
})
export class CoinStartComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
