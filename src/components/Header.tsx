import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="header sticky top-0 z-50 w-full">
            <div className="max-w-3xl mx-auto px-6 h-10 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-sm font-medium hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--text-accent)' }}
                >
                    Blog
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}
