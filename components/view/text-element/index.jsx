const ViewTextElement = ({ section }) => {
  const { contents } = section || {};
  return (
    <div className="">
      {contents.map((content) => {
        return (
          <div
            key={content?.id}
            dangerouslySetInnerHTML={{ __html: content.text }}
          />
        );
      })}
    </div>
  );
};

export default ViewTextElement;
