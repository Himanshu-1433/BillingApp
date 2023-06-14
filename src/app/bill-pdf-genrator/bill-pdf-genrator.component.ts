import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfFonts  from "pdfmake/build/vfs_fonts";  
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
// const pdfMake = require('pdfmake/build/pdfmake.js');
@Component({
  selector: 'app-bill-pdf-genrator',
  templateUrl: './bill-pdf-genrator.component.html',
  styleUrls: ['./bill-pdf-genrator.component.css'],
})
export class BillPdfGenratorComponent implements OnInit {
  fullInvoiceData: any;
  
  genratePdf(str : any) {
    let mfgtext = {
      text: this.fullInvoiceData.ownerBill.Manufacturing,
      style: 'test',
    };
    let billType = { text: this.fullInvoiceData.ownerBill.billType };
    let billOwner = this.fullInvoiceData.ownerBill.CompanyName;
    let addressOwner = {
      text: this.fullInvoiceData.ownerBill.address,
    };
    let mNum = this.fullInvoiceData.ownerBill.mobileNumber.map((item : any) => {
      return  item + "\n";
    });
    let GST = this.fullInvoiceData.ownerBill.GSTNumber;
    let recipientName = this.fullInvoiceData.recipientName;
    let recipientInvoiceNum = this.fullInvoiceData.recipientInvoiceNum;
    let recipientGSTNumber = this.fullInvoiceData.recipientGSTNumber;
    let billAddress = this.fullInvoiceData.billAddress;
    let billDate = this.fullInvoiceData.billDate;
    let state = this.fullInvoiceData.state;
    let stateCode = this.fullInvoiceData.stateCode;
    let indexNo = 0;
    let termsindexNo = 0;
    let ruppesInWord = this.fullInvoiceData.rupeesInWord;
    let cGst = this.fullInvoiceData.cGstTax;
    let sGst = this.fullInvoiceData.sGstTax;
    let cGstAmount = this.fullInvoiceData.cGstAmount;
    let sGstAmount = this.fullInvoiceData.sGstAmount;
    let finalTotal = this.fullInvoiceData.totalWithoutTax;
    let bankDetail = this.fullInvoiceData.bankName;
    let accountNo = this.fullInvoiceData.accountNo;
    let IFSC = this.fullInvoiceData.IFSCcode;
    let grandTotal = this.fullInvoiceData.totalBillAmount;
    let termsCondition = this.fullInvoiceData.termsCondition;
    let productItems = this.fullInvoiceData.productItems;

    let pdfModel : TDocumentDefinitions = {
      pageMargins: [5, 5],
      pageSize: 'A4',
      content: [
        {
          table: {
            headerRows: 1,
            widths: [577],
            body: [
              [{ text: [{ text: billOwner }], style: 'header' }],
              [
                {
                  layout: 'noBorders',
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [
                        {
                          text: [{ text: 'MFG : ', bold: true }, mfgtext.text],
                          style: 'colLeft',
                        },
                        {
                          text: [
                            { text: 'Bill Type : ', bold: true },
                            billType.text,
                          ],
                          style: 'colRight',
                        },
                      ],
                      [
                        {
                          text: [
                            { text: 'Address : ', bold: true },
                            addressOwner.text,
                          ],
                          style: 'colLeft',
                        },
                        {
                          text: [
                            { text: 'MobileNumber : ', bold: true },
                            { text: mNum },
                          ],
                          rowSpan: 2,
                          style: 'colRight',
                        },
                      ],
                      [
                        {
                          text: [
                            { text: 'GST No : ', bold: true },
                            { text: recipientGSTNumber },
                          ],
                          style: 'colLeft',
                        },
                      ],
                    ],
                  },
                },
              ],
              [{ text: 'Tax invoice', style: 'subHeader' }],
              [
                {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [
                        {
                          text: [
                            { text: 'M / s : ', bold: true },
                            recipientName,
                          ],
                          style: 'colLeft',
                        },
                        {
                          text: [
                            { text: 'Invoice No . : ', bold: true },
                            recipientInvoiceNum,
                          ],
                          style: 'colRight',
                        },
                      ],
                      [
                        {
                          text: [
                            { text: 'Address : ', bold: true },
                            billAddress,
                          ],
                          style: 'colLeft',
                        },
                        {
                          text: [{ text: 'Date : ', bold: true }, billDate],
                          style: 'colRight',
                        },
                      ],
                      [
                        {
                          text: [
                            { text: 'GST No : ', bold: true },
                            { text: GST },
                          ],
                          style: 'colLeft',
                        },
                        {
                          text: [
                            { text: 'State : ', bold: true },
                            state,
                            { text: ' | State Code : ', bold: true },
                            stateCode,
                          ],
                        },
                      ],
                    ],
                  },
                },
              ],
              [
                {
                  table: {
                    widths: [20, 285, 40, 50, 50, 77],
                    body: [
                      [
                        {
                          text: 'No.',
                          style: 'itemHeader',
                        },
                        {
                          text: 'Description Item',
                          style: 'itemHeader',
                        },
                        {
                          text: 'HSN Code',
                          style: 'itemHeader',
                        },
                        {
                          text: 'QTY',
                          style: 'itemHeader',
                        },
                        {
                          text: 'Rate',
                          style: 'itemHeader',
                        },
                        {
                          text: 'Amount',
                          style: 'itemHeader',
                        },
                      ],
                    ],
                  },
                },
              ],
              [
                productItems.map((item : any) => {
                  indexNo++;
                  return [
                    {
                      layout: {
                        hLineColor: function (i: any, node: any) {
                          return i === 0 || i === node.table.body.length
                            ? 'white'
                            : 'red';
                        },
                      },
                      table: {
                        widths: [20, 285, 40, 50, 50, 77],
                        body: [
                          [
                            {
                              text: [indexNo],
                              style: 'itemHeader',
                            },
                            {
                              text: [item.productDetails],
                              style: 'itemDes',
                            },
                            {
                              text: [item.HSNCode],
                              style: 'itemHeader',
                            },
                            {
                              text: [item.QTY],
                              style: 'itemPr',
                            },
                            {
                              text: [item.price],
                              style: 'itemPr',
                            },
                            {
                              text: [item.amount],
                              style: 'itemPr',
                            },
                          ],
                        ],
                      },
                    },
                  ];
                }),
              ],
              [
                {
                  table: {
                    widths: [20, 285, 40, 50, 50, 77],
                    body: [
                      [
                        {
                          text: '',
                        },
                        {
                          text: '',
                        },
                        {
                          text: '',
                        },
                        {
                          text: [indexNo],
                          style: 'total',
                        },
                        {
                          text: '',
                        },
                        {
                          text: [finalTotal],
                          style: 'total',
                        },
                      ],
                    ],
                  },
                },
              ],
              [
                {
                  table: {
                    widths: [250, '*'],
                    body: [
                      [
                        {
                          text: [
                            { text: ' Total Amount in Word : \n', bold: true },
                            ruppesInWord,
                          ],
                          style: 'colLeft',
                        },
                        {
                          table: {
                            widths: [80, '*', '*'],
                            body: [
                              [
                                {
                                  text: [{ text: 'Sub Total', bold: true }],
                                },
                                {
                                  text: [''],
                                },
                                {
                                  text: [finalTotal],
                                  style: 'total',
                                },
                              ],
                              [
                                {
                                  text: [{ text: 'CGST', bold: true }],
                                },
                                {
                                  text: [{ text: cGst, bold: true }, '%'],
                                  style: 'total',
                                },
                                {
                                  text: [cGstAmount],
                                  style: 'total',
                                },
                              ],
                              [
                                {
                                  text: [{ text: 'SGST', bold: true }],
                                },
                                {
                                  text: [{ text: sGst, bold: true }, '%'],
                                  style: 'total',
                                },
                                {
                                  text: [sGstAmount],
                                  style: 'total',
                                },
                              ],
                              [
                                {
                                  text: [{ text: 'Grand Total', bold: true }],
                                },
                                {
                                  text: [],
                                  style: 'total',
                                },
                                {
                                  text: [grandTotal],
                                  style: 'total',
                                },
                              ],
                            ],
                          },
                        },
                      ],
                      [
                        {
                          layout: 'noBorders',
                          table: {
                            widths: ['*'],
                            body: [
                              [
                                {
                                  text: [
                                    {
                                      text: 'Bank Detail : \n',
                                      bold: true,
                                    },
                                  ],
                                  style: 'bankDetail',
                                },
                              ],
                              [
                                {
                                  text: [
                                    {
                                      text: 'Bank & Branch : ',
                                      bold: true,
                                    },
                                    bankDetail,
                                  ],
                                  style: 'bankDetailsItems',
                                },
                              ],
                              [
                                {
                                  text: [
                                    {
                                      text: 'Account No. : ',
                                      bold: true,
                                    },
                                    accountNo,
                                  ],
                                  style: 'bankDetailsItems',
                                },
                              ],
                              [
                                {
                                  text: [
                                    {
                                      text: 'IFSC Code. : ',
                                      bold: true,
                                    },
                                    IFSC,
                                  ],
                                  style: 'bankDetailsItems',
                                },
                              ],
                            ],
                          },
                        },
                        {
                          text: [
                            'For,   ' + billOwner,
                            { text: '\n(Authorised Signature)', fontSize: 10 },
                          ],
                          style: 'auth',
                        },
                      ],
                    ],
                  },
                },
              ],
              [
                {
                  text: 'Terms & Condition',
                  bold: true,
                },
              ],
              [
                termsCondition.map((item : any) => {
                  termsindexNo++;
                  return [
                    {
                      layout: 'noBorders',
                      table: {
                        widths: [15, '*'],
                        body: [
                          [
                            {
                              text: ['(' + termsindexNo + ')'],
                              style: 'termsCond',
                            },
                            {
                              text: [item],
                              style: 'termsCond',
                            },
                          ],
                        ],
                      },
                    },
                  ];
                }),
              ],
            ],
          },
        },
      ],
      styles: {
        termsCond: {
          fontSize: 10,
        },
        total: {
          alignment: 'right',
        },
        itemPr: {
          alignment: 'right',
        },
        itemHeader: {
          bold: true,
          alignment: 'center',
        },
        itemDes: {
          bold: true,
        },
        header: {
          alignment: 'center',
          fontSize: 20,
          bold: true,
          fillColor: '#AAAAAA',
        },
        subHeader: {
          alignment: 'center',
          bold: true,
        },
        colLeft: {
          alignment: 'left',
          fontSize: 11,
        },
        colRight: {
          alignment: 'left',
          fontSize: 11,
        },
        bankDetail: {
          alignment: 'center',
          fontSize: 12,
        },
        bankDetailsItems: {
          alignment: 'left',
          fontSize: 12,
        },
        auth: {
          alignment: 'right',
          fontSize: 16,
        },
      },
    };

    if (str == "open") {
      pdfMake.createPdf(pdfModel).open()
    }
    else if (str == "download"){
      pdfMake.createPdf(pdfModel).download()
    }
    else if (str == "print"){
      pdfMake.createPdf(pdfModel).print()
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.fullInvoiceData = history.state;
  }

  previewPdf() {
    // console.log(this.fullInvoiceData);
    this.genratePdf("open");
  }

  downloadPdf() {
    this.genratePdf("download");
  }

  printPdf() {
    this.genratePdf("print");
  }
}
