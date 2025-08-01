import { useGoogleFont } from "@/hooks/useGoogleFont";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";

const Layout1 = ({ content, styles }) => {
  const {
    nameColor,
    fontWeight,
    fontFamily,
    fontSize,
    cardColor,
    borderColor,
    profectionColor,
    quoteColor,
    starsColor,
    starsSize,
    descriptionColor,
    descriptionFontWeight,
    descriptionFontFamily,
    descriptionFontSize,
    textAligment,
    isItalicHeader,
    isItalicDescription,
  } = styles;

  const selectedFontHeader = useGoogleFont(fontFamily);
  const selectedFontDesc = useGoogleFont(descriptionFontFamily);

  return (
    <div
      style={{
        backgroundColor: cardColor,
        border: `1px solid  ${borderColor}`,
      }}
      key={content.id}
      className={`  p-3 rounded-lg  shadow    `}
    >
      <div className="">
        <ImQuotesLeft color={quoteColor} size={36} />
      </div>
      <div className="flex flex-col items-center gap-y-5">
        <div className="relative w-20 h-20 rounded-full  overflow-hidden shadow-md">
          <Image
            src={content?.image}
            alt={"avatar"}
            fill
            placeholder="blur"
            blurDataURL={content?.image}
            sizes="80px"
            className={`object-cover  `}
          />
        </div>
        <div className="flex  gap-x-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              color={index < content.stars ? starsColor : "#ccc"}
              size={starsSize}
            />
          ))}
        </div>

        <div className={`h-[120px] overflow-y-auto ${textAligment}  `}>
          <p
            style={{
              color: descriptionColor,

              fontSize: descriptionFontSize,
              fontWeight: descriptionFontWeight,
            }}
            className={`w-full break-all ${isItalicDescription && "italic"} ${
              selectedFontDesc?.className
            }`}
          >
            {content.description}
          </p>
        </div>

        <div className="text-center">
          <p
            style={{
              color: nameColor,

              fontSize,
              fontWeight,
            }}
            className={`w-full break-all ${isItalicHeader && "italic"} ${
              selectedFontHeader?.className
            } `}
          >
            {content.name}
          </p>
          <p
            style={{
              color: profectionColor,
            }}
            className="text-muted-foreground text-sm"
          >
            {content.profetion}
          </p>
        </div>
      </div>
      <div className=" flex justify-end  ">
        <ImQuotesLeft color={quoteColor} className="rotate-180" size={36} />
      </div>
    </div>
  );
};

export default Layout1;
