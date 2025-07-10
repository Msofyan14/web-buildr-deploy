import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";

const Layout3 = ({ content, styles }) => {
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

  return (
    <div
      style={{
        backgroundColor: cardColor,
        border: `1px solid  ${borderColor}`,
      }}
      key={content.id}
      className={`p-3 rounded-lg shadow relative `}
    >
      <div className="">
        <ImQuotesLeft color={quoteColor} size={36} />
      </div>
      <div className="flex flex-col  gap-y-5">
        <div className={`h-[120px] overflow-y-auto mt-2 ${textAligment}  `}>
          <p
            style={{
              color: descriptionColor,
              fontFamily: descriptionFontFamily,
              fontSize: descriptionFontSize,
              fontWeight: descriptionFontWeight,
            }}
            className={`w-full break-all ${isItalicDescription && "italic"} `}
          >
            {content.description}
          </p>
        </div>

        <div className="flex  gap-x-3 items-center mb-5">
          <div className="relative w-16 h-16 rounded-full  overflow-hidden shadow-md flex-shrink-0   ">
            <Image
              src={content?.image}
              alt={"avatar"}
              fill
              placeholder="blur"
              blurDataURL={content?.image}
              sizes="64px"
              className={`object-cover`}
            />
          </div>

          <div>
            <p
              style={{
                color: nameColor,
                fontFamily,
                fontSize,
                fontWeight,
              }}
              className={`w-full break-all ${isItalicHeader && "italic"} `}
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

          <div className="flex flex-wrap  gap-x-1 ml-auto">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                color={index < content.stars ? starsColor : "#ccc"}
                size={starsSize}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-3 bottom-0    ">
        <ImQuotesLeft color={quoteColor} className="rotate-180" size={36} />
      </div>
    </div>
  );
};

export default Layout3;
