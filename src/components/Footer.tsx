import Link from "next/link";
import { footerSections } from "@/data/constants";
import { Github, Linkedin } from "lucide-react";

const Footer = ({ target = "blank" }) => {
  return (
    <div className="mx-auto my-10 w-full px-4 sm:px-6">
      <div className="mx-4 flex justify-between">
        <div className="text-center text-2xl font-normal">
          Copyright <br />
          2024
        </div>
        {/* Sections with links */}
        {footerSections.map(({ title, links }, idx) => (
          <div key={idx}>
            <h5 className="font-semibold">{title}</h5>
            <ul className="mt-4 space-y-2 text-neutral-500 dark:text-neutral-400">
              {links.map(({ text, href }, idx) => (
                <li key={idx}>
                  <Link href={href} className="hover:text-primary-600 text-sm">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-3">
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
    </div>
  );
};

export default Footer;
