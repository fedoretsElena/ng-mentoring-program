import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as userActions from './user.actions';
import * as routerActions from './../router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  loadUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(userActions.loadUser),
      switchMap(({token}) => this.authService.getUser(token)),
      map((user: User) => userActions.loadUserSuccess({data: user})),
      catchError(() => of(userActions.loadUserFailure({
        error: 'Load user failed.'
      })))
    ));


  loadUserSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(
      userActions.loadUserSuccess
    ),
    map(() => routerActions.go({
        path: ['./courses']
      })
    )));
}
