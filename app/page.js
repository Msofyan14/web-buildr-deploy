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
              id: "ic8g",
            },
            components: [
              {
                type: "business-overview",
                draggable: false,
                attributes: {
                  id: "i2cj",
                },
                customComponent: {
                  isLocked: false,
                  contents: [
                    {
                      id: "wjcyz3cl2",
                      overview: "Products",
                      from: 0,
                      rangeValue: 100,
                      symbol: "+",
                    },
                    {
                      id: "4a2uqaksd",
                      overview: "Monthly Orders",
                      from: 0,
                      rangeValue: 2500,
                      symbol: "+",
                    },
                    {
                      id: "h016brt95",
                      overview: "Happy Customer",
                      from: 0,
                      rangeValue: 100,
                      symbol: "%",
                    },
                    {
                      id: "ljgibb304",
                      overview: "Followers",
                      from: 0,
                      rangeValue: 100,
                      symbol: "+",
                    },
                    {
                      id: "pey4ywqh0",
                      overview: "Followers",
                      from: 0,
                      rangeValue: 100,
                      symbol: "+",
                    },
                  ],
                  wrapperStyle: {
                    separator: ",",
                    direction: "up",
                    duration: 1,
                    colorRangeValue: "rgba(0, 0, 0, 1)",
                    textAligment: "justify-center",
                    fontSize: 36,
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    textShadow: null,
                    distance: "far",
                    isItalicHeader: false,
                    fontSizeOverview: 16,
                    fontFamilyOverview: "Roboto",
                    fontWeightOverview: 500,
                    colorOverview: "rgba(0, 0, 0, 1)",
                    isItalicOverview: false,
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
          id: "d2l9w1RzEbh1u0dW",
        },
      ],
      type: "main",
      id: "qKmthR6cRUj9OIjD",
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
