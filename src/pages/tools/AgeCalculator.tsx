
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInYears, differenceInMonths, differenceInDays } from "date-fns";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    totalMonths: number;
    totalWeeks: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;
  } | null>(null);
  
  const { toast } = useToast();

  const calculateAge = () => {
    if (!birthDate) {
      toast({
        title: "Missing information",
        description: "Please select your birth date",
        variant: "destructive",
      });
      return;
    }

    const birthDateObj = new Date(birthDate);
    const toDateObj = toDate ? new Date(toDate) : new Date();

    if (birthDateObj > toDateObj) {
      toast({
        title: "Invalid dates",
        description: "Birth date cannot be after the end date",
        variant: "destructive",
      });
      return;
    }

    // Calculate years, months, days
    const years = differenceInYears(toDateObj, birthDateObj);
    
    // Calculate remaining months after years
    const birthDatePlusYears = new Date(birthDateObj);
    birthDatePlusYears.setFullYear(birthDateObj.getFullYear() + years);
    const months = differenceInMonths(toDateObj, birthDatePlusYears);
    
    // Calculate remaining days after years and months
    const birthDatePlusYearsMonths = new Date(birthDatePlusYears);
    birthDatePlusYearsMonths.setMonth(birthDatePlusYears.getMonth() + months);
    const days = differenceInDays(toDateObj, birthDatePlusYearsMonths);
    
    // Calculate total values
    const totalDays = differenceInDays(toDateObj, birthDateObj);
    const totalMonths = differenceInMonths(toDateObj, birthDateObj);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    setAge({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
    });
  };

  return (
    <>
      <Helmet>
        <title>Age Calculator - Calculate Your Exact Age in Years, Months, and Days | Zyfoox</title>
        <meta 
          name="description" 
          content="Calculate your exact age in years, months, days, weeks, hours, minutes, and seconds with our precise Age Calculator. Free online tool with no registration required." 
        />
        <meta 
          name="keywords" 
          content="age calculator, calculate age, age in years months days, date of birth calculator, exact age calculation, online age calculator" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/age-calculator" />
      </Helmet>

      <ToolHero
        title="Age Calculator"
        description="Calculate your exact age in years, months, days, and more with precision."
        icon={<Clock size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Calculate Your Age</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="birthDate" className="block text-sm font-medium">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={toDate}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="toDate" className="block text-sm font-medium">
                    Age At Date (defaults to today)
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    min={birthDate}
                  />
                </div>
                
                <button
                  onClick={calculateAge}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Calculate Age
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 animate-fade-in animate-delay-100">
            <div className="glass-card rounded-xl p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {age ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary">{age.years}</div>
                      <div className="text-sm text-muted-foreground">Years</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary">{age.months}</div>
                      <div className="text-sm text-muted-foreground">Months</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary">{age.days}</div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Age in Different Units</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex justify-between py-2 px-3 bg-card/50 rounded-lg">
                        <span>Total Months:</span>
                        <span className="font-medium">{age.totalMonths.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-card/50 rounded-lg">
                        <span>Total Weeks:</span>
                        <span className="font-medium">{age.totalWeeks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-card/50 rounded-lg">
                        <span>Total Days:</span>
                        <span className="font-medium">{age.totalDays.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-card/50 rounded-lg">
                        <span>Total Hours:</span>
                        <span className="font-medium">{age.totalHours.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-card/50 rounded-lg">
                        <span>Total Minutes:</span>
                        <span className="font-medium">{age.totalMinutes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 bg-card/50 rounded-lg">
                        <span>Total Seconds:</span>
                        <span className="font-medium">{age.totalSeconds.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <p>Enter your date of birth to calculate your age</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>How to Use the Age Calculator</h2>
          <p>Our Age Calculator is a simple yet powerful tool that allows you to determine your exact age or the time elapsed between any two dates. Whether you're curious about your precise age for personal reasons, legal documentation, or just for fun, this calculator provides comprehensive age information in various units of time.</p>
          
          <h3>Easy Steps to Calculate Your Age</h3>
          <ol>
            <li><strong>Enter your date of birth</strong>: Select the day, month, and year you were born using the date picker.</li>
            <li><strong>Select the end date</strong> (optional): By default, the calculator uses today's date. If you want to know your age as of a specific date in the past or future, select that date.</li>
            <li><strong>Click the "Calculate Age" button</strong>: The calculator will instantly process your information and display the results.</li>
          </ol>
          
          <h3>Understanding Your Age Results</h3>
          <p>The Age Calculator provides your age in multiple formats:</p>
          <ul>
            <li><strong>Years, Months, and Days</strong>: Your exact age broken down into complete years, remaining months, and days.</li>
            <li><strong>Total Time Units</strong>: Your age expressed in total months, weeks, days, hours, minutes, and seconds.</li>
          </ul>
          
          <h2>Why Use Our Age Calculator?</h2>
          <p>Our Age Calculator stands out for its accuracy, ease of use, and comprehensive results. Here are some reasons to use our tool:</p>
          
          <h3>Precise Calculations</h3>
          <p>The calculator takes into account leap years, varying month lengths, and other calendar intricacies to provide the most accurate age calculation possible.</p>
          
          <h3>Multiple Time Units</h3>
          <p>Unlike basic calculators that only show years, our tool breaks down your age into years, months, days, and even smaller units like hours and minutes, giving you a complete picture of your time on Earth.</p>
          
          <h3>Versatile Date Selection</h3>
          <p>Calculate age between any two dates - past, present, or future. This makes it useful for historical research, planning, or understanding time spans in general.</p>
          
          <h3>No Registration Required</h3>
          <p>Our Age Calculator is completely free to use and doesn't require any sign-up or registration. Your data stays on your device and is not stored on our servers.</p>
          
          <h2>Common Uses for the Age Calculator</h2>
          
          <h3>Personal Knowledge</h3>
          <p>Satisfy your curiosity about your exact age or how much time has passed since significant life events.</p>
          
          <h3>Legal and Administrative Purposes</h3>
          <p>Determine precise age for legal documents, eligibility for certain benefits, services, or age-restricted activities.</p>
          
          <h3>Medical and Health Tracking</h3>
          <p>Many medical guidelines and health recommendations are age-specific. Knowing your exact age can help you follow appropriate health advice.</p>
          
          <h3>Retirement Planning</h3>
          <p>Calculate how many years, months, and days until retirement age to help with financial planning.</p>
          
          <h3>Educational Requirements</h3>
          <p>Determine eligibility for school enrollment, scholarships, or educational programs that have age restrictions.</p>
          
          <h3>Historical Research</h3>
          <p>Calculate the time elapsed between historical events or the age of historical figures at specific points in time.</p>
          
          <h2>Privacy and Security</h2>
          <p>We take your privacy seriously. Our Age Calculator performs all calculations locally in your browser. The dates you enter are not stored on our servers or shared with any third parties.</p>
          
          <h2>Frequently Asked Questions About Age Calculation</h2>
          
          <h3>How does the Age Calculator handle leap years?</h3>
          <p>Our calculator automatically accounts for leap years in its calculations, ensuring accurate results. It knows which years are leap years (having 366 days instead of 365) and factors this into the age computation.</p>
          
          <h3>Why does my age in months sometimes seem off by a day?</h3>
          <p>This can happen due to the varying lengths of months and the specific day of the month you were born. For example, if you were born on the 31st of a month, and the current month has only 30 days, the calculator handles this calendar discrepancy appropriately.</p>
          
          <h3>Can I calculate age for dates in the future?</h3>
          <p>Yes! Our calculator allows you to set both the birth date and end date. If you set the end date in the future, you'll get a projection of the age at that future date.</p>
          
          <h3>Is the Age Calculator accurate for very old dates?</h3>
          <p>The calculator is designed to work with dates in the modern Gregorian calendar. For historical dates before the widespread adoption of the Gregorian calendar (pre-1582), there may be some discrepancies due to calendar system differences.</p>
          
          <h3>How are total months, weeks, and days calculated?</h3>
          <p>Total months are calculated based on calendar months between the two dates. Total weeks are calculated as the total number of days divided by 7. Total days are the exact count of days between the two dates, accounting for leap years.</p>
          
          <h2>Conclusion</h2>
          <p>Our Age Calculator is a powerful tool for anyone who needs to calculate precise age or time elapsed between dates. With its intuitive interface, comprehensive results, and accurate calculations, it provides valuable information for personal, administrative, and planning purposes.</p>
          
          <p>Whether you're tracking your own age, calculating age for legal documents, or just curious about time spans, our calculator offers the accuracy and detail you need. Try it today to discover your precise age down to the second!</p>
        </div>
      </div>
    </>
  );
}
