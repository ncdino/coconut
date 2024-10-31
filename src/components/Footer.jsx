const footerLinks = [
  {
    title: "GitHub",
    href: "https://github.com/ncdino",
  },
];

export default function Footer() {
  return (
    <footer className="font-pretendard">
      <div className="flex flex-col p-8 text-white bg-black gap-3 ">
        <span className="font-hapjung text-5xl tracking-tighter font-semibold">
          COCONUT.
        </span>
        <div className="flex flex-row">
          <p className="mr-2">이메일 | </p>
          <a href="mailto:jahhyn@gmail.com">jahhyn@gmail.com</a>
        </div>

        <nav className="flex flex-row gap-1">
          {footerLinks.map((link) => (
            <a key={link.title} href={link.href}>
              <span>{link.title}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
