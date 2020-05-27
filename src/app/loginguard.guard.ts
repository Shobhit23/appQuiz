import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResultShareService } from './result-share.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {

  constructor(private resultShareService : ResultShareService,private route : Router){}

  loggedInStatus : boolean = false;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.resultShareService.loggedInStatus.subscribe(data => this.loggedInStatus=data);

      if(this.loggedInStatus==true){
        return true;
      }
      else{
        this.route.navigateByUrl('/home');
        return false;
      }
  }
  
}
