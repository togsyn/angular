import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private walletApi = 'http://localhost:8080/api/wallet';   // Wallet Service
  private paymentApi = 'http://localhost:8081/api/payments'; // Payment Gateway Service

  constructor(private http: HttpClient) {}

  rechargeWallet(userId: number, amount: number, method: string): Observable<any> {
    return this.http.post(`${this.walletApi}/recharge?userId=${userId}&amount=${amount}&method=${method}`, {});
  }

  // Pay from wallet
  payFromWallet(userId: number, amount: number): Observable<any> {
    return this.http.post(`${this.walletApi}/pay?userId=${userId}&amount=${amount}`, {});
  }

  // Get balance
  getBalance(userId: number): Observable<number> {
    return this.http.get<number>(`${this.walletApi}/balance/${userId}`);
  }

  // Get transactions
  getTransactions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.walletApi}/transactions/${userId}`);
  }
}
