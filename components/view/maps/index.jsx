const ViewMaps = ({ section }) => {
  const { iframe, height } = section || {};

  const cleanEmbedCode = iframe
    .replace(/width="[^"]+"/, 'width="100%"')
    .replace(/height="[^"]+"/, `height="${height || 400}"`);

  return (
    <div>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: cleanEmbedCode }}
      />
    </div>
  );
};

export default ViewMaps;
