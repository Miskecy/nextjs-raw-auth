import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto({
	weight: [
		"100", "300", "400", "500", "700", "900"
	],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Next.js Raw Auth",
	description: "Custom Auth with Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${font.className} antialiased dark bg-[#0E0E0E]`}
			>
				{children}
			</body>
		</html>
	);
}
