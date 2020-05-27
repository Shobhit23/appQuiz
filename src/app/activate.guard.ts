import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResultShareService } from './result-share.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {

  constructor(private resultShareService : ResultShareService,private route:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.resultShareService.getTime()>0){
        return true;
      }
      this.route.navigateByUrl("");
      return false;
  }
  
}
