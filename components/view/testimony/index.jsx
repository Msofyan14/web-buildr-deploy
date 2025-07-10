import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import ContainerSlider from "./ContainerSlider";
import Layout1 from "./layout/Layout1";
import Layout2 from "./layout/Layout2";
import Layout3 from "./layout/Layout3";
import Layout4 from "./layout/Layout4";

const ViewTestimony = ({ section }) => {
  const { contents } = section;
  const { variant, header, withSlider, autoPlaySlider } = section.wrapperStyle;

  const sanitizedContent = useSanitizedFonts(header);

  return (
    <div>
      <div className="relative p-5">
        <div
          style={{
            marginBottom: variant === "2" ? 40 : 20,
          }}
        >
          <div>{sanitizedContent}</div>
        </div>

        {variant === "1" && (
          <div>
            {withSlider ? (
              <ContainerSlider
                section={section}
                autoPlaySlider={autoPlaySlider}
                LayoutComponent={Layout1}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5  auto-rows-min ">
                {contents.map((content) => (
                  <Layout1
                    key={content.id}
                    content={content}
                    styles={section.wrapperStyle}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {variant === "2" && (
          <div>
            {withSlider ? (
              <ContainerSlider
                section={section}
                autoPlaySlider={autoPlaySlider}
                LayoutComponent={Layout2}
                isOverImage
              />
            ) : (
              <div
                style={{ rowGap: 40 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5   auto-rows-min "
              >
                {contents.map((content) => (
                  <Layout2
                    key={content.id}
                    content={content}
                    styles={section.wrapperStyle}
                    isOverImage
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {variant === "3" && (
          <div>
            {withSlider ? (
              <ContainerSlider
                section={section}
                autoPlaySlider={autoPlaySlider}
                LayoutComponent={Layout3}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5  auto-rows-min ">
                {contents.map((content) => (
                  <Layout3
                    key={content.id}
                    content={content}
                    styles={section.wrapperStyle}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {variant === "4" && (
          <div>
            {withSlider ? (
              <ContainerSlider
                section={section}
                autoPlaySlider={autoPlaySlider}
                LayoutComponent={Layout4}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5  auto-rows-min ">
                {contents.map((content) => (
                  <Layout4
                    key={content.id}
                    content={content}
                    styles={section.wrapperStyle}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTestimony;
