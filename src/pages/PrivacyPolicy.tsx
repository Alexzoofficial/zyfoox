
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Zyfoox - Protect Your Data</title>
        <meta name="description" content="Learn how Zyfoox protects your privacy and handles your data. Our comprehensive privacy policy outlines our commitment to your data security and privacy rights." />
        <meta name="keywords" content="privacy policy, data protection, AI tools privacy, user data, GDPR compliance, CCPA compliance" />
        <link rel="canonical" href="https://zyfoox.com/privacy" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="glass-card rounded-xl p-8 mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction and Overview</h2>
          <p>
            Welcome to Zyfoox ("we," "our," or "us"). At Zyfoox, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your data when you visit our website, use our AI-powered tools, or interact with our services.
          </p>
          <p>
            Our platform offers a variety of AI tools designed to enhance creativity, productivity, and digital presence for individuals and businesses. While delivering these services, we recognize the importance of maintaining your privacy and being transparent about our data practices.
          </p>
          <p>
            This Privacy Policy applies to all information collected through our website (https://zyfoox.com), mobile applications, and any related services, sales, marketing, or events (collectively, the "Services").
          </p>
          
          <div className="my-8 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1560758060-494f6c855a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Data privacy concept illustration showing shield protecting personal data" 
              className="rounded-xl max-w-full h-auto border border-border/50"
            />
          </div>
          
          <p>
            By accessing or using our Services, you acknowledge that you have read and understood this Privacy Policy. Your continued use of our Services indicates your consent to the practices described in this policy. If you do not agree with our policies and practices, please do not use our Services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">2. Information We Collect</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3">2.1 Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products and Services, participate in activities on our website, or otherwise when you contact us. The personal information we collect may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information (such as email address, phone number, and mailing address)</li>
            <li>Account credentials (such as username and password)</li>
            <li>Billing information (such as credit card details, billing address, and payment information)</li>
            <li>User-generated content (such as profiles, images, messages, and feedback)</li>
            <li>Job title and company name (for business users)</li>
            <li>Social media handles and profile information (if you connect social accounts)</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">2.2 Information Automatically Collected</h3>
          <p>
            When you visit, use, or navigate our website, we may automatically collect certain technical information about your device and usage patterns. This information does not reveal your specific identity (like your name or contact information) but may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Device and usage information (such as IP address, browser and device characteristics, operating system, language preferences)</li>
            <li>Usage patterns (such as referring URLs, pages viewed, features used, time spent, click stream data)</li>
            <li>Location information (such as general location based on IP address)</li>
            <li>Cookies and similar technologies (as described in our Cookie Policy section)</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">2.3 Information from Third Parties</h3>
          <p>
            We may receive additional information about you from third-party sources, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Social networks (when you connect your account or interact with our content)</li>
            <li>Marketing partners (when they share information related to your preferences or interests)</li>
            <li>Analytics providers (who help us understand our user base)</li>
            <li>Advertising partners (who provide us with marketing-related data)</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">3. How We Use Your Information</h2>
          <p>
            We use the information we collect for various business and operational purposes. Our primary goals in collecting and using your information include:
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">3.1 Providing and Improving Our Services</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Delivering the AI tools and services you request</li>
            <li>Processing transactions and managing your account</li>
            <li>Personalizing your experience and delivering tailored content</li>
            <li>Developing new features, products, and services</li>
            <li>Analyzing usage patterns to improve functionality and user experience</li>
            <li>Training and improving our AI models and algorithms</li>
            <li>Troubleshooting issues and providing technical support</li>
          </ul>

          <div className="my-8 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Secure data processing concept illustration" 
              className="rounded-xl max-w-full h-auto border border-border/50"
            />
          </div>

          <h3 className="text-xl font-medium mt-6 mb-3">3.2 Communications and Marketing</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responding to your inquiries and support requests</li>
            <li>Sending administrative information (such as account notifications and updates)</li>
            <li>Delivering marketing communications (with your consent where required)</li>
            <li>Conducting surveys and collecting feedback</li>
            <li>Informing you about new features, updates, and promotions</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">3.3 Legal and Security Purposes</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Complying with legal obligations and regulatory requirements</li>
            <li>Preventing fraudulent activity and ensuring the security of our Services</li>
            <li>Enforcing our Terms of Service and other agreements</li>
            <li>Protecting our rights, property, and safety (and those of our users)</li>
            <li>Verifying your identity and establishing accounts</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">4. How We Share Your Information</h2>
          <p>
            We may share your information with third parties in certain circumstances. We are committed to only sharing what is necessary and with appropriate safeguards in place. We may share personal information with:
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">4.1 Service Providers</h3>
          <p>
            We may share your information with service providers and vendors who perform services on our behalf, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cloud hosting and infrastructure providers</li>
            <li>Payment processors and billing services</li>
            <li>Customer support and help desk services</li>
            <li>Marketing and advertising partners</li>
            <li>Analytics providers</li>
            <li>Email delivery services</li>
            <li>Security and fraud prevention services</li>
          </ul>
          <p>
            These service providers have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">4.2 Legal Requirements</h3>
          <p>
            We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comply with a legal obligation or process</li>
            <li>Protect and defend our rights or property</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Services</li>
            <li>Protect the personal safety of users of the Services or the public</li>
            <li>Protect against legal liability</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">4.3 Business Transfers</h3>
          <p>
            If Zyfoox is involved in a merger, acquisition, asset sale, or other business transition, your information may be transferred as part of that transaction. We will notify you (for example, via a message to the email address associated with your account) of any such change in ownership or control of your personal information.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">5. Your Privacy Rights & Choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information. These may include:
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">5.1 Access and Portability</h3>
          <p>
            You have the right to request a copy of the personal information that we hold about you. You may also have the right to receive your personal information in a structured, commonly used, and machine-readable format.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">5.2 Correction and Deletion</h3>
          <p>
            If you believe that the information we hold about you is inaccurate or incomplete, you have the right to ask us to correct or update it. In certain circumstances, you also have the right to request the deletion of your personal information.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">5.3 Objection and Restriction</h3>
          <p>
            You have the right to object to our processing of your personal information. You may also request that we restrict the processing of your personal information in certain circumstances.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">5.4 Exercising Your Rights</h3>
          <p>
            To exercise any of these rights, please contact us at privacy@zyfoox.com. We will respond to your request within the timeframe required by applicable law. Please note that we may need to verify your identity before processing your request.
          </p>

          <div className="my-8 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Data security and privacy protection concept" 
              className="rounded-xl max-w-full h-auto border border-border/50"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-8">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please also remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">6.1 Security Measures</h3>
          <p>
            Our security measures include, but are not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and penetration testing</li>
            <li>Access controls and authentication measures</li>
            <li>Regular system updates and security patches</li>
            <li>Employee training on data protection and security practices</li>
            <li>Monitoring systems for potential security incidents</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">7. International Data Transfers</h2>
          <p>
            We are a global service provider, and your information may be stored and processed in countries outside of your country of residence, including the United States. These countries may have data protection laws that are different from the laws of your country. When we transfer your information to other countries, we will protect that information as described in this Privacy Policy and comply with applicable legal requirements providing adequate protection for the transfer of information to countries outside of your country of residence.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">8. Children's Privacy</h2>
          <p>
            Our Services are not directed to individuals under the age of 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information. If you believe that we have accidentally collected personal information from a child, please contact us immediately.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time in response to changing legal, technical, or business developments. When we update our Privacy Policy, we will take appropriate measures to inform you, consistent with the significance of the changes we make. We will obtain your consent to any material Privacy Policy changes if and where this is required by applicable data protection laws.
          </p>
          <p>
            You can see when this Privacy Policy was last updated by checking the "Last Updated" date displayed at the top of this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, or if you would like to exercise any of your rights regarding your personal information, please contact us at:
          </p>
          <div className="bg-card p-6 rounded-lg border border-border mt-4">
            <p><strong>Email:</strong> <a href="mailto:privacy@zyfoox.com" className="text-primary hover:underline">privacy@zyfoox.com</a></p>
            <p><strong>Postal Address:</strong> Zyfoox Inc., 123 Tech Street, Suite 500, San Francisco, CA 94103, USA</p>
            <p><strong>Data Protection Officer:</strong> <a href="mailto:dpo@zyfoox.com" className="text-primary hover:underline">dpo@zyfoox.com</a></p>
          </div>

          <Separator className="my-8" />

          <p className="text-center text-muted-foreground">
            This Privacy Policy has been designed to be compliant with major privacy regulations around the world, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>
        </div>
      </div>
    </>
  );
}
