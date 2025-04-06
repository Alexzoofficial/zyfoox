
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Key, Copy, RefreshCw, AlertTriangle, Check, Lock, ShieldCheck, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PasswordGenerator() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [avoidSimilarChars, setAvoidSimilarChars] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const [memorablePassword, setMemorablePassword] = useState("");
  const [activeTab, setActiveTab] = useState("standard");

  // Character sets
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()-_=+[]{};:,.<>/?";
  const similarChars = "Il1O0";

  // Dictionary for memorable passwords
  const adjectives = [
    "happy", "brave", "clever", "mighty", "gentle", "fierce", "swift", "calm", "bright", "wise",
    "ancient", "bold", "grand", "humble", "noble", "proud", "silent", "steady", "vibrant", "zealous"
  ];
  
  const nouns = [
    "tiger", "mountain", "ocean", "eagle", "planet", "river", "forest", "diamond", "thunder", "castle",
    "kingdom", "warrior", "dragon", "garden", "captain", "phoenix", "island", "sunset", "horizon", "pioneer"
  ];

  // Generate password on component mount
  useEffect(() => {
    generatePassword();
    generateMemorablePassword();
  }, []);

  // Calculate password strength whenever password changes
  useEffect(() => {
    calculatePasswordStrength();
  }, [password]);

  // Generate standard password
  const generatePassword = () => {
    // Validate that at least one character type is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    let chars = "";
    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    // Remove similar characters if option is selected
    if (avoidSimilarChars) {
      for (const char of similarChars) {
        chars = chars.replace(char, "");
      }
    }

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    // Ensure all selected character types are included
    let passwordValid = true;
    if (includeUppercase && !/[A-Z]/.test(generatedPassword)) passwordValid = false;
    if (includeLowercase && !/[a-z]/.test(generatedPassword)) passwordValid = false;
    if (includeNumbers && !/[0-9]/.test(generatedPassword)) passwordValid = false;
    if (includeSymbols && !/[!@#$%^&*()-_=+[\]{};:,.<>/?]/.test(generatedPassword)) passwordValid = false;

    if (!passwordValid) {
      // If not all requirements are met, try again
      generatePassword();
    } else {
      setPassword(generatedPassword);
      setPasswordHistory(prev => [generatedPassword, ...prev.slice(0, 9)]);
    }
  };

  // Generate memorable password
  const generateMemorablePassword = () => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    
    const newMemorablePassword = `${randomAdjective}${randomNoun}${randomNumber}`;
    setMemorablePassword(newMemorablePassword);
  };

  // Calculate password strength
  const calculatePasswordStrength = () => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    // Base score starts at 0
    let strength = 0;

    // Length bonus (up to 40 points for 20+ characters)
    strength += Math.min(password.length * 2, 40);

    // Character type bonuses (up to 60 points)
    if (/[A-Z]/.test(password)) strength += 15; // Uppercase
    if (/[a-z]/.test(password)) strength += 15; // Lowercase
    if (/[0-9]/.test(password)) strength += 15; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 15; // Symbols

    // Penalize for patterns
    if (/(.)\1\1/.test(password)) strength -= 10; // Repeated characters
    if (/^[A-Za-z]+$/.test(password)) strength -= 10; // Letters only
    if (/^[0-9]+$/.test(password)) strength -= 10; // Numbers only
    
    // Ensure strength is between 0 and 100
    strength = Math.max(0, Math.min(strength, 100));
    setPasswordStrength(strength);
  };

  const getStrengthLabel = () => {
    if (passwordStrength >= 80) return { label: "Very Strong", color: "text-green-500", icon: <ShieldCheck className="text-green-500" /> };
    if (passwordStrength >= 60) return { label: "Strong", color: "text-blue-500", icon: <CheckCircle2 className="text-blue-500" /> };
    if (passwordStrength >= 40) return { label: "Medium", color: "text-yellow-500", icon: <Check className="text-yellow-500" /> };
    if (passwordStrength >= 20) return { label: "Weak", color: "text-orange-500", icon: <AlertTriangle className="text-orange-500" /> };
    return { label: "Very Weak", color: "text-red-500", icon: <ShieldAlert className="text-red-500" /> };
  };

  const getStrengthProgressColor = () => {
    if (passwordStrength >= 80) return "bg-green-500";
    if (passwordStrength >= 60) return "bg-blue-500";
    if (passwordStrength >= 40) return "bg-yellow-500";
    if (passwordStrength >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Your generated password has been copied to the clipboard."
    });
  };

  const selectHistoryPassword = (historicalPassword: string) => {
    setPassword(historicalPassword);
  };

  return (
    <>
      <Helmet>
        <title>Password Generator | Create Strong, Secure Passwords</title>
        <meta name="description" content="Generate strong, secure passwords with customizable length and character types. Create memorable passwords or complex combinations for maximum security." />
        <meta name="keywords" content="password generator, secure password, strong password, random password generator, password security, password tool, password creator" />
      </Helmet>

      <ToolHero
        title="Password Generator"
        description="Create strong, secure passwords with customizable options for maximum protection."
        icon={<Key size={32} />}
      />

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <Tabs defaultValue="standard" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="standard">Standard Password</TabsTrigger>
                    <TabsTrigger value="memorable">Memorable Password</TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="standard">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Input 
                          value={password} 
                          readOnly 
                          className="flex-grow font-mono text-xl" 
                        />
                        <Button 
                          onClick={() => copyToClipboard(password)}
                          variant="outline" 
                          size="icon"
                        >
                          <Copy size={18} />
                        </Button>
                        <Button 
                          onClick={generatePassword}
                          variant="outline" 
                          size="icon"
                        >
                          <RefreshCw size={18} />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Password Length: {passwordLength}</Label>
                          <span className={getStrengthLabel().color + " flex items-center gap-1 text-sm font-medium"}>
                            {getStrengthLabel().icon}
                            {getStrengthLabel().label}
                          </span>
                        </div>
                        <Slider
                          value={[passwordLength]}
                          min={4}
                          max={32}
                          step={1}
                          onValueChange={(value) => setPasswordLength(value[0])}
                        />
                        <Progress value={passwordStrength} className={getStrengthProgressColor()} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="includeUppercase" 
                            checked={includeUppercase} 
                            onCheckedChange={(checked) => setIncludeUppercase(!!checked)} 
                          />
                          <div className="space-y-1">
                            <Label htmlFor="includeUppercase">Include Uppercase Letters</Label>
                            <p className="text-sm text-muted-foreground">A-Z</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="includeLowercase" 
                            checked={includeLowercase} 
                            onCheckedChange={(checked) => setIncludeLowercase(!!checked)} 
                          />
                          <div className="space-y-1">
                            <Label htmlFor="includeLowercase">Include Lowercase Letters</Label>
                            <p className="text-sm text-muted-foreground">a-z</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="includeNumbers" 
                            checked={includeNumbers} 
                            onCheckedChange={(checked) => setIncludeNumbers(!!checked)} 
                          />
                          <div className="space-y-1">
                            <Label htmlFor="includeNumbers">Include Numbers</Label>
                            <p className="text-sm text-muted-foreground">0-9</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="includeSymbols" 
                            checked={includeSymbols} 
                            onCheckedChange={(checked) => setIncludeSymbols(!!checked)} 
                          />
                          <div className="space-y-1">
                            <Label htmlFor="includeSymbols">Include Symbols</Label>
                            <p className="text-sm text-muted-foreground">!@#$%^&*()</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2 md:col-span-2">
                          <Checkbox 
                            id="avoidSimilarChars" 
                            checked={avoidSimilarChars} 
                            onCheckedChange={(checked) => setAvoidSimilarChars(!!checked)} 
                          />
                          <div className="space-y-1">
                            <Label htmlFor="avoidSimilarChars">Avoid Similar Characters</Label>
                            <p className="text-sm text-muted-foreground">Exclude easily confused characters like I, l, 1, O, 0</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={generatePassword}>
                        Generate New Password
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="memorable">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Input 
                          value={memorablePassword} 
                          readOnly 
                          className="flex-grow font-mono text-xl" 
                        />
                        <Button 
                          onClick={() => copyToClipboard(memorablePassword)}
                          variant="outline" 
                          size="icon"
                        >
                          <Copy size={18} />
                        </Button>
                        <Button 
                          onClick={generateMemorablePassword}
                          variant="outline" 
                          size="icon"
                        >
                          <RefreshCw size={18} />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">About Memorable Passwords</h3>
                          <p className="text-muted-foreground">
                            Memorable passwords combine an adjective, a noun, and a number to create 
                            passwords that are easy to remember but still provide reasonable security.
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-yellow-500">
                          <AlertTriangle size={18} />
                          <p className="text-sm">
                            While memorable passwords are easier to remember, they are also easier to crack 
                            than complex random passwords. Use them for lower-security accounts.
                          </p>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={generateMemorablePassword}>
                        Generate New Memorable Password
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lock size={18} />
                  Password History
                </h3>
                
                {passwordHistory.length > 0 ? (
                  <ul className="space-y-3">
                    {passwordHistory.map((historyItem, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="font-mono text-sm truncate mr-2">{historyItem}</span>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => selectHistoryPassword(historyItem)}
                          >
                            Use
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => copyToClipboard(historyItem)}
                          >
                            <Copy size={14} />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Generated passwords will appear here
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 space-y-8 animate-fade-in animate-delay-200">
          <h2 className="text-3xl font-bold">Password Security Guide</h2>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Why Password Security Matters</h3>
            <p>
              In our increasingly digital world, strong passwords are your first line of defense against unauthorized access to your accounts and personal information. Weak passwords are one of the primary reasons for security breaches, with cybercriminals using sophisticated tools to crack predictable combinations or simply guessing common passwords.
            </p>
            
            <p>
              A strong password is vital because:
            </p>
            
            <ul>
              <li>It protects your personal and financial information from theft</li>
              <li>It prevents unauthorized access to your social media, email, and other accounts</li>
              <li>It helps safeguard your digital identity</li>
              <li>It reduces the risk of becoming a victim of cybercrime</li>
            </ul>
            
            <h3>Characteristics of a Strong Password</h3>
            <p>
              A secure password should:
            </p>
            
            <ul>
              <li><strong>Be Long</strong> - Passwords should be at least 12 characters, with 16 or more being ideal. Length is one of the most critical factors in password strength.</li>
              <li><strong>Be Complex</strong> - Include a mix of uppercase letters, lowercase letters, numbers, and special characters.</li>
              <li><strong>Be Unique</strong> - Use different passwords for different accounts, especially for sensitive ones like banking and email.</li>
              <li><strong>Be Random</strong> - Avoid using personal information, sequential numbers, or dictionary words.</li>
              <li><strong>Be Private</strong> - Never share your passwords with others, and be cautious of phishing attempts trying to trick you into revealing them.</li>
            </ul>
            
            <h3>Common Password Mistakes to Avoid</h3>
            <p>
              Many people make these critical password errors:
            </p>
            
            <ul>
              <li><strong>Using Personal Information</strong> - Names, birthdays, or addresses are easy to guess or find on social media.</li>
              <li><strong>Simple Word + Number Combinations</strong> - Like "password123" or "admin2024" are among the first combinations attackers try.</li>
              <li><strong>Keyboard Patterns</strong> - Such as "qwerty" or "12345" are extremely vulnerable.</li>
              <li><strong>Password Reuse</strong> - Using the same password across multiple sites means that if one site is compromised, all your accounts are at risk.</li>
              <li><strong>Infrequent Updates</strong> - Keeping the same password for years increases vulnerability.</li>
              <li><strong>Writing Passwords Down</strong> - Especially in easily accessible places like sticky notes on monitors.</li>
            </ul>
            
            <h3>Password Strength: What It Means and How It's Measured</h3>
            <p>
              Password strength is a measure of how effective a password is at resisting guessing and brute-force attacks. Our password strength meter evaluates several factors:
            </p>
            
            <ul>
              <li><strong>Length</strong> - Longer passwords are exponentially more difficult to crack.</li>
              <li><strong>Complexity</strong> - The use of various character types increases entropy (randomness).</li>
              <li><strong>Uniqueness</strong> - Avoiding common patterns and dictionary words.</li>
              <li><strong>Unpredictability</strong> - True randomness versus patterns that might be guessable.</li>
            </ul>
            
            <p>
              A very strong password might take hundreds of years to crack using current technology, while a weak one might be broken in seconds.
            </p>
            
            <h3>Password Managers: The Modern Solution</h3>
            <p>
              With the increasing number of online accounts we all manage, remembering unique, complex passwords for each one is nearly impossible without help. This is where password managers come in:
            </p>
            
            <ul>
              <li><strong>Single Master Password</strong> - You only need to remember one strong master password to access all your other passwords.</li>
              <li><strong>Random Generation</strong> - Password managers can create highly secure random passwords for each site.</li>
              <li><strong>Auto-Fill</strong> - They can automatically fill in login forms, making complex passwords more convenient.</li>
              <li><strong>Cross-Platform Sync</strong> - Access your passwords across all your devices.</li>
              <li><strong>Security Alerts</strong> - Many password managers alert you when a website you use has been breached.</li>
            </ul>
            
            <p>
              Popular password managers include 1Password, LastPass, Bitwarden, and Dashlane. Most browsers also offer built-in password management, though dedicated services typically provide more features and better security.
            </p>
            
            <h3>Two-Factor Authentication: Beyond Passwords</h3>
            <p>
              For truly secure accounts, passwords should be just one layer of protection. Two-factor authentication (2FA) adds a second verification step after your password, such as:
            </p>
            
            <ul>
              <li><strong>Text Message Codes</strong> - A one-time code sent to your phone</li>
              <li><strong>Authentication Apps</strong> - Apps like Google Authenticator or Authy that generate time-based codes</li>
              <li><strong>Security Keys</strong> - Physical devices you connect to your computer or phone</li>
              <li><strong>Biometrics</strong> - Fingerprints, facial recognition, or other unique physical characteristics</li>
            </ul>
            
            <p>
              Even if someone discovers your password, they can't access your account without the second factor, dramatically increasing your security.
            </p>
            
            <h3>Specific Password Strategies for Different Account Types</h3>
            <p>
              Different types of accounts warrant different levels of password security:
            </p>
            
            <h4>Critical Accounts</h4>
            <p>
              For email, financial, and primary social media accounts:
            </p>
            <ul>
              <li>Use maximum-length, completely random passwords (20+ characters if allowed)</li>
              <li>Always enable two-factor authentication</li>
              <li>Change passwords every 3-6 months</li>
              <li>Never reuse these passwords anywhere else</li>
            </ul>
            
            <h4>Standard Accounts</h4>
            <p>
              For regular online services and shopping sites:
            </p>
            <ul>
              <li>Use strong random passwords (16+ characters)</li>
              <li>Enable two-factor authentication when available</li>
              <li>Use unique passwords for each site</li>
            </ul>
            
            <h4>Low-Priority Accounts</h4>
            <p>
              For accounts with minimal personal information:
            </p>
            <ul>
              <li>Use memorable but still reasonably strong passwords (12+ characters)</li>
              <li>Consider using a password system where you modify a base password for different sites</li>
            </ul>
            
            <h3>What to Do After a Data Breach</h3>
            <p>
              If a service you use experiences a data breach:
            </p>
            
            <ol>
              <li><strong>Change Your Password Immediately</strong> - Create a new, strong password for the affected account.</li>
              <li><strong>Check Other Accounts</strong> - If you've used the same password elsewhere, change those too.</li>
              <li><strong>Monitor for Suspicious Activity</strong> - Check account statements and activity logs for signs of unauthorized access.</li>
              <li><strong>Enable Two-Factor Authentication</strong> - Add this extra layer of security if you haven't already.</li>
              <li><strong>Consider Credit Monitoring</strong> - For breaches involving financial information, watch your credit reports closely.</li>
            </ol>
            
            <h3>The Future of Authentication</h3>
            <p>
              While passwords remain the primary authentication method, the security industry is working toward more secure and convenient alternatives:
            </p>
            
            <ul>
              <li><strong>Passwordless Login</strong> - Using email links, SMS codes, or app notifications instead of passwords</li>
              <li><strong>Advanced Biometrics</strong> - Including behavioral biometrics that analyze how you type, hold your phone, or interact with devices</li>
              <li><strong>Hardware Tokens</strong> - Physical devices that authenticate you automatically when in proximity to your devices</li>
              <li><strong>Zero-Trust Architecture</strong> - Systems that verify every access request regardless of source</li>
            </ul>
            
            <h3>Conclusion: Taking Responsibility for Your Digital Security</h3>
            <p>
              In the digital age, the security of your online accounts is largely in your hands. By using strong, unique passwords for each service, employing a password manager, and enabling two-factor authentication whenever possible, you can dramatically reduce your risk of becoming a victim of cybercrime.
            </p>
            
            <p>
              Our password generator tool helps you create strong, secure passwords that form the foundation of your digital security strategy. Remember that even the strongest password is just one component of your overall security posture, and staying informed about evolving threats and best practices is essential.
            </p>
            
            <p>
              Take the time to audit your existing passwords, replace weak ones with stronger alternatives, and implement a sustainable system for managing your digital keys. Your future self will thank you for the protection you put in place today.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
