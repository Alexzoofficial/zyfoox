
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [loanTenureType, setLoanTenureType] = useState<string>("years");
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, loanTenureType]);

  const calculateEMI = () => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
      toast({
        title: "Invalid input",
        description: "All values must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    // Convert tenure to months if in years
    const tenureInMonths = loanTenureType === "years" ? loanTenure * 12 : loanTenure;
    
    // Calculate monthly interest rate
    const monthlyInterestRate = interestRate / 12 / 100;
    
    // Calculate EMI using formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const emiValue = loanAmount * monthlyInterestRate * 
      Math.pow(1 + monthlyInterestRate, tenureInMonths) / 
      (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);
    
    const totalAmount = emiValue * tenureInMonths;
    const interestAmount = totalAmount - loanAmount;
    
    setEmi(emiValue);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
    
    // Generate amortization schedule
    generateAmortizationSchedule(loanAmount, monthlyInterestRate, emiValue, tenureInMonths);
  };
  
  const generateAmortizationSchedule = (principal: number, rate: number, emiValue: number, tenure: number) => {
    let balance = principal;
    let yearlyData: any[] = [];
    let totalPrincipalPaid = 0;
    let totalInterestPaid = 0;
    
    // Calculate data for each year
    for (let year = 1; year <= Math.ceil(tenure / 12); year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      // Calculate monthly data for a year
      const monthsInThisYear = Math.min(12, tenure - (year - 1) * 12);
      
      for (let month = 1; month <= monthsInThisYear; month++) {
        const interestForMonth = balance * rate;
        const principalForMonth = emiValue - interestForMonth;
        
        yearlyPrincipal += principalForMonth;
        yearlyInterest += interestForMonth;
        
        balance -= principalForMonth;
        if (balance < 0) balance = 0;
      }
      
      totalPrincipalPaid += yearlyPrincipal;
      totalInterestPaid += yearlyInterest;
      
      yearlyData.push({
        year,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        totalPrincipalPaid: Math.round(totalPrincipalPaid),
        totalInterestPaid: Math.round(totalInterestPaid),
        balance: Math.round(balance)
      });
      
      if (balance <= 0) break;
    }
    
    setAmortizationSchedule(yearlyData);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Data for pie chart
  const pieData = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: totalInterest }
  ];
  
  const COLORS = ['#3b82f6', '#ef4444'];

  return (
    <>
      <Helmet>
        <title>EMI Calculator - Calculate Loan EMIs and Repayment Schedule | Zyfoox</title>
        <meta 
          name="description" 
          content="Calculate your loan EMI (Equated Monthly Installment) with our easy-to-use EMI Calculator. Plan home, car, personal loans with detailed repayment schedules." 
        />
        <meta 
          name="keywords" 
          content="EMI calculator, loan EMI calculator, home loan EMI, car loan EMI, personal loan EMI, loan repayment calculator, loan amortization calculator" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/emi-calculator" />
      </Helmet>

      <ToolHero
        title="EMI Calculator"
        description="Calculate your loan EMI and view detailed repayment schedules for informed financial planning."
        icon={<Calculator size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Calculate Loan EMI</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="loan-amount" className="block text-sm font-medium">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="loan-amount"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    min="1000"
                    step="1000"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest-rate" className="block text-sm font-medium">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    id="interest-rate"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min="1"
                    max="50"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="loan-tenure" className="block text-sm font-medium">
                    Loan Tenure
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="loan-tenure"
                      className="glass-input w-2/3 px-3 py-2 rounded-l-lg focus:ring-1 focus:ring-primary focus:outline-none"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      min="1"
                      max={loanTenureType === "years" ? "30" : "360"}
                      step="1"
                    />
                    <select
                      className="glass-input w-1/3 px-3 py-2 rounded-r-lg focus:ring-1 focus:ring-primary focus:outline-none border-l-0"
                      value={loanTenureType}
                      onChange={(e) => {
                        // Adjust the tenure value when switching between years and months
                        if (e.target.value === "years" && loanTenureType === "months") {
                          setLoanTenure(Math.max(1, Math.round(loanTenure / 12)));
                        } else if (e.target.value === "months" && loanTenureType === "years") {
                          setLoanTenure(loanTenure * 12);
                        }
                        setLoanTenureType(e.target.value);
                      }}
                    >
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Monthly EMI</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(emi)}</div>
                </div>
                <div className="bg-red-500/10 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalInterest)}</div>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Total Payment</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(totalPayment)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-64">
                  <h3 className="text-lg font-medium mb-2 text-center">Principal vs Interest</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-64">
                  <h3 className="text-lg font-medium mb-2 text-center">Yearly Payment Breakdown</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={amortizationSchedule.slice(0, 10)} // Show first 10 years for readability
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `₹${(value / 1000)}k`} />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value as number), '']}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="principalPaid" name="Principal" fill="#3b82f6" stackId="a" />
                      <Bar dataKey="interestPaid" name="Interest" fill="#ef4444" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          
          {amortizationSchedule.length > 0 && (
            <div className="animate-fade-in animate-delay-200">
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Yearly Amortization Schedule</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Year</th>
                        <th className="text-right py-2 px-4">Principal Paid</th>
                        <th className="text-right py-2 px-4">Interest Paid</th>
                        <th className="text-right py-2 px-4">Total Payment</th>
                        <th className="text-right py-2 px-4">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((yearData, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{yearData.year}</td>
                          <td className="text-right py-2 px-4">{formatCurrency(yearData.principalPaid)}</td>
                          <td className="text-right py-2 px-4">{formatCurrency(yearData.interestPaid)}</td>
                          <td className="text-right py-2 px-4">{formatCurrency(yearData.principalPaid + yearData.interestPaid)}</td>
                          <td className="text-right py-2 px-4">{formatCurrency(yearData.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>How to Use the EMI Calculator</h2>
          <p>Our EMI (Equated Monthly Installment) Calculator is a comprehensive tool designed to help you plan your loan repayments and understand the financial implications of different loan parameters. Whether you're considering a home loan, car loan, personal loan, or any other type of loan, this calculator provides valuable insights into your monthly installments and the total cost of the loan.</p>
          
          <h3>Simple Steps to Calculate Your Loan EMI</h3>
          <ol>
            <li><strong>Enter the loan amount</strong>: Input the principal amount you wish to borrow.</li>
            <li><strong>Specify the interest rate</strong>: Enter the annual interest rate offered by your lender.</li>
            <li><strong>Set the loan tenure</strong>: Define the repayment period in years or months.</li>
            <li><strong>View the results</strong>: The calculator instantly computes your monthly EMI, total interest payable, and total payment over the loan tenure. It also generates a detailed amortization schedule and visual representations of your loan breakdown.</li>
          </ol>
          
          <h3>Understanding EMI Calculation Results</h3>
          <p>The EMI Calculator provides comprehensive information about your loan:</p>
          <ul>
            <li><strong>Monthly EMI</strong>: The fixed amount you need to pay each month throughout the loan tenure.</li>
            <li><strong>Total Interest</strong>: The total interest component you'll pay over the entire loan period.</li>
            <li><strong>Total Payment</strong>: The sum of the principal amount and total interest (Principal + Interest).</li>
            <li><strong>Principal vs. Interest Chart</strong>: A visual representation of how much of your payment goes toward the principal and how much toward interest.</li>
            <li><strong>Yearly Payment Breakdown</strong>: A graph showing the principal and interest components of your payments for each year.</li>
            <li><strong>Amortization Schedule</strong>: A detailed year-by-year breakdown of your loan repayment, showing principal paid, interest paid, and the remaining balance after each year.</li>
          </ul>
          
          <h2>What is EMI and How is it Calculated?</h2>
          <p>EMI stands for Equated Monthly Installment, which is a fixed amount paid by a borrower to a lender at a specified date each month. EMIs consist of both principal and interest components and are designed to provide a consistent repayment structure throughout the loan tenure.</p>
          
          <h3>EMI Calculation Formula</h3>
          <p>The mathematical formula used to calculate EMI is:</p>
          <p><strong>EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)</strong></p>
          <p>Where:</p>
          <ul>
            <li><strong>P</strong> is the principal loan amount</li>
            <li><strong>r</strong> is the monthly interest rate (annual interest rate divided by 12 and then divided by 100)</li>
            <li><strong>n</strong> is the total number of monthly installments (loan tenure in months)</li>
          </ul>
          
          <h3>Components of EMI</h3>
          <p>Each EMI payment consists of two components:</p>
          <ul>
            <li><strong>Principal Component</strong>: The portion of the EMI that goes toward repaying the original loan amount.</li>
            <li><strong>Interest Component</strong>: The portion that goes toward the interest charged by the lender.</li>
          </ul>
          <p>In the initial years of the loan, the interest component forms a larger part of the EMI, while the principal component is smaller. As the loan progresses, this ratio gradually shifts, with the principal component increasing and the interest component decreasing.</p>
          
          <h2>Factors Affecting Your EMI</h2>
          <p>Understanding how different factors impact your EMI can help you make more informed borrowing decisions:</p>
          
          <h3>Loan Amount</h3>
          <p>The principal loan amount is directly proportional to the EMI. Higher loan amounts lead to higher EMIs and vice versa. Before finalizing your loan amount, consider your repayment capacity to ensure the EMI remains comfortably within your budget.</p>
          
          <h3>Interest Rate</h3>
          <p>The interest rate has a significant impact on your EMI and the total interest paid over the loan tenure. Even a small difference in the interest rate can result in substantial savings or additional costs over long-term loans like mortgages.</p>
          
          <h3>Loan Tenure</h3>
          <p>The loan repayment period affects both your monthly EMI and the total interest paid:</p>
          <ul>
            <li><strong>Shorter Tenure</strong>: Results in higher monthly EMIs but lower total interest payments.</li>
            <li><strong>Longer Tenure</strong>: Reduces the monthly EMI amount but increases the total interest paid over the life of the loan.</li>
          </ul>
          
          <h3>Repayment Schedule</h3>
          <p>While monthly repayments are the most common, some lenders offer options for quarterly, half-yearly, or even yearly repayment schedules. The frequency of repayment can affect the equivalent monthly cost and overall interest burden.</p>
          
          <h2>Types of Loans and Their Characteristics</h2>
          <p>Different types of loans have varying features that affect their EMI structure:</p>
          
          <h3>Home Loans</h3>
          <p>Home loans or mortgages typically have:</p>
          <ul>
            <li>Longer tenures (up to 30 years)</li>
            <li>Lower interest rates compared to unsecured loans</li>
            <li>Higher loan amounts based on property value</li>
            <li>Options for fixed, floating, or hybrid interest rates</li>
          </ul>
          
          <h3>Car Loans</h3>
          <p>Vehicle financing usually features:</p>
          <ul>
            <li>Medium-term tenures (3-7 years)</li>
            <li>Moderate interest rates</li>
            <li>Fixed interest rates in most cases</li>
            <li>Loan amounts based on vehicle value (typically 80-90%)</li>
          </ul>
          
          <h3>Personal Loans</h3>
          <p>These unsecured loans generally have:</p>
          <ul>
            <li>Shorter tenures (1-5 years)</li>
            <li>Higher interest rates due to the absence of collateral</li>
            <li>Fixed interest rates</li>
            <li>Loan amounts based on income and credit score</li>
          </ul>
          
          <h3>Education Loans</h3>
          <p>Loans for education expenses typically offer:</p>
          <ul>
            <li>Medium to long tenures</li>
            <li>Moderate interest rates</li>
            <li>Moratorium period during study (interest may accrue)</li>
            <li>Repayment starting after course completion</li>
          </ul>
          
          <h2>Strategies to Manage and Reduce Your EMI Burden</h2>
          <p>Consider these approaches to optimize your loan repayment and potentially reduce your financial burden:</p>
          
          <h3>Loan Prepayment</h3>
          <p>Making partial prepayments whenever you have surplus funds can significantly reduce your loan tenure and interest outgo. Check if your loan has prepayment penalties before proceeding.</p>
          
          <h3>Balance Transfer</h3>
          <p>If interest rates have fallen since you took your loan, consider transferring your loan balance to another lender offering lower rates. Factor in the transfer fees and evaluate if the long-term savings justify the switch.</p>
          
          <h3>EMI Holiday or Moratorium</h3>
          <p>Some lenders offer temporary relief from EMI payments during financial hardships. Remember that interest usually continues to accrue during this period, increasing the overall loan cost.</p>
          
          <h3>Step-up or Step-down EMIs</h3>
          <p>Some loan products offer EMI structures that increase (step-up) or decrease (step-down) over time, aligning with expected changes in your income or expenses.</p>
          
          <h3>Loan Refinancing</h3>
          <p>Refinancing your loan to secure better terms, especially when interest rates have dropped significantly, can lead to lower EMIs and interest savings.</p>
          
          <h2>Understanding the Amortization Schedule</h2>
          <p>The amortization schedule provides a detailed breakdown of each payment throughout the loan tenure, showing:</p>
          
          <h3>Principal Reduction</h3>
          <p>How much of each payment goes toward reducing the original loan amount. This portion increases over time.</p>
          
          <h3>Interest Payment</h3>
          <p>The portion of each payment that goes toward interest. This component decreases over the loan period as the principal reduces.</p>
          
          <h3>Outstanding Balance</h3>
          <p>The remaining loan amount after each payment. This helps track your progress toward full repayment.</p>
          
          <h3>Total Payment</h3>
          <p>The combined principal and interest payment for each period, which typically remains constant throughout the loan tenure for fixed-rate loans.</p>
          
          <h2>Tax Benefits on Loan Repayments</h2>
          <p>Depending on your country's tax laws, certain loans may offer tax benefits:</p>
          
          <h3>Home Loan Tax Benefits</h3>
          <p>In many countries, interest paid on home loans qualifies for tax deductions. Principal repayments may also be eligible for tax benefits under specific sections of tax laws.</p>
          
          <h3>Education Loan Tax Benefits</h3>
          <p>Interest paid on education loans often qualifies for tax deductions, encouraging investment in higher education.</p>
          
          <h3>Business Loan Deductions</h3>
          <p>Interest on loans taken for business purposes is generally deductible as a business expense, reducing taxable income.</p>
          
          <h2>Common Loan Terms You Should Know</h2>
          <p>Familiarize yourself with these key loan concepts:</p>
          
          <h3>Fixed vs. Floating Interest Rates</h3>
          <p>Fixed rates remain constant throughout the loan tenure, providing predictability in EMIs. Floating rates can change based on market benchmarks, potentially resulting in EMI fluctuations.</p>
          
          <h3>Processing Fee</h3>
          <p>A one-time charge levied by lenders when processing your loan application, typically calculated as a percentage of the loan amount.</p>
          
          <h3>Foreclosure/Prepayment Charges</h3>
          <p>Fees charged when you repay the entire loan before the scheduled tenure. Some loans have prepayment penalties, while others (like floating rate home loans) may not.</p>
          
          <h3>Loan-to-Value (LTV) Ratio</h3>
          <p>The percentage of the asset's value that a lender is willing to finance. Higher LTV ratios may lead to higher interest rates due to increased lender risk.</p>
          
          <h3>Debt-to-Income (DTI) Ratio</h3>
          <p>The percentage of your monthly income that goes toward debt repayments. Lenders use this to assess your loan eligibility and repayment capacity.</p>
          
          <h2>Conclusion</h2>
          <p>Our EMI Calculator is a powerful tool for planning and managing your loan repayments. By understanding how different parameters affect your EMI and total loan cost, you can make more informed borrowing decisions and choose the most suitable loan options for your financial situation.</p>
          
          <p>Remember that while this calculator provides accurate estimates, the actual EMI may slightly differ based on the lender's specific calculation methods, compounding frequencies, and other terms. Always verify the final EMI details with your lender before finalizing your loan agreement.</p>
          
          <p>Use this calculator to compare different loan scenarios, understand the impact of various interest rates and tenures, and find the optimal balance between affordable monthly payments and reasonable total interest costs. Responsible borrowing starts with thorough planning, and our EMI Calculator is your first step toward financial prudence.</p>
        </div>
      </div>
    </>
  );
}
