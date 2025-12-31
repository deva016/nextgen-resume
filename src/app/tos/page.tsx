import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/15 blur-[120px]" />
      </div>

      {/* Navigation */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <FileText className="h-4 w-4" />
            Legal
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-400">
            Effective Date: October 31, 2024
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="text-gray-300 leading-relaxed">
            Welcome to NextGen Resume Builder. These Terms of Service (&quot;Terms&quot;)
            govern your use of our website and services, including any paid
            subscription plans. By accessing or using NextGen Resume Builder (&quot;the
            Service&quot;), you agree to be bound by these Terms. If you do not
            agree to these Terms, do not use the Service.
          </p>

          <Section title="1. Overview">
            NextGen Resume Builder is a SaaS platform that provides resume-building tools
            powered by artificial intelligence. We offer a free tier with access to
            core resume-building features.
          </Section>

          <Section title="2. Eligibility">
            You must be at least 18 years old and capable of entering into legally
            binding contracts to use this Service. By accessing the Service, you
            confirm that you meet this eligibility requirement.
          </Section>

          <Section title="3. Account Registration">
            To access some features of the Service, including Paid Plans, you must
            create an account. When registering, you agree to provide accurate and
            current information. You are responsible for maintaining the security of
            your account and password. We are not liable for any loss or damage
            resulting from unauthorized access to your account.
          </Section>

          <Section title="4. Free Tier">
            We offer a free tier of the Service that includes limited access to
            certain features. While on the free tier, you can create resumes with
            basic functionality. Some advanced features and templates may only be
            available to Paid Plan subscribers.
          </Section>

          <Section title="5. Paid Subscription Plans">
            <ul className="mt-2 list-inside list-disc space-y-2 text-gray-400">
              <li>
                <strong className="text-gray-300">Subscription Fees:</strong> Fees for Paid Plans are billed on
                a recurring basis (monthly or annually) depending on the subscription
                plan you select.
              </li>
              <li>
                <strong className="text-gray-300">Payment Method:</strong> You must provide a valid payment
                method (credit card, debit card, etc.) to subscribe to a Paid Plan.
                Your subscription will automatically renew unless you cancel before
                the renewal date.
              </li>
              <li>
                <strong className="text-gray-300">Refund Policy:</strong> We do not offer
                refunds for any payments already processed. However, you can cancel
                your subscription at any time.
              </li>
            </ul>
          </Section>

          <Section title="6. Cancellation of Subscription">
            You can cancel your subscription at any time by logging into your
            account and following the cancellation process. Cancellation will take
            effect at the end of the current billing cycle.
          </Section>

          <Section title="7. Changes to Services and Pricing">
            We reserve the right to modify or discontinue the Service (or any part
            of it) at any time, with or without notice. We may also adjust pricing
            for Paid Plans; however, any price changes will not affect your current
            subscription period.
          </Section>

          <Section title="8. License to Use the Service">
            We grant you a limited, non-exclusive, non-transferable,
            and revocable license to use the Service for personal or professional
            use in accordance with these Terms.
          </Section>

          <Section title="9. Intellectual Property">
            All content, trademarks, logos, and intellectual property related to
            NextGen Resume Builder are owned by us or our licensors. You
            agree not to infringe on these rights.
          </Section>

          <Section title="10. User Content">
            By using the Service, you grant us a non-exclusive,
            worldwide, royalty-free license to use, modify, and display any content
            you create using the platform solely for the purpose of providing the Service.
          </Section>

          <Section title="11. Privacy Policy">
            Your privacy is important to us. Please review our Privacy Policy
            to understand how we collect, use, and protect your personal information.
          </Section>

          <Section title="12. Disclaimer of Warranties">
            The Service is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. We make no warranties, express or
            implied, regarding the Service, including but not limited to the
            accuracy of resume outputs.
          </Section>

          <Section title="13. Limitation of Liability">
            To the fullest extent permitted by law, we shall not be
            liable for any indirect, incidental, consequential, or punitive damages
            arising out of or related to your use of the Service.
          </Section>

          <Section title="14. Changes to the Terms">
            We may update these Terms from time to time. Any changes will be posted
            on this page, and the &quot;Effective Date&quot; will be updated
            accordingly.
          </Section>

          <Section title="15. Contact Us">
            If you have any questions about these Terms, please contact us through our support channels.
          </Section>

          <div className="mt-8 rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
            <p className="text-purple-300 text-sm">
              By using NextGen Resume Builder, you acknowledge that you have read,
              understood, and agree to these Terms of Service.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm mt-12">
        <div className="mx-auto max-w-4xl px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} NextGen Resume Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="text-gray-400 leading-relaxed">{children}</div>
    </div>
  );
}
