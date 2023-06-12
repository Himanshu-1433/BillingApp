import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-pdf-genrator',
  templateUrl: './bill-pdf-genrator.component.html',
  styleUrls: ['./bill-pdf-genrator.component.css']
})
export class BillPdfGenratorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(history.state);
  }

}
