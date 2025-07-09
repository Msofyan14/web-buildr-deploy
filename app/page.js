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
              id: "ipmu",
            },
            components: [
              {
                type: "text-element",
                draggable: false,
                attributes: {
                  id: "i5b5",
                },
                customComponent: {
                  contents: [
                    {
                      id: "text-yaksfbr6h",
                      textShadow: null,
                      shadowColor: "",
                      text: '<p style="text-align: center"><span style="font-family: Anton SC; font-size: 40px; color: rgb(0, 0, 0)"><strong>The quick brown fox jumps over the lazy dog</strong></span></p><p style="text-align: center"><span style="font-family: Anton SC; color: rgb(0, 0, 0)">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam expedita molestiae accusamus, adipisci magnam. Cupiditate, autem dolore! Libero nisi harum assumenda molestiae officia blanditiis reprehenderit hic dolore iste inventore!</span></p><p style="text-align: center"></p><p style="text-align: center"></p><p style="text-align: center"></p><p style="text-align: center"><span style="font-family: Great Vibes; font-size: clamp(2.25rem, 5vw, 3rem); color: rgb(0, 0, 0)">a;wdhiaowdhioawhdioahdioahdoiahdiaw</span></p><p style="text-align: center"></p><p style="text-align: center"><span style="font-family: Fugaz One; font-size: clamp(2.25rem, 5vw, 3rem); color: rgb(0, 0, 0)">ladladmlamdlsmdlamdlaw</span></p>',
                      textColor: "",
                      rotation: 0,
                      alignText: "justify-center",
                    },
                  ],
                  typeSuggestion: "heading",
                  textPrompt: "",
                  smartTextSuggestions: [],
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
          id: "DZ0RY1iZrK6EBddh",
        },
      ],
      type: "main",
      id: "UklQ4BHNvzFIsOWA",
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
