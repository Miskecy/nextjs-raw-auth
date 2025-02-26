import LogOutButton from '@/auth/nextjs/components/logout-button';
import { getCurrentUser } from '@/auth/nextjs/current-user';
import Link from 'next/link';
import React from 'react'

export default async function AdminPage() {
	const fullUser = await getCurrentUser({ withFullUser: true });

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<header className="max-w-4xl mx-auto mb-8">
				<nav className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
					<Link
						href="/"
						className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors text-center"
					>
						Home Page
					</Link>
					<Link
						href="/private"
						className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-center"
					>
						Private Page
					</Link>
				</nav>

				<div className="flex justify-center mb-8">
					<LogOutButton className="bg-red-500 hover:bg-red-600" />
				</div>
			</header>

			<main className="max-w-4xl mx-auto">
				<section className="bg-white rounded-xl shadow-md p-8 mb-6">
					<h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">
						Admin Dashboard
					</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
						<div className="flex flex-col space-y-1">
							<span className="text-sm text-gray-500">Account Role</span>
							<p className="font-medium text-orange-600">
								{fullUser?.role}
							</p>
						</div>

						<div className="flex flex-col space-y-1">
							<span className="text-sm text-gray-500">Administrator Name</span>
							<p className="font-medium text-gray-800">
								{fullUser?.name || 'Not provided'}
							</p>
						</div>

						<div className="flex flex-col space-y-1">
							<span className="text-sm text-gray-500">User ID</span>
							<p className="font-mono text-gray-600 break-all">
								{fullUser?.id}
							</p>
						</div>

						<div className="flex flex-col space-y-1">
							<span className="text-sm text-gray-500">Privilege Level</span>
							<p className="font-medium text-orange-600">
								Elevated Access
							</p>
						</div>
					</div>
				</section>

				<footer className="text-center text-gray-500 text-sm mt-8">
					<p>Administrative Console - {new Date().getFullYear()}</p>
				</footer>
			</main>
		</div>
	);
}