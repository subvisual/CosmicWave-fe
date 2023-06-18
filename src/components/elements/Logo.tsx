import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="py-3">
      <Image
        src="/logo.png"
        width={130}
        height={40}
        alt="Picture of the author"
      />
    </Link>
  );
};

export default Logo;
