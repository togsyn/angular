import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';

declare global {
  interface Window {
    Razorpay: any;
  }
}

@Component({
  selector: 'app-payment-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CurrencyPipe
  ],
  templateUrl: './payment-component.html',
  styleUrls: ['./payment-component.css']
})
export class PaymentComponent {
  userId = 1;
  amount = 0;
  currency = 'INR';
  balance = 0;
  transactions: any[] = [];
  message = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.loadBalance();
    this.loadTransactions();
  }

  loadBalance() {
    this.paymentService.getBalance(this.userId)
      .subscribe((b: number) => this.balance = b);
  }

  loadTransactions() {
    this.paymentService.getTransactions(this.userId)
      .subscribe((txns: any[]) => this.transactions = txns);
  }

  // ✅ Helper to dynamically load Razorpay script
  private loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('razorpay-script')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  recharge(method: string) {
    this.paymentService.rechargeWallet(this.userId, this.amount, method)
      .subscribe((res: any) => {
        this.message = `Recharge initiated with ${method}`;
        this.loadBalance();
        this.loadTransactions();

        if (method === 'razorpay' && res && res.id) {
          const options = {
            key: 'rzp_test_T2fzf3sKCPSwSy', // replace with your Razorpay key
            amount: res.amount,
            currency: res.currency,
            name: 'Togsyn Wallet Recharge',
            description: 'Wallet top-up',
            order_id: res.id,
            handler: (paymentResponse: any) => {
              alert('Payment successful!');
              this.loadBalance();
              this.loadTransactions();
            },
            prefill: {
              name: 'Suresh Thogari',
              email: 'suresh@example.com',
              contact: '9999999999'
            },
            theme: {
              color: '#3399cc'
            }
          };

          // ✅ Ensure script is loaded before using Razorpay
          this.loadRazorpayScript().then(() => {
            if (window.Razorpay) {
              const rzp = new window.Razorpay(options);
              rzp.open();
            } else {
              alert('Razorpay script not loaded. Please refresh.');
            }
          });
        }
      });
  }

  pay() {
    this.paymentService.payFromWallet(this.userId, this.amount)
      .subscribe((res: any) => {
        this.message = 'Payment successful from wallet';
        this.loadBalance();
        this.loadTransactions();
      }, (err: any) => {
        this.message = 'Insufficient balance';
      });
  }
}
