import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth : AuthService,
              private router : Router) { }
  
  canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | Observable<boolean> | Promise<boolean>{
    return new Promise(resolve =>{
      this.auth.isConnected().subscribe(user =>{
        if(user) return resolve(true);
        else {
          this.router.navigate(['/login']);
          return resolve(false);
        }
      });
    })
  }
}
