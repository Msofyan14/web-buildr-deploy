import RenderViewComponent from "@/components/RenderViewComponent";

const publishData = {
  assets: [],
  styles: [
    {
      selectors: ["#iwxk1"],
      style: {
        width: "100%",
      },
    },
    {
      selectors: ["#i2p52"],
      style: {
        position: "relative",
        padding: "20px",
        gap: "20px",
        height: "100%",
        margin: "0px auto",
        "max-width": "100%",
        width: "1360px",
        "border-left": "1.8px dashed #0ea5e9",
        "border-right": "1.8px dashed #0ea5e9",
      },
    },
    {
      selectors: ["#iyfsg"],
      style: {
        "align-items": "center",
        "justify-content": "center",
        width: "33%",
        position: "relative",
        "max-width": "100%",
        "z-index": 2,
      },
    },
    {
      selectors: ["#iiifi"],
      style: {
        "align-items": "center",
        "justify-content": "center",
        width: "67%",
        position: "relative",
        "max-width": "100%",
        "z-index": 2,
      },
    },
    {
      selectors: ["#ioic"],
      style: {
        "background-color": "#F8F4E1",
      },
    },
  ],
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
              id: "ioic",
            },
            components: [
              {
                type: "text-element",
                draggable: false,
                attributes: {
                  id: "i5sh",
                },
                customComponent: {
                  contents: [
                    {
                      id: "text-r9096qkt2",
                      textShadow: null,
                      shadowColor: "",
                      text: '<p><span style="font-family: Anton; font-size: 40px; color: rgba(0,0,0,1)">The quick brown fox jumps over the lazy dog</span></p><p><span style="font-family: Fenix; color: rgba(0,0,0,1)">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam expedita molestiae accusamus, adipisci magnam. Cupiditate, autem dolore! Libero nisi harum assumenda molestiae officia blanditiis reprehenderit hic dolore iste inventore!</span></p>',
                      textColor: "",
                      rotation: 0,
                      alignText: "justify-center",
                    },
                  ],
                  typeSuggestion: "heading",
                  textPrompt: "",
                  smartTextSuggestions: [],
                  animation: {
                    effect: "zoomIn",
                  },
                },
                isFromAI: false,
              },
              {
                type: "video-element",
                draggable: false,
                attributes: {
                  id: "iq3j",
                },
                customComponent: {
                  contents: [
                    {
                      id: "4f86hqhai",
                      url: "https://www.youtube.com/watch?v=wDchsz8nmbo",
                      width: 500,
                      ratio: 1.7777777777777777,
                      isAutoPlay: false,
                      isLoop: true,
                      isMuted: false,
                      isControls: false,
                      rotation: 0,
                    },
                  ],
                  animation: {
                    effect: "shake",
                  },
                },
                isFromAI: false,
              },
              {
                type: "container-wrapper",
                draggable: false,
                style: "",
                attributes: {
                  id: "iwxk1",
                },
                components: [
                  {
                    type: "container",
                    attributes: {
                      class: "flex flex-col md:flex-row",
                      id: "i2p52",
                    },
                    style: {
                      position: "relative",
                      padding: "20px",
                      gap: "20px",
                      height: "100%",
                      margin: "0px auto",
                      "max-width": "100%",
                      width: "1360px",
                      "border-left": "1.8px dashed #0ea5e9",
                      "border-right": "1.8px dashed #0ea5e9",
                    },
                    classes: ["flex", "flex-col", "md:flex-row"],
                    isFromAI: false,
                    customComponent: {
                      background: {
                        bgType: null,
                        bgColor: "",
                        image: "",
                        gradient: "",
                        pattern: "",
                        opacity: 0.3,
                        rounded: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        isFullWidth: true,
                      },
                      label: "2 Cols 33/67",
                    },
                    components: [
                      {
                        type: "column",
                        attributes: {
                          id: "iyfsg",
                        },
                        style: {
                          "align-items": "center",
                          "justify-content": "center",
                          width: "33%",
                          position: "relative",
                          "max-width": "100%",
                          "z-index": 2,
                        },
                        isFromAI: false,
                        components: [
                          {
                            type: "text-element",
                            draggable: false,
                            attributes: {
                              id: "iprej",
                            },
                            customComponent: {
                              contents: [
                                {
                                  id: "text-r9096qkt2",
                                  textShadow: null,
                                  shadowColor: "",
                                  text: '<p><span style="font-family: Anton; font-size: 40px; color: rgba(0,0,0,1)">The quick brown fox jumps over the lazy dog</span></p><p><span style="font-family: Fenix; color: rgba(0,0,0,1)">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam expedita molestiae accusamus, adipisci magnam. Cupiditate, autem dolore! Libero nisi harum assumenda molestiae officia blanditiis reprehenderit hic dolore iste inventore!</span></p>',
                                  textColor: "",
                                  rotation: 0,
                                  alignText: "justify-center",
                                },
                              ],
                              typeSuggestion: "heading",
                              textPrompt: "",
                              smartTextSuggestions: [],
                              animation: {
                                effect: "bounce",
                                direction: "fromBottom",
                              },
                            },
                          },
                        ],
                      },
                      {
                        type: "column",
                        attributes: {
                          id: "iiifi",
                        },
                        style: {
                          "align-items": "center",
                          "justify-content": "center",
                          width: "67%",
                          position: "relative",
                          "max-width": "100%",
                          "z-index": 2,
                        },
                        isFromAI: false,
                        components: [
                          {
                            type: "image-element",
                            draggable: false,
                            attributes: {
                              id: "iv7xp",
                            },
                            customComponent: {
                              contents: [
                                {
                                  id: "e6cwzhyzs",
                                  image:
                                    "https://ik.imagekit.io/ez1ffaf6o/default-images/img-placeholder.png?updatedAt=1750837392020",
                                  alt: "",
                                  isDownloadImage: false,
                                  target: {
                                    actionType: "link",
                                    options: {
                                      type: null,
                                    },
                                  },
                                },
                              ],
                              wrapperStyle: {
                                width: 300,
                                rotation: 0,
                                shadow: "shadow-none",
                                aspectRatio: 2,
                                rounded: 20,
                                objectView: "object-contain",
                              },
                              animation: {
                                effect: "fade",
                              },
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
                customComponent: {},
                isFromAI: false,
              },
              {
                type: "image-element",
                draggable: false,
                attributes: {
                  id: "ik0tz",
                },
                customComponent: {
                  contents: [
                    {
                      id: "e6cwzhyzs",
                      image:
                        "https://ik.imagekit.io/ez1ffaf6o/default-images/img-placeholder.png?updatedAt=1750837392020",
                      alt: "",
                      isDownloadImage: false,
                      target: {
                        actionType: "link",
                        options: {
                          type: null,
                        },
                      },
                    },
                  ],
                  wrapperStyle: {
                    width: 300,
                    rotation: 0,
                    shadow: "shadow-none",
                    aspectRatio: 2,
                    rounded: 20,
                    objectView: "object-contain",
                  },
                  animation: {
                    effect: "slide",
                    direction: "fromLeft",
                    intensity: 93,
                  },
                },
                isFromAI: false,
              },
              {
                type: "content-showcase",
                draggable: false,
                attributes: {
                  id: "i5zoe",
                },
                customComponent: {
                  isLocked: false,
                  contents: [
                    {
                      id: "ptwjkr7al",
                      title: "Panduan Lengkap Memulai Bisnis Online",
                      description:
                        "Temukan langkah-langkah praktis memulai bisnis online dari nol. Pelajari strategi pemasaran, manajemen produk, dan tips meningkatkan penjualan secara efekti",
                      image:
                        "https://ik.imagekit.io/ez1ffaf6o/default-images/products1.webp?updatedAt=1747115975853",
                      target: {
                        actionType: "link",
                        options: {
                          isOpenNewTab: true,
                          link: "https://www.youtube.com/",
                          type: "url",
                        },
                      },
                    },
                    {
                      id: "x6a6ksj40",
                      title: "Tips Meningkatkan Kualitas Produk Anda",
                      description:
                        "Pelajari cara meningkatkan kualitas produk Anda dengan bahan terbaik dan proses produksi yang efisien. Dapatkan kepercayaan pelanggan dan tingkatkan loyalitas merek.",
                      image:
                        "https://ik.imagekit.io/ez1ffaf6o/default-images/products2.webp?updatedAt=1747115975781",
                      target: {
                        actionType: "link",
                        options: {
                          type: null,
                        },
                      },
                    },
                    {
                      id: "wzp58h5l5",
                      title: "Langkah Menciptakan Produk Inovatif",
                      description:
                        "Ketahui langkah-langkah menciptakan produk inovatif yang memenuhi kebutuhan pasar. Mulai dari riset hingga peluncuran, raih peluang bisnis yang lebih besar.",
                      image:
                        "https://ik.imagekit.io/ez1ffaf6o/default-images/products4.jpg?updatedAt=1747115975342",
                      target: {
                        actionType: "link",
                        options: {
                          type: null,
                        },
                      },
                    },
                  ],
                  wrapperStyle: {
                    column: "3",
                    aspectRatio: 0.8,
                    rounded: 20,
                    titleColor: "#533B4D",
                    fontWeight: 900,
                    imagePosition: "center",
                    fontFamily: "Roboto",
                    fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                    textAligment: "text-center",
                    isItalicHeader: false,
                    descriptionColor: "#675C4E",
                    descriptionFontWeight: "",
                    descriptionFontFamily: "",
                    descriptionFontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                    textAligmentDescription: "text-center",
                    isItalicDescription: false,
                  },
                  background: {
                    bgType: "bgColor",
                    bgColor: "#F8F4E1",
                    bgImage: "",
                    blur: 0,
                    opacity: 0,
                    padding: 20,
                    marginTop: 50,
                    marginBottom: 50,
                    direction: "to right",
                    fromColor: "",
                    toColor: "",
                    isRevert: false,
                    pattern: "",
                    isFullWidth: true,
                  },
                  isAddHeader: true,
                  header:
                    '<p style="text-align: center"><span style="font-family: Anton; font-size: 40px; color: rgb(0, 0, 0)">The quick brown fox jumps over the lazy dog</span></p><p style="text-align: center"><span style="font-family: Fenix; color: rgb(0, 0, 0)">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam expedita molestiae accusamus, adipisci magnam</span></p>',
                  headerColor: "#533B4D",
                  animationHeader: {
                    effect: "tada",
                  },
                },
                isFromAI: false,
              },
              {
                type: "countdown",
                draggable: false,
                attributes: {
                  id: "i2mg5",
                },
                customComponent: {
                  contents: [
                    {
                      id: "countdown-01",
                      type: "date-time",
                      datePicked: {
                        date: 4,
                        month: 8,
                        years: 2025,
                        hours: 8,
                        minutes: 0,
                        dateView: "2025-08-04T07:31:25.221Z",
                      },
                      duration: {
                        hours: 2,
                        minutes: 30,
                      },
                    },
                  ],
                  finish: {
                    isFinished: false,
                    previewMode: "countdown",
                    text: '<p style="text-align:center;"><span style="font-size:26px;"><strong>Sudah Selesai</strong></span></p>',
                    textColor: "#000000",
                  },
                  background: {
                    bgType: "bgColor",
                    bgColor: "#F564A9",
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
                  wrapperStyle: {
                    variant: "circle",
                    daysColor: "rgba(126, 46, 132,1)",
                    hoursColor: "rgba(209, 64, 129,1)",
                    minutesColor: "rgba(239, 121, 138,1)",
                    secondsColor: "rgba(33, 131, 128,1)",
                    size: 20,
                  },
                  animation: {},
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
          id: "gUSgmGacUzBJIyLX",
        },
      ],
      type: "main",
      id: "0wMYHzfgEYsBhicw",
    },
  ],
  symbols: [],
  dataSources: [],
  globalOptions: {
    maxWidthPage: 1360,
    schemeColor: "base-pink",
    bgColor: "#F8F4E1",
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
