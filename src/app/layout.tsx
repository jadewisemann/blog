import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

// PyeojinGothic - 본문용 한글 폰트
const pyeojinGothic = localFont({
  src: [
    {
      path: "../../public/fonts/PyeojinGothic/PyeojinGothic-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/PyeojinGothic/PyeojinGothic-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PyeojinGothic/PyeojinGothic-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/PyeojinGothic/PyeojinGothic-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/PyeojinGothic/PyeojinGothic-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/PyeojinGothic/PyeojinGothic-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-pyeojin",
  display: "swap",
});

// JetBrains Mono - 코드용 폰트
const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono/JetBrainsMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Minimalist Blog",
    template: "%s | Blog",
  },
  description: "개발, 기술, 그리고 생각들을 기록합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${pyeojinGothic.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
        style={{
          background: 'var(--background-primary)',
          color: 'var(--text-normal)',
          fontFamily: 'var(--font-jetbrains), var(--font-pyeojin), -apple-system, BlinkMacSystemFont, sans-serif'
        }}
      >
        <Header />
        <main
          className="max-w-3xl mx-auto px-10 py-10 flex-1 w-full"
          style={{ background: 'var(--background-primary)' }}
        >
          {children}
        </main>
        <footer
          className="py-8 text-center text-xs mt-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          <p>© {new Date().getFullYear()} Blog. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
