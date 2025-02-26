import Image from "next/image";
import Link from "next/link";

import SignInImg from "@/assets/sign-in.png";
import SignuPImg from "@/assets/sign-up.png";
import SignInJWTImg from "@/assets/sign-in-jwt.png";
import AuthorizeImg from "@/assets/authorize.png";
import AuthorizeJWTImg from "@/assets/authorize-jwt.png";
import WhereToStoreSessionImg from "@/assets/where-to-store-session.png";
import OAuthImg from "@/assets/oauth.png";

export default async function Home() {
	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<header className="max-w-4xl mx-auto mb-12 text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-6">
					Authentication Flow Guide
				</h1>

				<nav className="flex justify-center gap-6 mb-8">
					<Link
						href="/admin"
						className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
					>
						Admin Page
					</Link>
					<Link
						href="/private"
						className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
					>
						Private Page
					</Link>
					<Link
						href="/auth/sign-in"
						className="bg-fuchsia-500 text-white px-6 py-2 rounded-lg hover:bg-fuchsia-600 transition-colors"
					>
						Sign In Page
					</Link>
				</nav>
			</header>

			<main className="max-w-7xl mx-auto">
				<section className="mb-12">
					<h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-emerald-500 pb-2">
						Authentication Diagrams
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<figure className="bg-white p-4 rounded-xl shadow-md">
							<Image
								src={SignInImg}
								alt="Sign In Flow"
								className="rounded-lg"
								placeholder="blur"
							/>
							<figcaption className="mt-2 text-sm text-gray-600 text-center">
								Standard Sign-In Flow
							</figcaption>
						</figure>

						<figure className="bg-white p-4 rounded-xl shadow-md">
							<Image
								src={SignuPImg}
								alt="Sign Up Flow"
								className="rounded-lg"
								placeholder="blur"
							/>
							<figcaption className="mt-2 text-sm text-gray-600 text-center">
								User Registration Flow
							</figcaption>
						</figure>

						<figure className="bg-white p-4 rounded-xl shadow-md">
							<Image
								src={SignInJWTImg}
								alt="JWT Sign-In"
								className="rounded-lg"
								placeholder="blur"
							/>
							<figcaption className="mt-2 text-sm text-gray-600 text-center">
								JWT Authentication Flow
							</figcaption>
						</figure>

						<figure className="bg-white p-4 rounded-xl shadow-md">
							<Image
								src={AuthorizeImg}
								alt="Authorization Flow"
								className="rounded-lg"
								placeholder="blur"
							/>
							<figcaption className="mt-2 text-sm text-gray-600 text-center">
								Role-based Authorization
							</figcaption>
						</figure>

						<figure className="bg-white p-4 rounded-xl shadow-md">
							<Image
								src={AuthorizeJWTImg}
								alt="JWT Authorization"
								className="rounded-lg"
								placeholder="blur"
							/>
							<figcaption className="mt-2 text-sm text-gray-600 text-center">
								JWT Authorization Process
							</figcaption>
						</figure>

						<figure className="bg-white p-4 rounded-xl shadow-md">
							<Image
								src={WhereToStoreSessionImg}
								alt="Session Storage"
								className="rounded-lg"
								placeholder="blur"
							/>
							<figcaption className="mt-2 text-sm text-gray-600 text-center">
								Session Storage Options
							</figcaption>
						</figure>

						<figure className="bg-white p-4 rounded-xl shadow-md">
							<Image
								src={OAuthImg}
								alt="OAuth Flow"
								className="rounded-lg"
								placeholder="blur"
							/>
							<figcaption className="mt-2 text-sm text-gray-600 text-center">
								OAuth 2.0 Flow Diagram
							</figcaption>
						</figure>
					</div>
				</section>
			</main>
		</div>
	);
}