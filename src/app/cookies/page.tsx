import React from 'react';

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
                
                <div className="bg-white shadow rounded-lg p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">What are Cookies?</h2>
                        <p className="text-gray-600">
                            Cookies are small text files stored on your device to enhance your browsing experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Types of Cookies</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Essential Cookies</li>
                            <li>Analytics Cookies</li>
                            <li>Marketing Cookies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your Choices</h2>
                        <p className="text-gray-600">
                            You can control cookie settings through your browser preferences.
                        </p>
                    </section>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}