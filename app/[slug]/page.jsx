import React from "react";

const Slug = async ({ params }) => {
  const { slug } = await params;
  return <div className="">{slug}</div>;
};

export default Slug;
