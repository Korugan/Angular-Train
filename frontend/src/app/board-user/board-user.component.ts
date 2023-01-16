import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserContentService } from '../_services/user-content.service';
import { Client } from '../interface/clients';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
})
export class BoardUserComponent implements OnInit {
  content: string;
  clients: Client[];
  clientDetail: Client;
  showClient: boolean;
  isLogged: boolean;
  clientSelected: string;
  check: boolean;
  loading: boolean;
  isLoading: boolean;
  constructor(
    private userService: UserService,
    private userContentService: UserContentService,
    private router: Router
  ) {
    this.showClient = false;
    this.isLogged = false;
    this.clientSelected = '-1';
    this.check = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      (data) => {
        this.content = data;
        if (data == 'Contenido de Usuario.') {
          this.isLogged = true;
        }
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
        if (err.status === 403) {
          this.router.navigate(['login']);
        }
      }
    );
    this.userContentService.getClients().subscribe(
      (data) => {
        this.clients = JSON.parse(data) as Client[];
        if (this.clients) {
          this.loading = false;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
  clientDetails(_id: string) {
    this.isLoading = true;
    this.showClient = false;
    this.clientSelected = _id;
    this.getClientDetail(this.clientSelected);
  }

  clientDetailsDropDown(event) {
    this.isLoading = true;
    this.showClient = false;
    this.clientSelected = event.srcElement.value;
    this.getClientDetail(this.clientSelected);
  }
  checkChange(event) {
    this.check = event.srcElement.checked;
  }

  getClientDetail(_id: string) {
    this.userContentService.getClient(_id).subscribe(
      (data) => {
        this.clientDetail = JSON.parse(data) as Client;
        this.showClient = true;
        if (this.clientDetail) {
          this.isLoading = false;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
