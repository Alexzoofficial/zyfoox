
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinanceActionButton } from "@/components/finance/FinanceActionButton";
import { useToast } from "@/hooks/use-toast";

interface EmiFormValues {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
}

const defaultValues: EmiFormValues = {
  loanAmount: 1000000,
  interestRate: 10,
  loanTenure: 20
};

export default function EmiCalculator() {
  const [emiDetails, setEmiDetails] = useState<{
    monthlyEmi: number;
    totalInterest: number;
    totalAmount: number;
  }>({
    monthlyEmi: 0,
    totalInterest: 0,
    totalAmount: 0,
  });
  
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    values: EmiFormValues;
    results: typeof emiDetails;
    timestamp: Date;
  }>>([]);
  
  const { toast } = useToast();
  
  const form = useForm<EmiFormValues>({
    defaultValues
  });
  
  const calculateEMI = (values: EmiFormValues) => {
    const P = values.loanAmount;
    const r = values.interestRate / 12 / 100;
    const n = values.loanTenure * 12;
    
    const monthlyEmi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalAmount = monthlyEmi * n;
    const totalInterest = totalAmount - P;
    
    setEmiDetails({
      monthlyEmi,
      totalInterest,
      totalAmount,
    });
    
    return { monthlyEmi, totalInterest, totalAmount };
  };
  
  const onSubmit = (values: EmiFormValues) => {
    const results = calculateEMI(values);
    
    // Add to history
    setCalculationHistory(prev => [
      {
        values,
        results,
        timestamp: new Date()
      },
      ...prev
    ]);
    
    toast({
      title: "EMI Calculated Successfully",
      description: `Loan amount of ₹${values.loanAmount} calculated for ${values.loanTenure} years.`,
    });
  };
  
  const addNewCalculation = () => {
    form.reset(defaultValues);
    setEmiDetails({
      monthlyEmi: 0,
      totalInterest: 0,
      totalAmount: 0,
    });
    
    toast({
      title: "New Calculation Started",
      description: "Default values have been set. You can now adjust and calculate a new EMI.",
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <>
      <Helmet>
        <title>EMI Calculator - Calculate Loan Repayments | Zyfoox</title>
        <meta
          name="description"
          content="Calculate your monthly EMI (Equated Monthly Installment) with our free EMI calculator. Plan your loan repayments and compare different loan options."
        />
      </Helmet>

      <ToolHero
        title="EMI Calculator"
        description="Calculate your Equated Monthly Installment (EMI) for any loan amount and tenure"
        icon={<Calculator size={28} />}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Calculate EMI</h2>
          <FinanceActionButton onClick={addNewCalculation} label="New Calculation" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle>EMI Calculator</CardTitle>
              <CardDescription>
                Enter the details below to calculate your equated monthly installment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign size={16} /> Loan Amount (₹)
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              min={1000}
                              max={10000000}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                            <Slider
                              min={1000}
                              max={10000000}
                              step={1000}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>₹1,000</span>
                              <span>₹1,00,00,000</span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Percent size={16} /> Interest Rate (% p.a.)
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              min={1}
                              max={30}
                              step={0.1}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                            <Slider
                              min={1}
                              max={30}
                              step={0.1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1%</span>
                              <span>30%</span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanTenure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar size={16} /> Loan Tenure (Years)
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              min={1}
                              max={30}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                            <Slider
                              min={1}
                              max={30}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1 Year</span>
                              <span>30 Years</span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">Calculate EMI</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-5 bg-muted/10">
            <CardHeader>
              <CardTitle>EMI Breakup</CardTitle>
              <CardDescription>Based on your inputs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly EMI</span>
                    <span className="font-bold text-lg">{formatCurrency(emiDetails.monthlyEmi)}</span>
                  </div>
                  <div className="h-px bg-border my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Principal Amount</span>
                    <span className="font-medium">{formatCurrency(form.getValues().loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400">{formatCurrency(emiDetails.totalInterest)}</span>
                  </div>
                  <div className="h-px bg-border my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total Amount</span>
                    <span className="font-bold">{formatCurrency(emiDetails.totalAmount)}</span>
                  </div>
                </div>
              </div>
              
              {calculationHistory.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-medium mb-3">Recent Calculations</h3>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {calculationHistory.slice(0, 3).map((item, index) => (
                      <div key={index} className="text-sm p-2 bg-background rounded-md">
                        <div className="flex justify-between">
                          <span>Loan: ₹{item.values.loanAmount}</span>
                          <span>EMI: {formatCurrency(item.results.monthlyEmi)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground flex justify-between mt-1">
                          <span>{item.values.loanTenure} years at {item.values.interestRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
