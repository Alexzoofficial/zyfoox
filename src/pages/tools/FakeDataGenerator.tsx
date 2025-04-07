import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface PersonAddress {
  street: string;
  city: string;
  state: string;
  stateAbbr: string;
  zipCode: number;
}

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  address?: PersonAddress;
}

export default function FakeDataGenerator() {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(5);
  const [dataType, setDataType] = useState("all");
  const [includeEmail, setIncludeEmail] = useState(true);
  const [includePhone, setIncludePhone] = useState(true);
  const [includeAddress, setIncludeAddress] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [format, setFormat] = useState("json");

  const firstNames = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "James", "Isabella", "Benjamin", 
    "Mia", "Lucas", "Charlotte", "Mason", "Amelia", "Ethan", "Harper", "Alexander", "Evelyn", "Henry",
    "Abigail", "Michael", "Emily", "Daniel", "Elizabeth", "Matthew", "Sofia", "Joseph", "Madison", "David",
    "Avery", "Jackson", "Ella", "Samuel", "Scarlett", "Sebastian", "Grace", "Andrew", "Chloe", "Logan",
    "Victoria", "Gabriel", "Riley", "Anthony", "Aria", "Jacob", "Lily", "Wyatt", "Aubrey", "Carter"
  ];
  
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", 
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
  ];
  
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "protonmail.com", "mail.com", "zoho.com", "yandex.com"];
  
  const streetNames = [
    "Main Street", "Oak Avenue", "Maple Drive", "Cedar Lane", "Pine Street", "Elm Road", "Washington Avenue", "Park Place", "Lake View Drive", "Sunset Boulevard",
    "Highland Avenue", "River Road", "Forest Drive", "Mountain View Road", "Meadow Lane", "Valley Road", "Spring Street", "Willow Lane", "Chestnut Street", "Cherry Lane",
    "Broadway", "3rd Street", "5th Avenue", "Church Street", "School Street", "Front Street", "State Street", "High Street", "Center Street", "Park Avenue"
  ];
  
  const cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Boston",
    "Nashville", "Portland", "Oklahoma City", "Las Vegas", "Detroit", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque"
  ];
  
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey"
  ];
  
  const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ"
  ];

  const generateRandomData = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        let generatedData: Person[] = [];
        
        for (let i = 0; i < quantity; i++) {
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
          const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`;
          const phoneNumber = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
          const streetNumber = Math.floor(Math.random() * 10000) + 1;
          const street = streetNames[Math.floor(Math.random() * streetNames.length)];
          const city = cities[Math.floor(Math.random() * cities.length)];
          const stateIndex = Math.floor(Math.random() * states.length);
          const state = states[stateIndex];
          const stateAbbr = stateAbbreviations[stateIndex];
          const zipCode = Math.floor(Math.random() * 90000) + 10000;
          
          let person: Person = { id: i + 1, firstName, lastName };
          
          if (dataType === "all" || dataType === "email") {
            if (includeEmail) {
              person.email = email;
            }
          }
          
          if (dataType === "all" || dataType === "phone") {
            if (includePhone) {
              person.phoneNumber = phoneNumber;
            }
          }
          
          if (dataType === "all" || dataType === "address") {
            if (includeAddress) {
              person.address = {
                street: `${streetNumber} ${street}`,
                city,
                state,
                stateAbbr,
                zipCode
              };
            }
          }
          
          generatedData.push(person);
        }
        
        if (format === "json") {
          setResult(JSON.stringify(generatedData, null, 2));
        } else if (format === "csv") {
          let csvContent = [];
          const headers = ["id", "firstName", "lastName"];
          
          if (includeEmail && (dataType === "all" || dataType === "email")) {
            headers.push("email");
          }
          
          if (includePhone && (dataType === "all" || dataType === "phone")) {
            headers.push("phoneNumber");
          }
          
          if (includeAddress && (dataType === "all" || dataType === "address")) {
            headers.push("street", "city", "state", "stateAbbr", "zipCode");
          }
          
          csvContent.push(headers.join(","));
          
          generatedData.forEach(person => {
            let row = [person.id, person.firstName, person.lastName];
            
            if (includeEmail && (dataType === "all" || dataType === "email")) {
              row.push(person.email || "");
            }
            
            if (includePhone && (dataType === "all" || dataType === "phone")) {
              row.push(person.phoneNumber || "");
            }
            
            if (includeAddress && (dataType === "all" || dataType === "address")) {
              row.push(
                person.address ? person.address.street : "",
                person.address ? person.address.city : "",
                person.address ? person.address.state : "",
                person.address ? person.address.stateAbbr : "",
                person.address ? person.address.zipCode : ""
              );
            }
            
            csvContent.push(row.join(","));
          });
          
          setResult(csvContent.join("\n"));
        }
        
        toast({
          title: "Data Generated Successfully",
          description: `${quantity} fake data records created.`
        });
      } catch (error) {
        toast({
          title: "Error Generating Data",
          description: "There was an error generating fake data. Please try again.",
          variant: "destructive"
        });
        console.error("Error generating fake data:", error);
      } finally {
        setIsGenerating(false);
      }
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to Clipboard",
      description: "The generated data has been copied to your clipboard."
    });
  };

  return (
    <>
      <Helmet>
        <title>Fake Data Generator | Generate Names, Emails, Addresses & Phone Numbers</title>
        <meta name="description" content="Generate realistic fake data including names, emails, phone numbers, and addresses for testing purposes. Perfect for developers, testers, and UI/UX designers." />
        <meta name="keywords" content="fake data generator, test data generator, random data generator, mock data, dummy data, sample data, random name generator, fake email generator, fake address generator" />
      </Helmet>

      <ToolHero
        title="Fake Data Generator"
        description="Generate realistic fake data including names, emails, addresses, and phone numbers for testing purposes."
        icon={<Database size={32} />}
      />
      
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Generate Realistic Fake Data</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="quantity">Number of Records</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="1" 
                  max="100" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="mt-1" 
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Generate up to 100 records at once
                </p>
              </div>
              
              <div>
                <Label>Data Type</Label>
                <Select 
                  value={dataType}
                  onValueChange={setDataType}
                >
                  <option value="all">All Data Types</option>
                  <option value="email">Email Only</option>
                  <option value="phone">Phone Only</option>
                  <option value="address">Address Only</option>
                </Select>
              </div>
              
              <div>
                <Label>Output Format</Label>
                <Select
                  value={format}
                  onValueChange={setFormat}
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </Select>
              </div>
              
              <div>
                <Label>Include Fields</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeEmail" 
                      checked={includeEmail} 
                      onCheckedChange={(checked) => setIncludeEmail(!!checked)} 
                    />
                    <label htmlFor="includeEmail" className="text-sm">
                      Include Email
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includePhone" 
                      checked={includePhone} 
                      onCheckedChange={(checked) => setIncludePhone(!!checked)} 
                    />
                    <label htmlFor="includePhone" className="text-sm">
                      Include Phone Number
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeAddress" 
                      checked={includeAddress} 
                      onCheckedChange={(checked) => setIncludeAddress(!!checked)} 
                    />
                    <label htmlFor="includeAddress" className="text-sm">
                      Include Address
                    </label>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={generateRandomData}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Fake Data"}
              </Button>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6 animate-fade-in animate-delay-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Generated Data</h2>
              {result && (
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  Copy to Clipboard
                </Button>
              )}
            </div>
            
            <Textarea 
              className="h-[400px] font-mono text-sm"
              value={result}
              readOnly
              placeholder="Generated data will appear here..."
            />
          </div>
        </div>
        
        <div className="mt-16 space-y-8 animate-fade-in animate-delay-200">
          <h2 className="text-3xl font-bold">Understanding Fake Data Generation</h2>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>What is Fake Data Generation?</h3>
            <p>
              Fake data generation is the process of creating synthetic, realistic-looking data that mimics the structure and characteristics of real-world data without containing any actual personal or sensitive information. This synthetic data can include names, addresses, phone numbers, email addresses, dates, and other types of information commonly found in databases and applications.
            </p>
            
            <h3>Why Use a Fake Data Generator?</h3>
            <p>
              There are numerous reasons why developers, testers, designers, and other professionals need fake data:
            </p>
            
            <ul>
              <li><strong>Application Testing</strong> - When developing and testing applications, you need realistic data to fill forms, databases, and API requests, but using real customer data raises privacy concerns.</li>
              <li><strong>User Interface Design</strong> - Designers need placeholder content to create mockups and prototypes that look realistic.</li>
              <li><strong>Training and Education</strong> - Teaching database concepts, data analysis, and programming often requires sample datasets.</li>
              <li><strong>Database Performance Testing</strong> - Evaluating how databases handle large volumes of data requires generating thousands or millions of records.</li>
              <li><strong>Demo Environments</strong> - Creating demonstrations of software for clients or stakeholders requires realistic data without exposing sensitive information.</li>
              <li><strong>Documentation</strong> - Technical writers need example data to illustrate how features and functions work.</li>
            </ul>
            
            <h3>Benefits of Using Our Fake Data Generator</h3>
            <p>
              Our fake data generator tool offers several advantages:
            </p>
            
            <ul>
              <li><strong>Privacy Compliance</strong> - Generate data that resembles real information without violating privacy regulations like GDPR, CCPA, or HIPAA.</li>
              <li><strong>Customization</strong> - Choose exactly what types of data you need (names, emails, addresses, phone numbers) and how many records to generate.</li>
              <li><strong>Data Consistency</strong> - Generated data maintains internal consistency (e.g., zip codes match cities and states).</li>
              <li><strong>Multiple Export Formats</strong> - Download your generated data in JSON or CSV formats to suit your workflow.</li>
              <li><strong>Instant Generation</strong> - Create hundreds of records in seconds without manual entry.</li>
              <li><strong>Realistic Values</strong> - Our algorithms create believable, naturally distributed data rather than obviously fake information.</li>
            </ul>
            
            <h3>Types of Fake Data Our Generator Provides</h3>
            
            <h4>Personal Information</h4>
            <p>
              We generate realistic personal information including first names, last names, and full names drawn from common name distributions. This makes your test data look authentic rather than obviously fake.
            </p>
            
            <h4>Contact Information</h4>
            <p>
              Our generator creates believable email addresses that follow common patterns (firstname.lastname@domain.com) as well as realistic phone numbers that follow proper formatting rules for U.S. and international formats.
            </p>
            
            <h4>Address Information</h4>
            <p>
              We provide complete address details including street addresses, cities, states (with proper abbreviations), and ZIP codes that follow realistic patterns and maintain geographical consistency.
            </p>
            
            <h3>How to Use the Fake Data Generator</h3>
            <p>
              Using our fake data generator is straightforward:
            </p>
            
            <ol>
              <li><strong>Specify Quantity</strong> - Choose how many records you want to generate (from 1 to 100).</li>
              <li><strong>Select Data Types</strong> - Choose whether you want to generate all data types or focus on specific categories like emails, phone numbers, or addresses.</li>
              <li><strong>Choose Output Format</strong> - Select JSON format for programmatic usage or CSV format for spreadsheet applications.</li>
              <li><strong>Customize Fields</strong> - Fine-tune exactly which fields to include in your generated data.</li>
              <li><strong>Generate Data</strong> - Click the "Generate Fake Data" button to create your synthetic dataset.</li>
              <li><strong>Use the Results</strong> - Copy the generated data directly to your clipboard or view it in the output area.</li>
            </ol>
            
            <h3>Data Security and Privacy</h3>
            <p>
              Our fake data generator creates all information locally in your browser. No data is transmitted to our servers, ensuring complete privacy and security. The generated data resembles real information but is entirely synthetic - no actual personal information is used or exposed at any point in the process.
            </p>
            
            <h3>Common Use Cases for Fake Data</h3>
            
            <h4>Software Development</h4>
            <p>
              Developers use fake data for unit testing, integration testing, and user interface development. Having realistic test data helps identify edge cases and ensures applications handle various data formats correctly.
            </p>
            
            <h4>Database Design and Testing</h4>
            <p>
              When designing and optimizing databases, it's essential to understand how they'll perform with realistic data volumes and distributions. Our generator helps create test datasets that match expected production characteristics.
            </p>
            
            <h4>UI/UX Design</h4>
            <p>
              User interface designers need realistic content to create mockups and prototypes. Placeholder text like "Lorem ipsum" is useful for paragraphs, but for user profiles, product listings, and other structured content, our fake data generator provides more appropriate sample content.
            </p>
            
            <h4>Training and Tutorials</h4>
            <p>
              When creating educational materials about data processing, database management, or programming, instructors need example datasets that illustrate concepts without using sensitive information.
            </p>
            
            <h3>Best Practices for Using Fake Data</h3>
            
            <ul>
              <li><strong>Match Your Schema</strong> - Generate fake data that matches the structure and constraints of your actual database schema or application data model.</li>
              <li><strong>Consider Edge Cases</strong> - Include some edge cases in your generated data, such as very long names or special characters, to test how your application handles them.</li>
              <li><strong>Generate Sufficient Volume</strong> - For performance testing, generate enough data to simulate production-like conditions.</li>
              <li><strong>Maintain Referential Integrity</strong> - If generating related datasets, ensure that references between them are maintained correctly.</li>
              <li><strong>Document Test Data</strong> - Keep records of the fake data used in testing to help reproduce issues and track results.</li>
            </ul>
            
            <h3>Conclusion</h3>
            <p>
              Our Fake Data Generator provides a simple yet powerful solution for creating realistic synthetic data for development, testing, education, and demonstration purposes. By using generated fake data instead of real personal information, you can maintain privacy compliance while still working with data that accurately represents real-world scenarios.
            </p>
            <p>
              Whether you're a developer, tester, designer, educator, or data professional, our tool helps you quickly generate the fake data you need in the format you require, all while maintaining the highest standards of privacy and security.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
