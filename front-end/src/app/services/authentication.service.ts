import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';

import { environment } from '@environments/environment';


import { Router } from '@angular/router';
import { IUser } from '@app/models/user';

const httpHeaderOption = {
	headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // Authorization: 'X-CSRFToken',
        // Authorization : 'Token key_str'
    })
    ,
	// withCredentials: true,
    // observe: 'response' as 'response',
};

export interface ICanActivateRoutes
{
	Home          : boolean;
	Vehicles      : boolean;
	Employes      : boolean;
	Logistic      : boolean;
	Establishment : boolean;
}

export interface ILoginResponse 
{
	success : boolean;
	status  : number;
	message?: string;
	user?   : IUser;
}

interface IDjangoLoginResponse
{
	errors? : {
		PasswordError: boolean,
		UsernameError: boolean,
	};
	details  : 'failure' | 'success',
	username : string | null;
	token    : string | null,
}


@Injectable({ providedIn: 'root'})
export class AuthenticationService
{
    private _currentUserSubject: BehaviorSubject<IUser|null>; // BehaviorSubject<IUser>
    private _CurrentUser$ : Observable<IUser|null>;
	private _logged_in$   : BehaviorSubject<boolean>;
	private _login_status$: BehaviorSubject<ILoginResponse | null>;

	private url : string = `${environment.apiURL}`;

    constructor(private http: HttpClient, private router: Router)
    {
        
        let user = JSON.parse(localStorage.getItem('currentUser') || '{"none": "none"}');
		
        this._currentUserSubject = new BehaviorSubject<IUser|null>(user);
        this._CurrentUser$       = this._currentUserSubject.asObservable();
		this._logged_in$ = new BehaviorSubject<boolean>(false);
		this._login_status$ = new BehaviorSubject<ILoginResponse | null>(null);
		this._currentUserSubject.subscribe(user=>{
			if (!user)
			{
				this._logged_in$.next(false);
			}else{
				this._logged_in$.next(true);
			}
		});
    }

    public get CurrentUserValue() : IUser | null
    {
        return this._currentUserSubject.value;
    }

	private setUser(user: IUser)
	{
		this._currentUserSubject.next(user);
	}

    public login$(username: string, password: string)
    {
        /**
         * interface IUserRequest
         * {
         *      UsernameOrEmail: string;
         *      Password: string
         * }
         */
        const url = `${this.url}login`;
        this.http.post<IUser>(url,
            	{
					username: username, 
					password: password
				},
            	httpHeaderOption
		).subscribe({
			error : (e)=>
			{
				let ret: ILoginResponse = {
					success: false,
					status: e.status,
					message: 'error'
				}
				if (e.status === 401)
				{
					ret.message = 'error forbidden';
				}
				this._login_status$.next(ret);
			},
			next: (response: any)=>{
				let ret: ILoginResponse = {
					success: true,
					status: 200,
					message: 'success'
				};

				if (response['details'] === 'success'){
					
					let _user:IUser = {
						username      : response.username,
						token         : response.token
					};

					const user: string = JSON.stringify(_user);

					this.setUser(_user);
					localStorage.setItem('currentUser', user);
					ret.user = _user;
					this._login_status$.next(ret);
					this._logged_in$.next(true);
				}
				

			},
		})
		return this._login_status$;
        
    }

    public logout()
    {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser'); // remember me false
        this._currentUserSubject.next(null);
		this._logged_in$.next(false);
		this._login_status$.next(null);

		this.router.navigate(['/login']);
		localStorage.clear();
    }


	get logged_in$ () {return this._logged_in$.asObservable(); }
	get login_status$(){ return this._login_status$.asObservable();}

}