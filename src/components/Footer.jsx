const footerLinks = [
  {
    title: "GitHub",
    href: "#",
  },
  {
    title: "LinkedIn",
    href: "#",
  },
  {
    title: "Instagram",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="font-leagueSpartan">
      <div className="p-8 text-white bg-black gap-2 ">
        <span className="text-3xl tracking-tighter">COCONUT BLOG</span>
        <nav className="flex flex-row items-center gap-1">
          {footerLinks.map((link) => (
            <a key={link.title} href={link.href}>
              <span>{link.title}</span>
              <span> | </span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
