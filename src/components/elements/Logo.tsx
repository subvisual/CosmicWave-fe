import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        width={96}
        height={35.66}
        alt="Picture of the author"
      />
    </Link>
  );
};

export default Logo;
