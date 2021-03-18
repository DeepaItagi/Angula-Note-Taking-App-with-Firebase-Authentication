import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from './../../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email=null;
  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    auth.getUser().subscribe((user) => {
      this.email = user?.email;
    });
  }

  ngOnInit(): void {
  }

  async handleSignOut(){
    try{
      const res= await this.auth.signOut();
      this.router.navigateByUrl('/signin');
      this.toastr.info('Login Again to continue');
      this.email = null;
    }
    catch(error)
    {
      this.toastr.error('Something is wrong');
    }
  }
}
