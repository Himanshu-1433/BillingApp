import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bill-generator',
  templateUrl: './bill-generator.component.html',
  styleUrls: ['./bill-generator.component.css'],
})
export class BillGeneratorComponent implements OnInit {
  routingData : any;
  ownerBillDetails!: Object;
  reciverBill!: FormGroup;
  formDetail: any;
  isDisable: boolean = true;
  rupeesWord: string = 'hello';
  amount!: Array<number>;
  totalAmount: any = 0;
  dummyAm = 10;
  constructor(
    private router: ActivatedRoute,
    private routeData: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.ownerBillDetails = history.state;
    this.reciverBill = this.fb.group({
      ownerBill : history.state,
      recipientName: this.fb.control(''),
      recipientGSTNumber: this.fb.control(''),
      recipientInvoiceNum: this.fb.control(''),
      billDate: this.fb.control(''),
      billAddress: this.fb.control(''),
      state: this.fb.control(''),
      stateCode: this.fb.control(''),
      productItems: this.fb.array([
        this.fb.group({
          productDetails: this.fb.control(''),
          HSNCode: this.fb.control(''),
          QTY: this.fb.control(''),
          price: this.fb.control(''),
          amount: this.fb.control(''),
        }),
      ]),
      rupeesInWord: this.fb.control(''),
      cGstTax: this.fb.control(0),
      sGstTax: this.fb.control(0),
      iGstTax: this.fb.control(0),
      totalBillAmount: this.fb.control('0'),
    });
    this.formDetail = this.reciverBill.value;
    const total = 0;
  }

  get productItems(): FormArray {
    return this.reciverBill.get('productItems') as FormArray;
  }

  addproductItem() {
    let items = this.fb.group({
      productDetails: [''],
      HSNCode: [''],
      QTY: this.fb.control({ value: '' }),
      price: this.fb.control({ value: '' }),
      amount: this.fb.control(''),
    });
    this.productItems.push(items);
  }

  deleteItems(itemsNumber: number) {
    this.productItems.removeAt(itemsNumber);
    this.calculateTotalItemsAmount();
    this.calculateGST();
  }

  Number(type: any) {
    return Number(type);
  }

  rupeesToWordConveter(value: any) {
    let number = value.split('.');
    if (number.length > 1) {
      // console.log("splited : " + number);
      let fNum = number[0];
      let lNum = number[1];
      // console.log(fNum + " " +lNum);
      if (lNum.length > 2) {
        let passingNumber = lNum.substring(0, 2);
        this.reciverBill.controls['rupeesInWord'].setValue(
          this.wordConveter(number[0]) +
            ' point' +
            this.wordConveter(passingNumber) +
            'Only'
        );
        return this.wordConveter(number[0]) + ' point' + this.wordConveter(passingNumber) + 'Only';
      } else {
        this.reciverBill.controls['rupeesInWord'].setValue(
          this.wordConveter(fNum) +
            ' point' +
            this.wordConveter(lNum) +
            'Only'
        );
        return this.wordConveter(number[0]) + ' point' + this.wordConveter(lNum) + 'Only'
      }
    } else {
      this.reciverBill.controls['rupeesInWord'].setValue(
        this.wordConveter(number[0]) + 'Only'
      );
      return this.wordConveter(number[0]) + 'Only';
      // console.log("not splited : " + number);
    }
  }

  wordConveter(value: any) {
    let price = value;
    var sglDigit = [
        'Zero',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
      ],
      dblDigit = [
        'Ten',
        'Eleven',
        'Twelve',
        'Thirteen',
        'Fourteen',
        'Fifteen',
        'Sixteen',
        'Seventeen',
        'Eighteen',
        'Nineteen',
      ],
      tensPlace = [
        '',
        'Ten',
        'Twenty',
        'Thirty',
        'Forty',
        'Fifty',
        'Sixty',
        'Seventy',
        'Eighty',
        'Ninety',
      ],
      handle_tens = function (dgt: any, prevDgt: any) {
        return 0 == dgt
          ? ''
          : ' ' + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
      },
      handle_utlc = function (dgt: any, nxtDgt: any, denom: any) {
        return (
          (0 != dgt && 1 != nxtDgt ? ' ' + sglDigit[dgt] : '') +
          (0 != nxtDgt || dgt > 0 ? ' ' + denom : '')
        );
      };

    var str = '',
      digitIdx = 0,
      digit = 0,
      nxtDigit = 0,
      words = [];
    if (((price += ''), isNaN(parseInt(price)))) str = '';
    else if (parseInt(price) > 0 && price.length <= 10) {
      for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
        switch (
          ((digit = price[digitIdx] - 0),
          (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
          price.length - digitIdx - 1)
        ) {
          case 0:
            words.push(handle_utlc(digit, nxtDigit, ''));
            break;
          case 1:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
          case 2:
            words.push(
              0 != digit
                ? ' ' +
                    sglDigit[digit] +
                    ' Hundred' +
                    (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                      ? ' and'
                      : '')
                : ''
            );
            break;
          case 3:
            words.push(handle_utlc(digit, nxtDigit, 'Thousand'));
            break;
          case 4:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
          case 5:
            words.push(handle_utlc(digit, nxtDigit, 'Lakh'));
            break;
          case 6:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
          case 7:
            words.push(handle_utlc(digit, nxtDigit, 'Crore'));
            break;
          case 8:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
          case 9:
            words.push(
              0 != digit
                ? ' ' +
                    sglDigit[digit] +
                    ' Hundred' +
                    (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2]
                      ? ' and'
                      : ' Crore')
                : ''
            );
        }
      str = words.reverse().join('');
    } else str = '';
    return str;
  }

  setItemAmount(num: any, qty: any, price: any) {
    // console.log("clicked : " + num);
    // console.log(this.productItems);
    let amount = qty * price;
    this.calculateTotalItemsAmount();
    this.productItems.at(num).get('amount')?.setValue(amount);
    return amount;
  }

  calculateTotalItemsAmount() {
    let total = 0;
    this.amount = this.productItems.value.map((curEle: any) => {
      let totalAmount = Number(curEle.QTY) * Number(curEle.price);
      return totalAmount;
    });
    if (this.amount.length > 1) {
      this.totalAmount = this.amount.reduce((preVal, curVal) => {
        return preVal + curVal;
      });
      // console.log('the multiple total Amount' + this.totalAmount);
      this.reciverBill.controls['totalBillAmount'].setValue(this.totalAmount);
    } else {
      this.totalAmount = this.amount[0];
      // console.log('the single total Amount' + this.totalAmount);
      this.reciverBill.controls['totalBillAmount'].setValue(this.totalAmount);
    }
    this.calculateGST();
  }

  calculateGST() {
    let num =
      Number(this.reciverBill.get('cGstTax')?.value) +
      Number(this.reciverBill.get('sGstTax')?.value) +
      Number(this.reciverBill.get('iGstTax')?.value);
    let gst = 0;
    gst = (this.totalAmount * num) / 100 + this.totalAmount;
    // console.log('gst :: ', gst);
    this.reciverBill.controls['totalBillAmount'].setValue(gst);
  }

  showData() {
    console.log(this.reciverBill);
  }
}
