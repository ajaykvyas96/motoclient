import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
	private sidenav: MatSidenav;
	public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);


	public setSidenav(sidenav: MatSidenav) {
		this.sideNavToggleSubject = new BehaviorSubject<MatSidenav>(sidenav);

		this.sidenav = sidenav;
	}

	public open() {
		return this.sideNavToggleSubject.next(this.sidenav);
	}


	public close() {
		return this.sidenav.close();
	}

	public toggle(): void {
		return this.sideNavToggleSubject.next(null);
	}
}