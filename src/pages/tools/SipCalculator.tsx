
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [annualReturn, setAnnualReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, annualReturn, timePeriod]);

  const calculateSIP = () => {
    if (monthlyInvestment <= 0 || annualReturn <= 0 || timePeriod <= 0) {
      toast({
        title: "Invalid input",
        description: "All values must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    // Calculate SIP returns
    const monthlyRate = annualReturn / 12 / 100;
    const months = timePeriod * 12;
    const investedAmount = monthlyInvestment * months;
    
    // Formula: FV = P × ((1 + r)^n - 1) / r) × (1 + r)
    const futureValue = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const wealthGained = futureValue - investedAmount;
    
    setTotalInvestment(investedAmount);
    setTotalReturns(wealthGained);
    setTotalValue(futureValue);
    
    // Generate chart data
    generateChartData(monthlyInvestment, monthlyRate, months);
  };
  
  const generateChartData = (monthlyAmount: number, monthlyRate: number, totalMonths: number) => {
    const data = [];
    let investedAmount = 0;
    let currentValue = 0;
    
    // Collect data for each year
    for (let year = 1; year <= Math.ceil(totalMonths / 12); year++) {
      const monthsCompleted = Math.min(year * 12, totalMonths);
      
      // Calculate invested amount
      investedAmount = monthlyAmount * monthsCompleted;
      
      // Calculate future value at this point
      currentValue = monthlyAmount * 
        (((Math.pow(1 + monthlyRate, monthsCompleted)) - 1) / monthlyRate) * 
        (1 + monthlyRate);
      
      data.push({
        year,
        investedAmount: Math.round(investedAmount),
        estimatedReturns: Math.round(currentValue - investedAmount),
        totalValue: Math.round(currentValue)
      });
    }
    
    setChartData(data);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <>
      <Helmet>
        <title>SIP Calculator - Plan Your Mutual Fund Investments | Zyfoox</title>
        <meta 
          name="description" 
          content="Calculate your mutual fund SIP (Systematic Investment Plan) returns with our SIP Calculator. Plan investments and visualize wealth growth over time." 
        />
        <meta 
          name="keywords" 
          content="SIP calculator, mutual fund calculator, investment calculator, systematic investment plan, SIP return calculator, investment planning, wealth calculator" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/sip-calculator" />
      </Helmet>

      <ToolHero
        title="SIP Calculator"
        description="Calculate mutual fund SIP returns and plan your long-term investments with precision."
        icon={<Calculator size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Calculate SIP Returns</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="monthly-investment" className="block text-sm font-medium">
                    Monthly Investment (₹)
                  </label>
                  <input
                    type="number"
                    id="monthly-investment"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    min="100"
                    step="100"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="annual-return" className="block text-sm font-medium">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    id="annual-return"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    min="1"
                    max="50"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="time-period" className="block text-sm font-medium">
                    Time Period (Years)
                  </label>
                  <input
                    type="number"
                    id="time-period"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    min="1"
                    max="50"
                    step="1"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Total Investment</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(totalInvestment)}</div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Estimated Returns</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalReturns)}</div>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Total Value</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(totalValue)}</div>
                </div>
              </div>
              
              <div className="h-72 md:h-80">
                {chartData.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value / 1000)}k`}
                        label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), '']}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line 
                        type="monotone" 
                        dataKey="investedAmount" 
                        name="Invested Amount"
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ r: 1 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="estimatedReturns" 
                        name="Estimated Returns"
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        dot={{ r: 1 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="totalValue" 
                        name="Total Value"
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 1 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>How to Use the SIP Calculator</h2>
          <p>Our SIP (Systematic Investment Plan) Calculator is a powerful tool designed to help you plan your mutual fund investments and visualize your potential wealth growth over time. Whether you're a novice investor or a seasoned financial expert, this calculator provides valuable insights into the power of compounding and regular investing.</p>
          
          <h3>Easy Steps to Calculate Your SIP Returns</h3>
          <ol>
            <li><strong>Enter your monthly investment amount</strong>: This is the fixed amount you plan to invest each month in your chosen mutual fund scheme.</li>
            <li><strong>Specify the expected annual return</strong>: Input the expected annual return percentage based on historical fund performance or your investment goals. Different fund categories have different return potentials.</li>
            <li><strong>Set the investment time period</strong>: Define how many years you plan to continue your SIP investments. The power of SIP is most evident over longer time horizons.</li>
            <li><strong>View the results</strong>: The calculator automatically computes and displays your total investment, estimated returns, and the final value of your investment. The visual chart helps you understand how your wealth grows over time.</li>
          </ol>
          
          <h3>Understanding SIP Calculation Results</h3>
          <p>The SIP Calculator provides comprehensive results:</p>
          <ul>
            <li><strong>Total Investment</strong>: The sum of all monthly investments over the entire period.</li>
            <li><strong>Estimated Returns</strong>: The wealth gained through compounding over and above your invested amount.</li>
            <li><strong>Total Value</strong>: The final value of your investment at the end of the specified period (Total Investment + Estimated Returns).</li>
            <li><strong>Year-wise Growth Chart</strong>: A visual representation of how your investment grows each year, showing the invested amount, returns, and total value.</li>
          </ul>
          
          <h2>Why Invest Through SIP?</h2>
          <p>Systematic Investment Plans offer numerous advantages compared to lump-sum investments or irregular saving methods:</p>
          
          <h3>Power of Compounding</h3>
          <p>SIPs harness the power of compounding, where you earn returns not just on your principal investment but also on the accumulated returns over time. The longer your investment horizon, the more dramatic the compounding effect becomes.</p>
          
          <h3>Rupee Cost Averaging</h3>
          <p>By investing a fixed amount regularly, you buy more units when prices are low and fewer when prices are high. This strategy, known as rupee cost averaging, helps reduce the impact of market volatility on your overall investment.</p>
          
          <h3>Financial Discipline</h3>
          <p>SIPs encourage disciplined investing by automating the investment process. This regular commitment helps build wealth consistently over time without requiring large initial capital.</p>
          
          <h3>Flexibility</h3>
          <p>Most SIPs offer flexibility in terms of investment amount, frequency, and duration. You can start with a small amount and increase it as your income grows, or pause your SIP during financial emergencies.</p>
          
          <h3>Accessibility</h3>
          <p>SIPs make mutual fund investments accessible to average investors who may not have large lump sums to invest but can commit to regular small investments.</p>
          
          <h2>Factors Affecting SIP Returns</h2>
          <p>Understanding the key factors that impact your SIP returns can help you make more informed investment decisions:</p>
          
          <h3>Investment Amount</h3>
          <p>Higher monthly investments naturally lead to larger final corpus amounts. Even small increases in your monthly SIP can significantly impact your long-term wealth creation.</p>
          
          <h3>Investment Duration</h3>
          <p>The power of compounding works best over longer time periods. A longer investment horizon not only increases your total investment but also allows more time for your returns to compound and grow.</p>
          
          <h3>Expected Rate of Return</h3>
          <p>Different mutual fund categories offer varying potential returns. Equity funds typically offer higher returns over the long term compared to debt funds, but with higher volatility. Your return expectations should align with the fund category you choose.</p>
          
          <h3>Frequency of Investment</h3>
          <p>While monthly SIPs are most common, some investors opt for quarterly or even weekly investments. Higher frequency can sometimes yield slightly better results due to more efficient rupee cost averaging.</p>
          
          <h3>Market Conditions</h3>
          <p>While SIPs help mitigate the impact of market volatility, overall market conditions during your investment period play a role in determining your actual returns.</p>
          
          <h2>Types of Mutual Funds for SIP Investments</h2>
          <p>Choosing the right mutual fund category for your SIP is crucial for meeting your financial goals:</p>
          
          <h3>Equity Funds</h3>
          <p>These funds primarily invest in stocks and offer higher potential returns over long investment horizons (5+ years). They are suitable for investors with higher risk tolerance seeking substantial wealth creation.</p>
          
          <h3>Debt Funds</h3>
          <p>Primarily investing in fixed-income securities like bonds and government securities, these funds offer more stable but relatively lower returns. They are suitable for conservative investors or short to medium-term goals.</p>
          
          <h3>Hybrid Funds</h3>
          <p>These funds invest in a mix of equity and debt instruments, offering a balance between growth and stability. Balanced advantage funds, for instance, dynamically adjust their equity-debt allocation based on market conditions.</p>
          
          <h3>Index Funds</h3>
          <p>These funds mirror a specific market index (like Nifty 50) and are passive investment options with lower expense ratios. They're suitable for investors seeking market-linked returns without the fund manager's active intervention.</p>
          
          <h3>Sectoral/Thematic Funds</h3>
          <p>These funds focus on specific sectors or investment themes and can be considered by investors who have high-risk tolerance and specific sector insights.</p>
          
          <h2>SIP Investment Strategies</h2>
          <p>Beyond basic SIP investments, consider these strategies to optimize your mutual fund investments:</p>
          
          <h3>SIP Top-up</h3>
          <p>Increase your SIP amount periodically (yearly or bi-yearly) to align with your income growth. Even small increases can significantly enhance your final corpus due to compounding.</p>
          
          <h3>SIP with Step-up</h3>
          <p>Some mutual funds offer automatic step-up facilities where your SIP amount increases by a fixed percentage or amount periodically without requiring manual intervention.</p>
          
          <h3>Multi-scheme SIPs</h3>
          <p>Instead of investing in a single scheme, distribute your SIP across multiple schemes or fund categories to diversify your investment and potentially optimize returns.</p>
          
          <h3>Trigger-based SIPs</h3>
          <p>Some advanced investors use market triggers to adjust their SIP investments, increasing allocations during market corrections or reducing during perceived overvaluation.</p>
          
          <h3>Goal-based SIPs</h3>
          <p>Align your SIPs with specific financial goals like retirement, children's education, or home purchase, with appropriately chosen investment duration and fund categories.</p>
          
          <h2>Taxation of SIP Investments</h2>
          <p>Understanding the tax implications of your SIP investments is essential for effective financial planning:</p>
          
          <h3>Equity Mutual Funds</h3>
          <p>For equity-oriented funds (with at least 65% investment in domestic equities), short-term capital gains (held for less than 12 months) are taxed at 15%, while long-term capital gains exceeding ₹1 lakh per year are taxed at 10% without indexation benefits.</p>
          
          <h3>Debt Mutual Funds</h3>
          <p>For debt-oriented funds, short-term capital gains (held for less than 36 months) are added to your income and taxed as per your tax slab. Long-term capital gains are taxed at 20% with indexation benefits.</p>
          
          <h3>Tax-saving ELSS Funds</h3>
          <p>Equity Linked Savings Schemes (ELSS) offer tax deductions up to ₹1.5 lakh under Section 80C of the Income Tax Act, along with the potential for capital appreciation. They come with a mandatory lock-in period of 3 years.</p>
          
          <h2>Common SIP Investment Mistakes to Avoid</h2>
          <p>Be aware of these common pitfalls to maximize your SIP investment outcomes:</p>
          
          <h3>Stopping SIPs During Market Downturns</h3>
          <p>Market corrections are actually opportunities to buy more units at lower prices. Stopping SIPs during downturns defeats the purpose of rupee cost averaging.</p>
          
          <h3>Frequent Switching Between Funds</h3>
          <p>Constantly changing your fund choices based on short-term performance can hurt long-term returns. Mutual funds are meant for patient, long-term investing.</p>
          
          <h3>Inadequate Research</h3>
          <p>Selecting funds based solely on past returns without considering factors like fund strategy, manager expertise, risk metrics, and expense ratio can lead to suboptimal choices.</p>
          
          <h3>Ignoring Asset Allocation</h3>
          <p>Your investment distribution across equity, debt, and other asset classes should align with your risk tolerance, investment horizon, and financial goals.</p>
          
          <h3>Not Reviewing Investments Periodically</h3>
          <p>While frequent changes are discouraged, a periodic review (semi-annually or annually) helps ensure your investments remain aligned with your goals and make necessary adjustments.</p>
          
          <h2>Conclusion</h2>
          <p>Our SIP Calculator is a valuable tool for planning your mutual fund investments and visualizing the potential growth of your wealth over time. By understanding the power of systematic investing, compounding, and long-term wealth creation, you can make more informed investment decisions aligned with your financial goals.</p>
          
          <p>Remember that actual returns may vary based on market conditions and fund performance. It's advisable to consult with a financial advisor before making significant investment decisions. Start your SIP journey today with realistic expectations and a disciplined approach to enjoy the benefits of long-term wealth creation.</p>
        </div>
      </div>
    </>
  );
}
