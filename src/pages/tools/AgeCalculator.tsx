
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInYears, differenceInMonths, differenceInDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
                  <Label htmlFor="birthDate">Date of Birth</Label>
                  <Input
                    type="date"
                    id="birthDate"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={toDate}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toDate">Age At Date (defaults to today)</Label>
                  <Input
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
          
          <h2>Understanding Age Calculation Methods</h2>
          
          <h3>Calendar Age vs. Exact Age</h3>
          <p>There are different ways to calculate age, each serving different purposes:</p>
          <ul>
            <li><strong>Calendar Age</strong>: Simply subtracts the birth year from the current year, ignoring months and days. This is commonly used for quick reference but isn't precise.</li>
            <li><strong>Exact Age</strong>: Takes into account years, months, and days to give a complete picture of age. This is the method our calculator uses.</li>
            <li><strong>Decimal Age</strong>: Expresses age as a decimal number (e.g., 25.7 years). Useful for scientific and statistical purposes.</li>
          </ul>
          
          <h3>How Leap Years Affect Age Calculation</h3>
          <p>Leap years add complexity to age calculations. Our calculator accounts for leap years in several ways:</p>
          <ul>
            <li>It recognizes that leap years have 366 days instead of 365</li>
            <li>It properly handles February 29 birthdays in non-leap years</li>
            <li>It correctly calculates the exact number of days between dates spanning multiple leap years</li>
          </ul>
          
          <h3>Cultural Variations in Age Counting</h3>
          <p>Different cultures have varying traditions for counting age:</p>
          <ul>
            <li><strong>Western Method</strong>: Age starts at birth and increases on birthdays. This is the most common method and what our calculator uses.</li>
            <li><strong>East Asian Age Reckoning</strong>: In some East Asian cultures, babies are considered one year old at birth, and everyone ages one year on New Year's Day rather than on individual birthdays.</li>
            <li><strong>Lunar Calendar Age</strong>: Some cultures calculate age based on lunar years rather than solar years.</li>
          </ul>
          
          <h2>Age Calculation in Different Contexts</h2>
          
          <h3>Legal Age Determination</h3>
          <p>Legal systems often have specific rules for determining age in different contexts:</p>
          <ul>
            <li>For most legal purposes, a person is considered to have attained a particular age on the day before their birthday of that year</li>
            <li>Some jurisdictions use the "reached by" date, where eligibility begins on the exact birth date</li>
            <li>Others use the "year of" system, where your age is determined by the calendar year in relation to your birth year</li>
          </ul>
          
          <h3>Age for Identity Documents</h3>
          <p>Official documents usually record age in different ways:</p>
          <ul>
            <li>Passports and driver's licenses typically display birth date rather than age</li>
            <li>School records often use "age as of" a specific cutoff date for grade placement</li>
            <li>Medical records may track both chronological age and developmental age</li>
          </ul>
          
          <h3>Age in Scientific and Medical Research</h3>
          <p>Scientific contexts often require more precise age measurements:</p>
          <ul>
            <li>Clinical trials may specify age in years, months, and days for inclusion criteria</li>
            <li>Developmental psychology uses age in months for young children</li>
            <li>Geriatric medicine may consider both chronological age and biological age</li>
          </ul>
          
          <h2>Interesting Facts About Age and Time</h2>
          
          <h3>Age Milestones Around the World</h3>
          <p>Various age thresholds mark important transitions globally:</p>
          <ul>
            <li>Voting age ranges from 16 to 21 in different countries</li>
            <li>Driving age varies from 14 to 18 for supervised driving and 16 to 21 for unsupervised driving</li>
            <li>Drinking age spans from 16 to 25, with some countries having no minimum age for private consumption</li>
            <li>Age of majority (legal adulthood) is typically 18 or 21 worldwide</li>
          </ul>
          
          <h3>The Mathematics of Age</h3>
          <p>Age calculation involves interesting mathematical concepts:</p>
          <ul>
            <li>The average human lifespan is approximately 2.5 billion heartbeats</li>
            <li>A person who lives to 80 will take about 672 million breaths</li>
            <li>In a lifetime of 80 years, you'll experience about 29,200 days</li>
            <li>The probability of two random people sharing a birthday is 50% in a group of just 23 people</li>
          </ul>
          
          <h3>Historical Age Records</h3>
          <p>Throughout history, remarkable age-related records have been documented:</p>
          <ul>
            <li>The verified oldest person ever was Jeanne Calment, who lived to 122 years and 164 days</li>
            <li>The youngest mother in medical history was just 5 years old</li>
            <li>The youngest published author was 4 years old</li>
            <li>Some bristlecone pine trees are over 5,000 years old, making them the oldest non-clonal organisms on Earth</li>
          </ul>
          
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
          
          <h3>What's the difference between "age in years, months, days" and "total" units?</h3>
          <p>The age in years, months, and days represents your age broken down into these natural calendar units. For example, 25 years, 3 months, and 15 days. The "total" units convert your entire age into a single unit of measurement - like total months (303 months) or total days (9,227 days).</p>
          
          <h3>Can I calculate the age of non-human entities?</h3>
          <p>Absolutely! While designed for human age calculation, our tool can determine the age or time elapsed for anything - pets, historical artifacts, astronomical events, or any other entity with a definable beginning date.</p>
          
          <h3>Why might my calculated age differ from other calculators?</h3>
          <p>Different age calculators may use slightly different algorithms, especially for handling the complexities of months with different lengths and leap years. Our calculator uses industry-standard date arithmetic to provide the most accurate results possible.</p>
          
          <h3>Is there a maximum date range the calculator can handle?</h3>
          <p>The calculator can handle dates within the range supported by modern JavaScript date objects, which is from January 1, 1970, to several hundred thousand years in the future. For practical purposes, it can calculate ages for any reasonable human timespan.</p>
          
          <h3>Does the calculator account for Daylight Saving Time changes?</h3>
          <p>Yes, the date calculations automatically handle Daylight Saving Time shifts. Since we're calculating in full days, the hour changes due to DST don't affect the results.</p>
          
          <h2>Applications of Age Calculation in Different Fields</h2>
          
          <h3>Healthcare and Medicine</h3>
          <p>Precise age calculation is crucial in medical contexts:</p>
          <ul>
            <li>Pediatric dosing of medications often relies on exact age in months or even days for infants</li>
            <li>Developmental milestones are assessed based on age-appropriate norms</li>
            <li>Vaccination schedules require accurate age tracking for optimal protection</li>
            <li>Age-related health screenings (mammograms, colonoscopies, etc.) are recommended based on specific age thresholds</li>
          </ul>
          
          <h3>Education and Academic Research</h3>
          <p>Age plays a significant role in educational settings:</p>
          <ul>
            <li>School entry cutoff dates determine which grade a child enters</li>
            <li>Age-based reading levels and educational milestones help assess development</li>
            <li>Research studies often group participants by age cohorts for comparative analysis</li>
            <li>Gifted programs and special education services may use "mental age" or developmental age in addition to chronological age</li>
          </ul>
          
          <h3>Finance and Insurance</h3>
          <p>The financial sector relies heavily on age calculations:</p>
          <ul>
            <li>Insurance premiums are often determined by age brackets</li>
            <li>Retirement planning requires accurate projections of age at retirement</li>
            <li>Pension and social security eligibility depend on reaching specific ages</li>
            <li>Life expectancy calculations for financial planning use current age as a starting point</li>
            <li>Certain financial products have age restrictions or age-based benefits</li>
          </ul>
          
          <h3>Entertainment and Sports</h3>
          <p>Age categories are fundamental in many competitive and entertainment contexts:</p>
          <ul>
            <li>Sports competitions often divide participants into age groups for fair competition</li>
            <li>Content ratings for movies, games, and other media use age thresholds</li>
            <li>Senior discounts typically begin at specific age milestones</li>
            <li>Professional athletes' careers are often analyzed in terms of "peak age" and career longevity</li>
          </ul>
          
          <h2>The Science of Aging</h2>
          
          <h3>Chronological vs. Biological Age</h3>
          <p>Modern science recognizes the distinction between different measures of age:</p>
          <ul>
            <li><strong>Chronological Age</strong>: The time elapsed since birth - what our calculator measures</li>
            <li><strong>Biological Age</strong>: How old your body seems based on biomarkers and physical condition</li>
            <li><strong>Psychological Age</strong>: How old you feel and act mentally and emotionally</li>
            <li><strong>Social Age</strong>: How age-appropriate your behavior is relative to cultural norms</li>
          </ul>
          
          <h3>Factors That Affect Perceived Age</h3>
          <p>Many factors influence how old a person seems beyond their chronological age:</p>
          <ul>
            <li>Genetics play a significant role in aging patterns and longevity</li>
            <li>Lifestyle choices like diet, exercise, smoking, and alcohol consumption impact aging</li>
            <li>Environmental factors such as sun exposure and pollution affect visible signs of aging</li>
            <li>Stress levels and mental health can accelerate or decelerate the aging process</li>
            <li>Sleep quality has a profound effect on cellular repair and regeneration</li>
          </ul>
          
          <h3>Longevity Research and Life Extension</h3>
          <p>Cutting-edge research is exploring how to extend healthy human lifespan:</p>
          <ul>
            <li>Caloric restriction has shown promise in extending lifespan in various research models</li>
            <li>Telomere maintenance is being studied as a potential intervention in the aging process</li>
            <li>Senolytic drugs that remove senescent cells may help reduce age-related diseases</li>
            <li>Understanding the genetic basis of exceptional longevity in centenarians provides insights into healthy aging</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>Our Age Calculator is a powerful tool for anyone who needs to calculate precise age or time elapsed between dates. With its intuitive interface, comprehensive results, and accurate calculations, it provides valuable information for personal, administrative, and planning purposes.</p>
          
          <p>Whether you're tracking your own age, calculating age for legal documents, or just curious about time spans, our calculator offers the accuracy and detail you need. Try it today to discover your precise age down to the second!</p>
        </div>
      </div>
    </>
  );
}
