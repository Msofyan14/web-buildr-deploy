import Image from "next/image";

const Watermark = () => {
  return (
    <div
      id="plasgos-watermark"
      className="relative  flex justify-center items-center  bg-black p-3"
    >
      <p className="text-white">Powered By</p>

      <div className="relative w-20 h-10">
        <Image
          src="https://ik.imagekit.io/ez1ffaf6o/default-images/plg-logo.png?updatedAt=1747224274623"
          alt="plasgos-logo"
          fill
          className="object-contain"
          sizes="80px"
          priority
        />
      </div>
    </div>
  );
};

export default Watermark;
