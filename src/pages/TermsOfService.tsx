
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Zyfoox - User Agreement</title>
        <meta name="description" content="Read Zyfoox's Terms of Service. This agreement outlines the rules, guidelines, and terms for using our AI-powered tools and content downloaders." />
        <meta name="keywords" content="terms of service, user agreement, legal terms, AI tools terms, service agreement, user guidelines, content downloader terms" />
        <link rel="canonical" href="https://zyfoox.com/terms" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="mb-12 text-center">
          <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="glass-card rounded-xl p-8 mb-12 prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-lg font-medium">
            Welcome to Zyfoox. Please read these Terms of Service ("Terms") carefully before using our platform, as they govern your access to and use of our services, including our AI tools and content downloaders. By accessing or using Zyfoox, you agree to be bound by these Terms and our Privacy Policy.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Zyfoox's website, applications, and services (collectively, the "Services"), you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
          </p>
          <p>
            We may modify these Terms at any time by posting the revised terms on our website. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms. It is your responsibility to check these Terms periodically for changes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Services Description</h2>
          <p>
            Zyfoox provides a platform offering AI-powered tools and content downloaders designed to assist users with various digital tasks, including but not limited to:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Content creation and enhancement through AI-powered generators</li>
            <li>Business development tools such as name generators and idea platforms</li>
            <li>Educational and study assistance tools</li>
            <li>Technical tools that facilitate downloading publicly available content from various platforms</li>
          </ul>
          
          <p>
            All tools and services provided by Zyfoox are offered free of charge, with no hidden fees or premium functionality tiers. While we strive to maintain consistent service availability, we do not guarantee uninterrupted access to our Services, as maintenance, updates, and technical issues may occasionally affect availability.
          </p>

          <div className="my-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Service Modifications</h3>
            <p className="text-muted-foreground">
              Zyfoox reserves the right to modify, suspend, or discontinue any part of the Services at any time, with or without notice. This includes adding, removing, or changing features or functionality. We will not be liable to you or any third party for any such modifications, suspensions, or discontinuations.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Eligibility and Accounts</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3">3.1 Eligibility</h3>
          <p>
            You must be at least 13 years of age to use our Services. If you are under 18 years of age, you represent that you have your parent or guardian's permission to use the Services and that they have read and agree to these Terms on your behalf.
          </p>
          <p>
            By using our Services, you represent and warrant that you have the legal capacity to enter into a binding agreement with Zyfoox and that you are not prohibited from using the Services under the laws of your jurisdiction.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">3.2 Account Creation and Security</h3>
          <p>
            While most of our tools are accessible without registration, certain features may require you to create an account. When you create an account, you agree to provide accurate, current, and complete information and to update this information to maintain its accuracy.
          </p>
          <p>
            You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. Zyfoox will not be liable for any loss or damage arising from your failure to secure your account credentials.
          </p>
          <p>
            We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct and Prohibited Activities</h2>
          <p>
            When using our Services, you agree to comply with all applicable laws and regulations. You further agree not to:
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Use the Services for any illegal purpose or in violation of any local, state, national, or international law</li>
            <li>Violate or infringe upon the intellectual property rights, publicity rights, or privacy rights of others</li>
            <li>Use our content downloaders to access, download, or distribute content in violation of applicable copyright laws or terms of service of the original content platforms</li>
            <li>Create, upload, or submit content that is harmful, offensive, obscene, abusive, invasive of privacy, defamatory, hateful, harassing, or otherwise objectionable</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with a person or entity</li>
            <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
            <li>Attempt to gain unauthorized access to any portion of the Services or any other accounts, computer systems, or networks connected to the Services</li>
            <li>Use any automated system, including "robots," "spiders," "offline readers," etc., to access the Services</li>
            <li>Bypass any measures we may use to prevent or restrict access to the Services</li>
            <li>Use the Services in a manner that could disable, overburden, damage, or impair the site</li>
            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other harmful material to the Services</li>
            <li>Collect or harvest any information or data from our Services without our express written consent</li>
            <li>Use the Services for any commercial purpose without our prior written authorization</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property Rights</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3">5.1 Zyfoox's Intellectual Property</h3>
          <p>
            The Services and all content, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, and the design, selection, and arrangement thereof) are owned by Zyfoox, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            These Terms do not grant you any right, title, or interest in the Services, content, or our trademarks, logos, or other brand features. You agree not to modify, reproduce, distribute, create derivative works or adaptations of, publicly display or in any way exploit any of the Services or content in whole or in part except as expressly authorized by us.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">5.2 User-Generated Content</h3>
          <p>
            You retain all rights to any content you submit, post, or display on or through the Services ("User Content"). By submitting User Content to the Services, you grant Zyfoox a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such material in connection with providing the Services to you and promoting our platform.
          </p>
          <p>
            You represent and warrant that: (i) you own the User Content or have the right to use and grant us the rights and license as provided in these Terms, and (ii) the posting of your User Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">5.3 Content Downloaders and Third-Party Materials</h3>
          <p>
            Zyfoox's content downloaders are tools that facilitate the downloading of publicly available content from various platforms. We do not host, store, or distribute such third-party content on our servers. The responsibility for ensuring lawful use of these tools rests with you, the user.
          </p>
          <p>
            By using our content downloaders, you agree that:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>You will only download content for which you have proper authorization or which is permissible under applicable fair use doctrines</li>
            <li>You will comply with the terms of service of the platforms from which you are downloading content</li>
            <li>You will use downloaded content only for personal, non-commercial purposes unless you have obtained appropriate licenses or permissions</li>
            <li>You will not use our tools to infringe upon copyright or other intellectual property rights</li>
          </ul>
          
          <p>
            Zyfoox is not responsible for the content that users download using our tools and does not endorse or assume any liability for such content.
          </p>

          <div className="my-8 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex">
            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1 mr-4" />
            <div>
              <h3 className="text-xl font-medium mb-2">Copyright Infringement Notice</h3>
              <p className="text-muted-foreground">
                If you believe that your copyrighted work has been used or displayed in a way that constitutes copyright infringement, please refer to our <Link to="/dmca" className="text-primary hover:underline">DMCA Policy</Link> for information on how to submit a takedown notice.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. AI-Generated Content</h2>
          <p>
            Our platform includes AI tools that generate content based on user inputs. With respect to AI-generated content:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>You retain the right to use the outputs generated by our AI tools for personal or commercial purposes</li>
            <li>We do not claim ownership of AI-generated outputs created specifically for you based on your inputs</li>
            <li>We reserve the right to use anonymized inputs and outputs to improve our AI models</li>
            <li>We make no representations or warranties about the accuracy, completeness, or quality of AI-generated content</li>
            <li>You are responsible for reviewing, editing, and ensuring the appropriateness of AI-generated content before using it</li>
          </ul>
          
          <p>
            You acknowledge that AI systems may occasionally produce outputs that contain errors, biases, or inappropriate content despite our efforts to minimize such occurrences. We recommend that users exercise discretion and critical judgment when utilizing outputs produced by our AI tools.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disclaimers and Limitations of Liability</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3">7.1 Disclaimer of Warranties</h3>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
          </p>
          <p>
            Zyfoox does not warrant that: (a) the Services will function uninterrupted, secure, or available at any particular time or location; (b) any errors or defects will be corrected; (c) the Services are free of viruses or other harmful components; or (d) the results of using the Services will meet your requirements.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">7.2 Limitation of Liability</h3>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ZYFOOX, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Your access to or use of or inability to access or use the Services;</li>
            <li>Any conduct or content of any third party on the Services;</li>
            <li>Any content obtained from the Services; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content,</li>
          </ul>
          
          <p>
            WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
          </p>
          <p>
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR CERTAIN TYPES OF DAMAGES. THEREFORE, SOME OF THE ABOVE LIMITATIONS IN THIS SECTION MAY NOT APPLY TO YOU.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Zyfoox, its directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Your use of and access to the Services;</li>
            <li>Your violation of any term of these Terms;</li>
            <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right; or</li>
            <li>Any claim that your User Content or use of the content downloaders caused damage to a third party.</li>
          </ul>
          
          <p>
            This defense and indemnification obligation will survive these Terms and your use of the Services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Termination</h2>
          <p>
            We may terminate or suspend your access to all or part of the Services, with or without notice, for any conduct that we, in our sole discretion, believe violates these Terms, is harmful to other users of the Services or third parties, or for any other reason.
          </p>
          <p>
            Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services or, if applicable, delete your account through the settings available in your profile.
          </p>
          <p>
            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>
          <p>
            Any legal action or proceeding relating to your access to or use of the Services or these Terms shall be instituted in the courts of [Your Jurisdiction]. You and Zyfoox agree to submit to the jurisdiction of, and agree that venue is proper in, these courts in any such legal action or proceeding.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Miscellaneous Provisions</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3">11.1 Entire Agreement</h3>
          <p>
            These Terms constitute the entire agreement between you and Zyfoox regarding the use of the Services, superseding any prior agreements between you and Zyfoox relating to your use of the Services.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">11.2 Waiver and Severability</h3>
          <p>
            The failure of Zyfoox to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">11.3 Assignment</h3>
          <p>
            You may not assign or transfer these Terms, by operation of law or otherwise, without Zyfoox's prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and of no effect. Zyfoox may assign or transfer these Terms, at its sole discretion, without restriction.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">11.4 Notices</h3>
          <p>
            We may provide notices to you via email, regular mail, or postings on our website. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us through our <Link to="/contact" className="text-primary hover:underline">contact page</Link>.
          </p>

          <Separator className="my-8" />

          <p className="text-center text-muted-foreground">
            By using Zyfoox, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </>
  );
}
