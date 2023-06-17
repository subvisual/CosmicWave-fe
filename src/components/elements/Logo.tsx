import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.png"
      width={96}
      height={35.66}
      alt="Picture of the author"
    />
  );
};

export default Logo;
