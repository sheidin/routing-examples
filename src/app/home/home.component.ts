import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService) { }

    ngOnInit() {

    }

    navigateToServers(id: number) {
        this._router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: '1'}, fragment: 'loading'});
    }

    login() {
      this._authService.login();
    }

    logout() {
      this._authService.logout();
    }
}
