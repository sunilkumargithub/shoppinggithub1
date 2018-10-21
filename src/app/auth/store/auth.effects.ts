import { Effect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
//import 'rxjs/add/opertaor/switchMap';
//import 'rxjs/add/opertaor/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
      .switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      })
        .mergeMap((token: string) => {
          return [
            {
              type: AuthActions.SIGNUP
            },
            {
              type: AuthActions.SET_TOKEN,
              paylaod: token
            }


          ];


        });

      constructor(private actions$: Actions) {}

    }
