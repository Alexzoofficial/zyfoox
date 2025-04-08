
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { Calculator, BarChart3, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinanceActionButton } from "@/components/finance/FinanceActionButton";
import { useToast } from "@/hooks/use-toast";

interface SipFormValues {
  monthlyInvestment: number;
  annualReturnRate: number;
  timePeriod: number;
}

const defaultValues: SipFormValues = {
  monthlyInvestment: 5000,
  annualReturnRate: 12,
  timePeriod: 10
};

export default function SipCalculator() {
  const [estimatedReturns, setEstimatedReturns] = useState<{
    totalInvestment: number;
    totalReturns: number;
    finalValue: number;
  }>({
    totalInvestment: 0,
    totalReturns: 0,
    finalValue: 0,
  });
  
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    values: SipFormValues;
    results: typeof estimatedReturns;
    timestamp: Date;
  }>>([]);
  
  const { toast } = useToast();
  
  const form = useForm<SipFormValues>({
    defaultValues
  });
  
  const calculateSIP = (values: SipFormValues) => {
    const P = values.monthlyInvestment;
    const r = values.annualReturnRate / 100 / 12;
    const t = values.timePeriod * 12;
    
    const totalInvestment = P * t;
    const finalValue = P * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
    const totalReturns = finalValue - totalInvestment;
    
    setEstimatedReturns({
      totalInvestment,
      totalReturns,
      finalValue,
    });
    
    return { totalInvestment, totalReturns, finalValue };
  };
  
  const onSubmit = (values: SipFormValues) => {
    const results = calculateSIP(values);
    
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
      title: "SIP Calculated Successfully",
      description: `Monthly investment of ₹${values.monthlyInvestment} calculated for ${values.timePeriod} years.`,
    });
  };
  
  const addNewCalculation = () => {
    form.reset(defaultValues);
    setEstimatedReturns({
      totalInvestment: 0,
      totalReturns: 0,
      finalValue: 0,
    });
    
    toast({
      title: "New Calculation Started",
      description: "Default values have been set. You can now adjust and calculate a new SIP.",
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
        <title>SIP Calculator - Calculate Investment Returns | Zyfoox</title>
        <meta
          name="description"
          content="Calculate your investment returns with our free SIP (Systematic Investment Plan) calculator. Plan your investments and see potential growth over time."
        />
      </Helmet>

      <ToolHero
        title="SIP Calculator"
        description="Calculate returns on your Systematic Investment Plan (SIP) with our free calculator"
        icon={<Calculator size={28} />}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Calculate SIP Returns</h2>
          <FinanceActionButton onClick={addNewCalculation} label="New Calculation" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle>SIP Calculator</CardTitle>
              <CardDescription>
                Enter the details below to calculate your estimated returns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="monthlyInvestment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign size={16} /> Monthly Investment (₹)
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              min={100}
                              max={1000000}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                            <Slider
                              min={100}
                              max={100000}
                              step={100}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>₹100</span>
                              <span>₹100,000</span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="annualReturnRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <BarChart3 size={16} /> Expected Annual Return Rate (%)
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              min={1}
                              max={30}
                              step={0.5}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                            <Slider
                              min={1}
                              max={30}
                              step={0.5}
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
                    name="timePeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar size={16} /> Time Period (Years)
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              min={1}
                              max={40}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                            <Slider
                              min={1}
                              max={40}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1 Year</span>
                              <span>40 Years</span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">Calculate Returns</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-5 bg-muted/10">
            <CardHeader>
              <CardTitle>Estimated Returns</CardTitle>
              <CardDescription>Based on your inputs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Invested Amount</span>
                    <span className="font-medium">{formatCurrency(estimatedReturns.totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Estimated Returns</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{formatCurrency(estimatedReturns.totalReturns)}</span>
                  </div>
                  <div className="h-px bg-border my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total Value</span>
                    <span className="font-bold text-lg">{formatCurrency(estimatedReturns.finalValue)}</span>
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
                          <span>Monthly: ₹{item.values.monthlyInvestment}</span>
                          <span>Total: {formatCurrency(item.results.finalValue)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground flex justify-between mt-1">
                          <span>{item.values.timePeriod} years at {item.values.annualReturnRate}%</span>
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
