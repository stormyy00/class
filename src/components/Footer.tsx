import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const Footer = ({ target = "blank" }) => {
  return (
    <div className="m-5 flex items-center justify-between">
      <div className="text-center text-2xl font-normal">
        Copyright <br />
        2024
      </div>
      <div className="flex gap-3">
        <Link href={"https://github.com/stormyy00"} target={target}>
          <Github className="text-3xl" />
        </Link>
        <Link
          href={"https://www.linkedin.com/in/jonathan--trujillo/"}
          target={target}
        >
          <Linkedin className='"text-3xl' />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
