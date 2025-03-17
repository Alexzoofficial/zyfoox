
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Copyright, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DMCA() {
  return (
    <>
      <Helmet>
        <title>DMCA Policy | Zyfoox - Copyright Information</title>
        <meta name="description" content="Learn about Zyfoox's DMCA (Digital Millennium Copyright Act) policy. Find out how to report copyright infringement and understand our procedures for addressing such claims." />
        <meta name="keywords" content="DMCA, copyright policy, copyright infringement, takedown notice, intellectual property, content removal" />
        <link rel="canonical" href="https://zyfoox.com/dmca" />
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
            <Copyright className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">DMCA Copyright Policy</h1>
          <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="glass-card rounded-xl p-8 mb-12 prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-lg font-medium">
            Zyfoox respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we have implemented the following policy to address claims of copyright infringement related to content associated with our platform.
          </p>
          
          <div className="my-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Important Notice About Our Services</h3>
            <p className="text-muted-foreground">
              Zyfoox provides AI tools and content downloaders that help users access publicly available content from various platforms. We do not host, store, or distribute third-party content on our servers. Our tools merely facilitate the technical process of downloading content that is already publicly accessible. Nevertheless, we are committed to respecting copyright laws and addressing valid copyright concerns related to our services.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Reporting Copyright Infringement</h2>
          <p>
            If you believe that your copyrighted work has been used or displayed in a way that constitutes copyright infringement through our services, please send a DMCA notification to our designated copyright agent. To be effective, your notification must include the following information:
          </p>
          
          <ol className="list-decimal pl-6 space-y-2 mt-4">
            <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
            <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works.</li>
            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material. This should include specific URLs or detailed descriptions of where the allegedly infringing content appears in relation to our services.</li>
            <li>Information reasonably sufficient to permit us to contact you, such as your address, telephone number, and email address.</li>
            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information for DMCA Notices</h2>
          <p>
            Please send your DMCA notices to our designated copyright agent:
          </p>
          
          <div className="bg-card p-6 rounded-lg border border-border mt-4">
            <p><strong>Email:</strong> <a href="mailto:dmca@zyfoox.com" className="text-primary hover:underline">dmca@zyfoox.com</a></p>
            <p><strong>Subject Line:</strong> DMCA Copyright Infringement Notice</p>
            <p><strong>Postal Address:</strong> [Your Company's Physical Address]</p>
          </div>
          
          <p className="mt-6">
            Note: The above contact information is provided exclusively for notifying Zyfoox that your copyrighted material may have been infringed. All other inquiries will not receive a response through this channel.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Counter-Notification Procedures</h2>
          <p>
            If you believe that content that was removed (or to which access was disabled) as a result of a DMCA notice is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to use the content in the manner complained of, you may send a counter-notification to our designated agent containing the following information:
          </p>
          
          <ol className="list-decimal pl-6 space-y-2 mt-4">
            <li>Your physical or electronic signature.</li>
            <li>Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled.</li>
            <li>A statement under penalty of perjury that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content.</li>
            <li>Your name, address, telephone number, and email address.</li>
            <li>A statement that you consent to the jurisdiction of the federal court in the district where you reside (or where your principal place of business is located if you are a business), and that you will accept service of process from the person who provided the original DMCA notification or an agent of such person.</li>
          </ol>
          
          <p className="mt-4">
            If we receive a valid counter-notification, we may forward it to the party who filed the original DMCA notification and inform them that we may restore the removed content or cease disabling access to it in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider or user, the removed content may be restored, or access to it may be reestablished, in 10 to 14 business days after receipt of the counter-notification, at our discretion.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Repeat Infringer Policy</h2>
          <p>
            In accordance with the DMCA and other applicable laws, Zyfoox has adopted a policy of terminating, in appropriate circumstances and at our sole discretion, the accounts or access of users who are deemed to be repeat infringers. We may also, at our sole discretion, limit access to our platform and/or terminate the accounts of any users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Good Faith Belief</h2>
          <p>
            The information in this DMCA policy is provided for informational purposes only and does not constitute legal advice. If you are unsure whether your or someone else's rights are being infringed, we recommend consulting with an attorney.
          </p>
          
          <div className="my-8 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex">
            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1 mr-4" />
            <div>
              <h3 className="text-xl font-medium mb-2">Warning Regarding Misrepresentations</h3>
              <p className="text-muted-foreground">
                Please note that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing, or that material or activity was removed or disabled by mistake or misidentification, may be subject to liability for damages, including costs and attorneys' fees.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
          <p>
            Zyfoox reserves the right to modify this DMCA policy at any time. Changes and clarifications will take effect immediately upon their posting on the website. We encourage users to check this page periodically for any changes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this DMCA policy, please contact us through our <Link to="/contact" className="text-primary hover:underline">contact page</Link>.
          </p>

          <Separator className="my-8" />

          <p className="text-center text-muted-foreground">
            By using Zyfoox's services, you acknowledge that you have read and understood this DMCA policy.
          </p>
        </div>
      </div>
    </>
  );
}
