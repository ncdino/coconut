import localFont from "next/font/local";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@/components/Header/MainHeader";
import { Providers } from "./providers";
import Footer from "@/components/Footer";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const league_spartan = League_Spartan({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "COCONUT.",
  description:
    "다양한 시각적, 청각적 즐거움을 제공하는 콘텐츠를 만나보세요. 최신 트렌드와 흥미로운 이야기를 통해 일상에 활력을 더해드립니다.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={clsx(
        "antialiased",
        pretendard.className,
        league_spartan.className
      )}
    >
      <body
        className={clsx(
          "antialiased",
          pretendard.className,
          league_spartan.className
        )}
      >
        <Providers>
          <div className="relative">
            <Header />
          </div>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
