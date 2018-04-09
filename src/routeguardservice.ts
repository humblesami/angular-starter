import {Injectable} from '@angular/core'
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router'

@Injectable()
export class RouteGuardService implements CanActivate {
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let snackTypeId = route.url[1].path;
    if(snackTypeId == 2){
      alert('Not available for guest users!');
      return false;
    }
    return true;
  }
}