
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Calculator, DollarSign, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceActionButton } from "@/components/finance/FinanceActionButton";
import { useToast } from "@/hooks/use-toast";

interface GstFormValues {
  amount: number;
  gstRate: "5" | "12" | "18" | "28" | "custom";
  customRate?: number;
  calculationType: "exclusive" | "inclusive";
}

const defaultValues: GstFormValues = {
  amount: 1000,
  gstRate: "18",
  customRate: 18,
  calculationType: "exclusive"
};

export default function GstCalculator() {
  const [gstDetails, setGstDetails] = useState<{
    originalAmount: number;
    gstAmount: number;
    totalAmount: number;
  }>({
    originalAmount: 0,
    gstAmount: 0,
    totalAmount: 0,
  });
  
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    values: GstFormValues;
    results: typeof gstDetails;
    timestamp: Date;
  }>>([]);
  
  const { toast } = useToast();
  
  const form = useForm<GstFormValues>({
    defaultValues
  });
  
  const watchGstRate = form.watch("gstRate");
  const watchCalculationType = form.watch("calculationType");
  
  const calculateGST = (values: GstFormValues) => {
    const amount = values.amount;
    const rate = values.gstRate === "custom" ? values.customRate! : Number(values.gstRate);
    let originalAmount = 0;
    let gstAmount = 0;
    let totalAmount = 0;
    
    if (values.calculationType === "exclusive") {
      // GST is added to the amount
      originalAmount = amount;
      gstAmount = (amount * rate) / 100;
      totalAmount = amount + gstAmount;
    } else {
      // GST is included in the amount
      originalAmount = (amount * 100) / (100 + rate);
      gstAmount = amount - originalAmount;
      totalAmount = amount;
    }
    
    setGstDetails({
      originalAmount,
      gstAmount,
      totalAmount,
    });
    
    return { originalAmount, gstAmount, totalAmount };
  };
  
  const onSubmit = (values: GstFormValues) => {
    const results = calculateGST(values);
    
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
      title: "GST Calculated Successfully",
      description: `GST calculation complete using ${values.calculationType === "exclusive" ? "exclusive" : "inclusive"} method.`,
    });
  };
  
  const addNewCalculation = () => {
    form.reset(defaultValues);
    setGstDetails({
      originalAmount: 0,
      gstAmount: 0,
      totalAmount: 0,
    });
    
    toast({
      title: "New Calculation Started",
      description: "Default values have been set. You can now adjust and calculate GST.",
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <>
      <Helmet>
        <title>GST Calculator - Calculate Goods and Services Tax | Zyfoox</title>
        <meta
          name="description"
          content="Calculate GST (Goods and Services Tax) with our free calculator. Easily calculate inclusive or exclusive GST for any amount with different tax rates."
        />
      </Helmet>

      <ToolHero
        title="GST Calculator"
        description="Calculate Goods and Services Tax (GST) for any amount with different tax slabs"
        icon={<Calculator size={28} />}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Calculate GST</h2>
          <FinanceActionButton onClick={addNewCalculation} label="New Calculation" />
        </div>
        
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="history">Calculation History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <Card className="lg:col-span-7">
                <CardHeader>
                  <CardTitle>GST Calculator</CardTitle>
                  <CardDescription>
                    Enter the details below to calculate GST (Goods and Services Tax)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="calculationType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Calculation Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="exclusive" id="exclusive" />
                                  <Label htmlFor="exclusive">
                                    Add GST to amount (Exclusive)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="inclusive" id="inclusive" />
                                  <Label htmlFor="inclusive">
                                    Extract GST from amount (Inclusive)
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <DollarSign size={16} /> 
                              {watchCalculationType === "exclusive" 
                                ? "Original Amount (₹)" 
                                : "Amount Including GST (₹)"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gstRate"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="flex items-center gap-2">
                              <Percent size={16} /> GST Rate
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                              >
                                <div className="flex items-center space-x-2 justify-center border rounded-md py-2 px-4 hover:bg-muted/50 cursor-pointer">
                                  <RadioGroupItem value="5" id="r5" className="sr-only" />
                                  <Label htmlFor="r5" className="cursor-pointer font-medium">5%</Label>
                                </div>
                                <div className="flex items-center space-x-2 justify-center border rounded-md py-2 px-4 hover:bg-muted/50 cursor-pointer">
                                  <RadioGroupItem value="12" id="r12" className="sr-only" />
                                  <Label htmlFor="r12" className="cursor-pointer font-medium">12%</Label>
                                </div>
                                <div className="flex items-center space-x-2 justify-center border rounded-md py-2 px-4 hover:bg-muted/50 cursor-pointer">
                                  <RadioGroupItem value="18" id="r18" className="sr-only" />
                                  <Label htmlFor="r18" className="cursor-pointer font-medium">18%</Label>
                                </div>
                                <div className="flex items-center space-x-2 justify-center border rounded-md py-2 px-4 hover:bg-muted/50 cursor-pointer">
                                  <RadioGroupItem value="28" id="r28" className="sr-only" />
                                  <Label htmlFor="r28" className="cursor-pointer font-medium">28%</Label>
                                </div>
                                <div className="flex items-center space-x-2 justify-center border rounded-md py-2 px-4 hover:bg-muted/50 cursor-pointer">
                                  <RadioGroupItem value="custom" id="rcustom" className="sr-only" />
                                  <Label htmlFor="rcustom" className="cursor-pointer font-medium">Custom</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      {watchGstRate === "custom" && (
                        <FormField
                          control={form.control}
                          name="customRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Custom GST Rate (%)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  max={100}
                                  step={0.1}
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}

                      <Button type="submit" className="w-full">Calculate GST</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="lg:col-span-5 bg-muted/10">
                <CardHeader>
                  <CardTitle>GST Breakdown</CardTitle>
                  <CardDescription>Based on your inputs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          {watchCalculationType === "exclusive"
                            ? "Original Amount"
                            : "Amount without GST"}
                        </span>
                        <span className="font-medium">{formatCurrency(gstDetails.originalAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">GST Amount</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">{formatCurrency(gstDetails.gstAmount)}</span>
                      </div>
                      <div className="h-px bg-border my-3"></div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Total Amount</span>
                        <span className="font-bold text-lg">{formatCurrency(gstDetails.totalAmount)}</span>
                      </div>
                      
                      {gstDetails.originalAmount > 0 && (
                        <div className="mt-4 p-3 bg-card rounded-lg">
                          <p className="text-sm">
                            GST Rate: <span className="font-medium">
                              {watchGstRate === "custom" ? form.getValues().customRate : watchGstRate}%
                            </span>
                          </p>
                          <p className="text-sm mt-1">
                            Calculation Method: <span className="font-medium">
                              {watchCalculationType === "exclusive" ? "Exclusive (Add GST)" : "Inclusive (Extract GST)"}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Calculation History</CardTitle>
                <CardDescription>
                  Your recent GST calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {calculationHistory.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No calculations yet. Make your first calculation to see it here.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {calculationHistory.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="font-medium">
                              {item.values.calculationType === "exclusive"
                                ? "Original Amount:"
                                : "Amount with GST:"}
                            </span> {formatCurrency(item.values.amount)}
                          </div>
                          <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                            GST: {item.values.gstRate === "custom" 
                              ? item.values.customRate 
                              : item.values.gstRate}%
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount without GST:</span>
                            <p className="font-medium">{formatCurrency(item.results.originalAmount)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">GST Amount:</span>
                            <p className="font-medium">{formatCurrency(item.results.gstAmount)}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Total Amount:</span>
                            <p className="font-medium">{formatCurrency(item.results.totalAmount)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
