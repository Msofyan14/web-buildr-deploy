import RenderViewComponent from "@/components/RenderViewComponent";

const publishData = {
  assets: [],
  styles: [],
  pages: [
    {
      frames: [
        {
          component: {
            type: "wrapper",
            stylable: "",
            highlightable: false,
            hoverable: false,
            attributes: {
              id: "ilml",
            },
            components: [
              {
                type: "checkout-form",
                draggable: false,
                attributes: {
                  id: "i01o",
                },
                customComponent: {
                  contents: [],
                  paymentMethod: {
                    label: "Metode Pengiriman",
                    isCod: true,
                    isBankTransfer: true,
                    isEpayment: true,
                    isRequired: true,
                    methodOptions: [],
                  },
                  recipient: {
                    paymentMethod: {
                      type: "",
                      data: null,
                    },
                  },
                  store: {
                    value: "storeB",
                    label: "Store A",
                  },
                  products: {
                    id: "2",
                    name: "Pants",
                    price: "320000",
                  },
                  submitEvent: {
                    event: "instruction_page",
                    contentTemplateCOD:
                      '<p style="text-align: center"><span style="font-family: Montserrat; font-size: clamp(1.125rem, 2vw, 1.25rem)"><strong>Terima kasih telah memesan </strong></span><span style="font-size: clamp(1.125rem, 2vw, 1.25rem)"><strong>{{product_name}} </strong></span><br><br>Pesanan Anda sedang kami proses. <br>📦 Kurir akan mengantarkan pesanan dalam <strong>2–4 hari ke depan</strong>. <strong><br></strong><br>Mohon siapkan pembayaran sebesar:<br><br><span style="font-family: Montserrat; font-size: clamp(1.125rem, 2vw, 1.25rem); color: rgba(74,144,226,1)"><strong>{{total_price}}</strong></span><br><br>Pembayaran dilakukan <strong>langsung kepada kurir saat pesanan diterima</strong> <br><br>Terima kasih telah berbelanja bersama kami.  </p><p>Semoga Anda menikmati produk kami!</p>',
                    contentTemplateBankTransfer:
                      '<p style="text-align: center"><span style="font-family: Open Sans; font-size: clamp(1.125rem, 2vw, 1.25rem)"><strong>Terima kasih sudah melakukan order {{product_name}}</strong></span><br><br>Untuk menyelesaikan pembayaran, silakan transfer sejumlah: <br><br><span style="font-family: Open Sans; color: rgba(74,144,226,1)"><strong>{{total_price}} </strong></span><br><br>Ke rekening berikut : {{payment_options}} <br><br><span style="font-size: clamp(0.75rem, 1vw, 0.875rem)">Setelah melakukan transfer, jangan lupa untuk melakukan konfirmasi agar pesanan Anda segera kami proses: </span><br><br>{{bank_transfer_confirmation}}</p>',
                    contentTemplateEpayment:
                      '<p style="text-align: center"><span style="font-family: &quot;Open Sans&quot;; font-size: clamp(1.125rem, 2vw, 1.25rem)"><strong>Terima kasih sudah melakukan order {{product_name}}</strong></span><br><br>Untuk menyelesaikan pembayaran, silakan transfer sejumlah: <br><br><span style="font-family: &quot;Open Sans&quot;; color: rgb(74, 144, 226)"><strong>{{total_price}} </strong></span><br><br> {{payment_options}} <br><br><span style="font-size: clamp(0.75rem, 1vw, 0.875rem)">Setelah melakukan transfer, jangan lupa untuk melakukan konfirmasi agar pesanan Anda segera kami proses: </span></p>',
                    sendingEmailInvoice: true,
                    chatTemplateId: "bankTransfer",
                    waChatTemplate:
                      "Halo, saya sudah menyelesaikan pemesanan untuk { items_name } atas nama { name } dan akan melakukan pembayaran melalui transfer bank. Mohon bantuannya untuk segera diproses. Terima kasih! 🙏",
                    pixels: {
                      facebookPixel: {
                        ids: [],
                        events: [
                          {
                            name: "InitialCheckout",
                          },
                        ],
                      },
                      tiktokPixel: {
                        ids: [],
                        events: [
                          {
                            name: "InitialCheckout",
                          },
                        ],
                      },
                    },
                  },
                  wrapperStyle: {
                    width: 479,
                    titleSize: 24,
                    titleColor: "rgba(0, 0, 0, 1)",
                    labelSize: 14,
                    labelColor: "rgba(0, 0, 0, 1)",
                    inputColor: "rgba(255, 255, 255, 1)",
                    inputSize: 14,
                    textInputColor: "rgba(0, 0, 0, 1)",
                    borderColor: "rgba(115, 115, 115, 0.5)",
                    rounded: 8,
                    space: 20,
                    buttonText: "Beli Sekarang",
                    buttonColor: "rgba(250, 84, 28,1)",
                    iconBtn: {
                      icon: "",
                      color: "",
                      size: 24,
                      position: "right",
                    },
                  },
                  background: {
                    bgType: null,
                    bgColor: "",
                    bgImage: "",
                    blur: 0,
                    opacity: 0,
                    padding: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    direction: "to right",
                    fromColor: "",
                    toColor: "",
                    isRevert: false,
                    pattern: "",
                    isFullWidth: true,
                  },
                },
                isFromAI: false,
              },
            ],
            head: {
              type: "head",
            },
            docEl: {
              tagName: "html",
            },
          },
          id: "5u6KIBP37whjI2rj",
        },
      ],
      type: "main",
      id: "QEPuYRfldlb8nced",
    },
  ],
  symbols: [],
  dataSources: [],
  globalOptions: {
    maxWidthPage: 1360,
    schemeColor: null,
    bgColor: "",
    scrollTarget: [
      {
        id: "target-01",
        value: "scrollToTop",
        label: "Scroll To Top",
      },
    ],
    isFocusContent: "",
    isOutlineActive: true,
    watermark: true,
    isSubscribed: true,
  },
  popups: [],
};
export default function Home() {
  return <RenderViewComponent publishData={publishData} />;
}
