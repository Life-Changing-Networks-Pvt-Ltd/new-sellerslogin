import { CustomCursor } from "@/components/landing/CustomCursor";
import { FooterSection } from "@/components/landing/FooterSection";
import { Navbar } from "@/components/landing/Navbar";
import { NEXT_PUBLIC_SUPPORT_EMAIL } from "@/config/variables";
import Link from "next/link";

export default function DataDeletionPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white min-h-screen">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 hover:bg-purple-100 py-2 px-4 rounded-full">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">User Data Deletion Policy</h1>
        
        <div className="prose prose-purple max-w-none text-gray-600">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Requesting Data Deletion</h2>
          <p className="mb-4">
            If you wish to have your account and personal data deleted from Sellers Login, you can submit a data deletion request. We take your privacy seriously and will process your request in accordance with applicable data protection laws.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How to Submit a Request</h2>
          <p className="mb-4">
            To request the deletion of your data, please contact us at <strong>{NEXT_PUBLIC_SUPPORT_EMAIL || "the configured support email"}</strong> with the subject line "Data Deletion Request". Please include your registered email address or account details so we can verify your identity before proceeding.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. What Happens Next</h2>
          <p className="mb-4">
            Upon receiving your request and verifying your identity, we will initiate the data deletion process. We will securely delete or anonymize your personal data from our active databases and systems within a reasonable timeframe (typically within 30 days).
          </p>
          <p className="mb-4">
            Please note that some information may be retained in our backups or archives for a limited period, or as required by law for legal, tax, or regulatory compliance purposes. This retained data will not be used for any other purpose and will be securely disposed of once the retention period expires.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Impact of Data Deletion</h2>
          <p className="mb-4">
            Deleting your data is an irreversible process. Once completed, you will lose access to your account, your data, and any services provided by Sellers Login.
          </p>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
