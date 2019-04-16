import {Userlevel} from './userlevel';
import {Sex} from "./sex";
import DateTimeFormat = Intl.DateTimeFormat;


export class User {

  private userLevel: Userlevel;
  private id: number;
  private firstName: String;
  private lastName: String;
  private city: string;
  private socialSecurityNr: number;
  private address: String;
  private zipCode: number;
  private sex: Sex;
  private lastLogin: DateTimeFormat;
  private loggedIn: boolean;
  private sessionID: number;

  isAdmin (): boolean {
    return this.userLevel === Userlevel.Admin;
  }

  isLoggedIn (): boolean {
    return this.loggedIn;
  }

  getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  getUID (): number {
    return this.id;
  }

  getSession (): number {
    return this.sessionID;
  }

  getLastOnline(): DateTimeFormat {
    return this.lastLogin;
  }








}
