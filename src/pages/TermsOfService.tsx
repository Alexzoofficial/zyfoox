import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Zyfoox - User Agreement</title>
        <meta name="description" content="Read Zyfoox's Terms of Service. This agreement outlines the rules, guidelines, and terms for using our AI-powered tools and services." />
        <meta name="keywords" content="terms of service, user agreement, legal terms, AI tools terms, service agreement, user guidelines" />
        <link rel="canonical" href="https://zyfoox.com/terms" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="glass-card rounded-xl p-8 mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction and Acceptance of Terms</h2>
          <p>
            Welcome to Zyfoox. These Terms of Service ("Terms") govern your access to and use of Zyfoox's website, applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
          </p>
          <p>
            Please read these Terms carefully before using our Services. If you do not agree to these Terms, you may not access or use the Services. By accessing or using any part of our Services, you indicate that you understand, agree to, and accept all the terms and conditions contained in this agreement.
          </p>
          
          <div className="my-8 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Legal agreement concept" 
              className="rounded-xl max-w-full h-auto border border-border/50"
            />
          </div>
          
          <p>
            Zyfoox provides AI-powered tools designed to enhance creativity, productivity, and digital presence for individuals and businesses. Our platform offers a suite of tools for personal branding, content creation, business development, and educational resources.
          </p>
          <p>
            We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by updating the date at the top of these Terms and, in some cases, providing additional notification. Your continued use of the Services after any changes indicates your acceptance of the modified Terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">2. Account Registration and Eligibility</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3">2.1 Account Creation</h3>
          <p>
            To access certain features of our Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <p>
            You must immediately notify Zyfoox of any unauthorized use of your account or any other breach of security. Zyfoox will not be liable for any losses or damages arising from your failure to maintain the security of your account credentials.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">2.2 Eligibility Requirements</h3>
          <p>
            You must be at least 18 years old (or the age of legal majority in your jurisdiction, whichever is greater) to use our Services. By using our Services, you represent and warrant that you meet these eligibility requirements and that you are not prohibited from using the Services under applicable law.
          </p>
          <p>
            If you are using the Services on behalf of a company, organization, or other entity, you represent and warrant that you have the authority to accept these Terms on their behalf and bind them to these Terms.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">2.3 One Person, One Account</h3>
          <p>
            Each user is permitted to maintain only one active account. Multiple accounts owned by the same individual may be removed without notice. If you wish to change the email address associated with your account, you may do so through your account settings.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">3. User Conduct and Prohibited Activities</h2>
          <p>
            When using our Services, you agree to comply with all applicable laws and regulations. You further agree not to:
          </p>

          <div className="my-8 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Ethical use concept" 
              className="rounded-xl max-w-full h-auto border border-border/50"
            />
          </div>

          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Services for any illegal purpose or in violation of any local, state, national, or international law</li>
            <li>Violate or infringe the rights of others, including their intellectual property, privacy, or publicity rights</li>
            <li>Create, upload, or distribute content that is harmful, offensive, obscene, abusive, invasive of privacy, defamatory, hateful, harassing, or otherwise objectionable</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with a person or entity</li>
            <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools</li>
            <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services</li>
            <li>Attempt to bypass any measures of the Services designed to prevent or restrict access</li>
            <li>Decompile, reverse engineer, or otherwise attempt to obtain the source code or underlying ideas or information of or relating to the Services</li>
            <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services without express written permission from Zyfoox</li>
            <li>Collect or harvest user information or content for any purpose other than use of the Services as specifically authorized</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">4. Intellectual Property Rights</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3">4.1 Zyfoox's Intellectual Property</h3>
          <p>
            The Services and all content, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, and the design, selection, and arrangement thereof) are owned by Zyfoox, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            These Terms do not grant you any right, title, or interest in the Services, content, or our trademarks, logos, or other brand features. You agree not to modify, reproduce, distribute, create derivative works or adaptations of, publicly display or in any way exploit any of the Services or content in whole or in part except as expressly authorized by us.
          </p>

          <Separator className="my-8" />

          <p className="text-center text-muted-foreground">
            This is a condensed version of our Terms of Service. The full document continues with sections on user content, 
            licenses, disclaimers, limitation of liability, indemnification, governing law, dispute resolution, 
            termination, and additional provisions.
          </p>
        </div>
      </div>
    </>
  );
}
