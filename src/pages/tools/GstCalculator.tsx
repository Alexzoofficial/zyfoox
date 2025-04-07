
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GstCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [calculationType, setCalculationType] = useState<"exclusive" | "inclusive">("exclusive");
  const [sgstCgstIgst, setSgstCgstIgst] = useState<"sgstcgst" | "igst">("sgstcgst");
  
  const { toast } = useToast();

  const validateInputs = () => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Amount must be greater than zero",
        variant: "destructive",
      });
      return false;
    }
    
    if (gstRate < 0 || gstRate > 100) {
      toast({
        title: "Invalid GST rate",
        description: "GST rate must be between 0 and 100",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  // Calculate GST amount and total
  const calculateGst = () => {
    if (!validateInputs()) return { gstAmount: 0, totalAmount: 0, baseAmount: 0 };
    
    let gstAmount = 0;
    let totalAmount = 0;
    let baseAmount = 0;
    
    if (calculationType === "exclusive") {
      // GST is added to the base amount
      baseAmount = amount;
      gstAmount = (amount * gstRate) / 100;
      totalAmount = amount + gstAmount;
    } else {
      // GST is included in the amount
      totalAmount = amount;
      baseAmount = (amount * 100) / (100 + gstRate);
      gstAmount = totalAmount - baseAmount;
    }
    
    return { gstAmount, totalAmount, baseAmount };
  };
  
  const result = calculateGst();
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <>
      <Helmet>
        <title>GST Calculator - Calculate GST Tax, Invoice Amounts | Zyfoox</title>
        <meta 
          name="description" 
          content="Calculate GST amounts accurately with our free GST Calculator. Compute inclusive, exclusive GST, SGST, CGST & IGST for invoices and billing." 
        />
        <meta 
          name="keywords" 
          content="GST calculator, GST tax calculator, CGST calculator, SGST calculator, IGST calculator, inclusive GST, exclusive GST, invoice calculator, tax calculator India" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/gst-calculator" />
      </Helmet>

      <ToolHero
        title="GST Calculator"
        description="Calculate GST amounts and invoice values with our simple and accurate GST Calculator."
        icon={<Calculator size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Calculate GST</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="calculation-type" className="block text-sm font-medium">
                      Calculation Type
                    </label>
                    <div className="flex">
                      <button
                        type="button"
                        className={`flex-1 py-2 px-4 text-center rounded-l-lg transition-colors ${
                          calculationType === "exclusive"
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                        onClick={() => setCalculationType("exclusive")}
                      >
                        Add GST (Exclusive)
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 px-4 text-center rounded-r-lg transition-colors ${
                          calculationType === "inclusive"
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                        onClick={() => setCalculationType("inclusive")}
                      >
                        Remove GST (Inclusive)
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="gst-type" className="block text-sm font-medium">
                      GST Type
                    </label>
                    <div className="flex">
                      <button
                        type="button"
                        className={`flex-1 py-2 px-4 text-center rounded-l-lg transition-colors ${
                          sgstCgstIgst === "sgstcgst"
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                        onClick={() => setSgstCgstIgst("sgstcgst")}
                      >
                        CGST & SGST
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 px-4 text-center rounded-r-lg transition-colors ${
                          sgstCgstIgst === "igst"
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                        onClick={() => setSgstCgstIgst("igst")}
                      >
                        IGST
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="amount" className="block text-sm font-medium">
                      {calculationType === "exclusive" ? "Amount (without GST)" : "Amount (with GST)"}
                    </label>
                    <input
                      type="number"
                      id="amount"
                      className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value) || 0)}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="gst-rate" className="block text-sm font-medium">
                      GST Rate (%)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[3, 5, 12, 18, 28].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          className={`py-1 px-3 text-sm rounded-lg transition-colors ${
                            gstRate === rate
                              ? "bg-primary text-white"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                          }`}
                          onClick={() => setGstRate(rate)}
                        >
                          {rate}%
                        </button>
                      ))}
                      <input
                        type="number"
                        id="gst-rate"
                        className="glass-input w-20 px-3 py-1 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                        value={gstRate}
                        onChange={(e) => setGstRate(Number(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <div className="glass-card rounded-xl p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">GST Calculation Results</h2>
              
              <div className="space-y-6">
                <div className="bg-card/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Base Amount</p>
                      <p className="text-xl font-semibold">{formatCurrency(result.baseAmount)}</p>
                    </div>
                    
                    {sgstCgstIgst === "sgstcgst" ? (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground">CGST @ {gstRate / 2}%</p>
                          <p className="text-xl font-semibold">{formatCurrency(result.gstAmount / 2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">SGST @ {gstRate / 2}%</p>
                          <p className="text-xl font-semibold">{formatCurrency(result.gstAmount / 2)}</p>
                        </div>
                      </>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground">IGST @ {gstRate}%</p>
                        <p className="text-xl font-semibold">{formatCurrency(result.gstAmount)}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Total GST</p>
                      <p className="text-xl font-semibold">{formatCurrency(result.gstAmount)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Amount (including GST)</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.totalAmount)}</p>
                </div>
                
                <div className="bg-card/20 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Invoice Breakup</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Base Amount</td>
                        <td className="py-2 text-right">{formatCurrency(result.baseAmount)}</td>
                      </tr>
                      {sgstCgstIgst === "sgstcgst" ? (
                        <>
                          <tr className="border-b">
                            <td className="py-2">CGST @ {gstRate / 2}%</td>
                            <td className="py-2 text-right">{formatCurrency(result.gstAmount / 2)}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">SGST @ {gstRate / 2}%</td>
                            <td className="py-2 text-right">{formatCurrency(result.gstAmount / 2)}</td>
                          </tr>
                        </>
                      ) : (
                        <tr className="border-b">
                          <td className="py-2">IGST @ {gstRate}%</td>
                          <td className="py-2 text-right">{formatCurrency(result.gstAmount)}</td>
                        </tr>
                      )}
                      <tr className="font-medium">
                        <td className="py-2">Total Amount</td>
                        <td className="py-2 text-right">{formatCurrency(result.totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>How to Use the GST Calculator</h2>
          <p>Our GST (Goods and Services Tax) Calculator is a comprehensive tool designed to help businesses, professionals, and individuals accurately calculate GST amounts for invoices, billing, and financial planning. Whether you need to add GST to a base amount or extract GST from an inclusive figure, our calculator simplifies the process and provides detailed breakdowns.</p>
          
          <h3>Easy Steps to Calculate GST</h3>
          <ol>
            <li><strong>Select the calculation type</strong>: Choose between "Add GST" (exclusive calculation) or "Remove GST" (inclusive calculation) based on your needs.</li>
            <li><strong>Choose the GST type</strong>: Select between CGST & SGST (for intra-state transactions) or IGST (for inter-state transactions).</li>
            <li><strong>Enter the amount</strong>: Input either the base amount (without GST) or the total amount (with GST), depending on your selected calculation type.</li>
            <li><strong>Select the GST rate</strong>: Choose from the common GST rates (3%, 5%, 12%, 18%, 28%) or input a custom rate.</li>
            <li><strong>View the results</strong>: The calculator instantly displays the base amount, GST components, and the total amount, along with a detailed invoice breakup.</li>
          </ol>
          
          <h3>Understanding GST Calculation Results</h3>
          <p>The GST Calculator provides detailed information:</p>
          <ul>
            <li><strong>Base Amount</strong>: The value of goods or services before applying GST.</li>
            <li><strong>CGST & SGST</strong>: For intra-state transactions, GST is divided equally between Central GST and State GST.</li>
            <li><strong>IGST</strong>: For inter-state transactions, Integrated GST is applied as a single tax.</li>
            <li><strong>Total GST</strong>: The combined tax amount.</li>
            <li><strong>Total Amount</strong>: The final invoice value including the base amount and GST.</li>
            <li><strong>Invoice Breakup</strong>: A detailed itemization showing all components of the invoice, perfect for billing purposes.</li>
          </ul>
          
          <h2>Understanding India's GST System</h2>
          <p>The Goods and Services Tax (GST) was introduced in India on July 1, 2017, as a comprehensive indirect tax that replaced multiple cascading taxes levied by the central and state governments. Understanding the fundamentals of GST is essential for compliance and accurate financial planning.</p>
          
          <h3>Types of GST in India</h3>
          <p>India's GST system has been structured as a dual GST model, which includes:</p>
          <ul>
            <li><strong>CGST (Central Goods and Services Tax)</strong>: Collected by the Central Government on intra-state sales.</li>
            <li><strong>SGST (State Goods and Services Tax)</strong>: Collected by the State Government on intra-state sales.</li>
            <li><strong>IGST (Integrated Goods and Services Tax)</strong>: Collected by the Central Government on inter-state sales and imports.</li>
            <li><strong>UTGST (Union Territory Goods and Services Tax)</strong>: Collected by Union Territory Governments for intra-UT transactions.</li>
          </ul>
          
          <h3>GST Rate Structure</h3>
          <p>GST rates in India are divided into multiple slabs based on the essential nature of goods and services:</p>
          <ul>
            <li><strong>0% (Exempt)</strong>: Essential items like fresh fruits, vegetables, milk, and education services.</li>
            <li><strong>3%</strong>: Precious metals like gold and silver.</li>
            <li><strong>5%</strong>: Essential commodities like branded paneer, frozen vegetables, and specific services.</li>
            <li><strong>12%</strong>: Items like processed food, business class air tickets, and certain services.</li>
            <li><strong>18%</strong>: Most goods and services fall under this category, including electronics, telecom services, and financial services.</li>
            <li><strong>28%</strong>: Luxury items and sin goods like automobiles, tobacco products, and high-end consumer durables.</li>
          </ul>
          
          <h2>GST Calculation Methods Explained</h2>
          <p>There are two primary methods for calculating GST:</p>
          
          <h3>Exclusive GST Calculation (Adding GST)</h3>
          <p>When you have the base amount and need to calculate the total amount after adding GST:</p>
          <p><strong>GST Amount = Base Amount × GST Rate / 100</strong></p>
          <p><strong>Total Amount = Base Amount + GST Amount</strong></p>
          <p>Example: For a product worth ₹1,000 with an 18% GST rate:
          <br />GST Amount = ₹1,000 × 18 / 100 = ₹180
          <br />Total Amount = ₹1,000 + ₹180 = ₹1,180</p>
          
          <h3>Inclusive GST Calculation (Removing GST)</h3>
          <p>When you have the total amount (including GST) and need to calculate the base amount:</p>
          <p><strong>Base Amount = Total Amount × 100 / (100 + GST Rate)</strong></p>
          <p><strong>GST Amount = Total Amount - Base Amount</strong></p>
          <p>Example: For a product with a total price of ₹1,180 including 18% GST:
          <br />Base Amount = ₹1,180 × 100 / (100 + 18) = ₹1,180 × 100 / 118 = ₹1,000
          <br />GST Amount = ₹1,180 - ₹1,000 = ₹180</p>
          
          <h2>Intra-State vs. Inter-State Transactions</h2>
          <p>Understanding the difference between intra-state and inter-state transactions is crucial for applying the correct GST components:</p>
          
          <h3>Intra-State Transactions (CGST & SGST)</h3>
          <p>When goods or services are supplied within the same state, GST is divided equally between CGST and SGST:</p>
          <p>For an 18% GST rate:
          <br />CGST = 9% of the base amount
          <br />SGST = 9% of the base amount</p>
          <p>The total GST remains 18%, but it's split equally between central and state governments.</p>
          
          <h3>Inter-State Transactions (IGST)</h3>
          <p>When goods or services are supplied between different states or imported, IGST is applicable:</p>
          <p>For an 18% GST rate:
          <br />IGST = 18% of the base amount</p>
          <p>The entire GST goes to the central government, which later distributes the state's share.</p>
          
          <h2>GST Input Tax Credit System</h2>
          <p>One of the key features of the GST system is the Input Tax Credit (ITC) mechanism, which helps avoid tax cascading:</p>
          
          <h3>What is Input Tax Credit?</h3>
          <p>Input Tax Credit is the credit a business can claim for GST paid on purchases used for business purposes. It allows businesses to deduct the tax they've paid on inputs from the tax they collect on outputs, effectively paying tax only on the value they add.</p>
          
          <h3>ITC Eligibility Conditions</h3>
          <p>To claim ITC, businesses must meet several conditions:</p>
          <ul>
            <li>Possession of tax invoice or debit note or other prescribed documents</li>
            <li>Receipt of goods or services</li>
            <li>Tax actually paid to the government by the supplier</li>
            <li>Filing of GST returns</li>
            <li>For invoices over ₹50,000, the recipient must verify that the supplier has reported the transaction</li>
          </ul>
          
          <h3>ITC Calculation Example</h3>
          <p>Consider a manufacturer who:</p>
          <ul>
            <li>Purchases raw materials worth ₹50,000 + ₹9,000 GST (18%)</li>
            <li>Sells finished goods worth ₹80,000 + ₹14,400 GST (18%)</li>
          </ul>
          <p>Without ITC, the manufacturer would pay ₹14,400 in output tax.<br />
          With ITC, the manufacturer can claim credit for the ₹9,000 input tax, resulting in a net GST liability of ₹5,400 (₹14,400 - ₹9,000).</p>
          
          <h2>GST Compliance for Businesses</h2>
          <p>Understanding GST compliance requirements is essential for businesses operating in India:</p>
          
          <h3>Registration Requirements</h3>
          <p>Businesses need to register for GST if:</p>
          <ul>
            <li>Their aggregate turnover exceeds ₹20 lakhs (₹10 lakhs for special category states) in a financial year</li>
            <li>They engage in inter-state supply of goods or services</li>
            <li>They are required to pay tax under reverse charge mechanism</li>
            <li>They are e-commerce operators or suppliers through e-commerce platforms</li>
          </ul>
          
          <h3>Return Filing</h3>
          <p>GST-registered businesses must file various returns:</p>
          <ul>
            <li>GSTR-1: Details of outward supplies (monthly/quarterly)</li>
            <li>GSTR-3B: Summary return with payment (monthly/quarterly)</li>
            <li>GSTR-9: Annual return (yearly)</li>
            <li>Additional forms based on business type and transactions</li>
          </ul>
          
          <h3>Invoice Requirements</h3>
          <p>GST invoices must include specific information:</p>
          <ul>
            <li>Invoice number and date</li>
            <li>Customer name, address, and GSTIN (if registered)</li>
            <li>Item details with HSN codes</li>
            <li>Taxable value and GST rate</li>
            <li>CGST, SGST, or IGST amounts separately</li>
            <li>Total invoice value</li>
            <li>Signature of the supplier or authorized representative</li>
          </ul>
          
          <h2>Recent Updates and Changes in GST</h2>
          <p>The GST system in India continues to evolve with periodic updates and changes:</p>
          
          <h3>E-invoicing System</h3>
          <p>E-invoicing has been implemented for businesses with turnover above specified thresholds, making invoice reporting and compliance more automated and transparent.</p>
          
          <h3>New Return Filing System</h3>
          <p>The government has introduced simplified return filing mechanisms to ease compliance burdens for small businesses.</p>
          
          <h3>Rate Rationalization</h3>
          <p>The GST Council periodically reviews and rationalizes tax rates for various goods and services based on economic considerations and stakeholder feedback.</p>
          
          <h3>Input Tax Credit Restrictions</h3>
          <p>Certain restrictions on claiming input tax credit have been introduced to prevent fraud and ensure proper tax compliance.</p>
          
          <h2>Benefits of Using Our GST Calculator</h2>
          <p>Our GST Calculator offers numerous advantages for businesses and individuals:</p>
          
          <h3>Accuracy and Precision</h3>
          <p>The calculator eliminates manual calculation errors, ensuring accurate tax computations for invoicing and financial reporting.</p>
          
          <h3>Time Efficiency</h3>
          <p>Save valuable time by instantly calculating GST amounts for multiple transactions without complex manual calculations.</p>
          
          <h3>Dual Calculation Methods</h3>
          <p>Easily switch between exclusive and inclusive GST calculations based on your specific needs—whether you're creating invoices or analyzing purchases.</p>
          
          <h3>Comprehensive Tax Breakdown</h3>
          <p>Get detailed breakdowns of CGST, SGST, and IGST components, helping you prepare accurate invoices and maintain proper financial records.</p>
          
          <h3>User-Friendly Interface</h3>
          <p>The intuitive design makes GST calculations accessible to everyone, regardless of their taxation knowledge or expertise.</p>
          
          <h3>No Registration Required</h3>
          <p>Use the calculator freely without registration, login, or software installation, ensuring privacy and convenience.</p>
          
          <h2>Conclusion</h2>
          <p>Our GST Calculator is an essential tool for businesses, professionals, and individuals navigating India's GST system. By providing accurate calculations, detailed breakdowns, and instant results, it simplifies tax compliance and financial planning.</p>
          
          <p>Whether you're a small business owner creating invoices, an accountant preparing financial reports, or an individual verifying tax amounts, this calculator offers the precision and convenience you need. Use it regularly to ensure GST accuracy in your financial transactions and maintain compliance with India's tax regulations.</p>
          
          <p>Remember that while this calculator provides accurate GST calculations based on the information entered, it's always advisable to consult with a qualified tax professional for complex taxation matters and specific compliance requirements.</p>
        </div>
      </div>
    </>
  );
}
