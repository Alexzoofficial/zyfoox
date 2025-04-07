import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolHero from "@/components/tools/ToolHero";
import { Text, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Font styles for name customization
const fontStyles = [
  { name: "𝓢𝓬𝓻𝓲𝓹𝓽", charMap: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", styledMap: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃" },
  { name: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯", charMap: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", styledMap: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷" },
  { name: "𝕮𝖔𝖓𝖙𝖔𝖚𝖗", charMap: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", styledMap: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟" },
  { name: "𝔻𝕠𝕦𝕓𝕝𝕖", charMap: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", styledMap: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫" },
  { name: "𝐁𝐨𝐥𝐝", charMap: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", styledMap: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳" },
  { name: "𝑰𝒕𝒂𝒍𝒊𝒄", charMap: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", styledMap: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧" },
  { name: "🆂🆀🆄🅰🆁🅴🆂", charMap: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", styledMap: "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉" },
  { name: "Ⓒⓘⓡⓒⓛⓔⓢ", charMap: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", styledMap: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ" }
];

// Symbol sets for decorations
const symbolSets = [
  { name: "Stars", prefix: "★彡 ", suffix: " 彡★" },
  { name: "Hearts", prefix: "♥♡ ", suffix: " ♡♥" },
  { name: "Flowers", prefix: "✿ ", suffix: " ✿" },
  { name: "Sparkles", prefix: "✨ ", suffix: " ✨" },
  { name: "Arrows", prefix: "⇒ ", suffix: " ⇐" },
  { name: "Music", prefix: "♪ ", suffix: " ♫" },
  { name: "Diamonds", prefix: "♦ ", suffix: " ♦" },
  { name: "Lightning", prefix: "⚡ ", suffix: " ⚡" },
  { name: "Magic", prefix: "•*¨*•.¸¸♪ ", suffix: " ♪¸¸.•*¨*•" },
  { name: "Simple", prefix: "『 ", suffix: " 』" },
  { name: "Crown", prefix: "👑 ", suffix: "" },
  { name: "None", prefix: "", suffix: "" }
];

export default function NameCustomizer() {
  const [name, setName] = useState<string>("");
  const [selectedFont, setSelectedFont] = useState<number>(0);
  const [selectedSymbols, setSelectedSymbols] = useState<number>(11); // "None" is default
  const [result, setResult] = useState<string>("");
  const [customizedNames, setCustomizedNames] = useState<string[]>([]);
  
  const { toast } = useToast();

  const customizeName = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name to customize",
        variant: "destructive",
      });
      return;
    }
    
    // Convert the name using the selected font style
    const fontStyle = fontStyles[selectedFont];
    let styledName = "";
    
    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      const index = fontStyle.charMap.indexOf(char);
      
      if (index !== -1) {
        // Replace with the styled character
        styledName += fontStyle.styledMap[index];
      } else {
        // Keep original character for unsupported symbols
        styledName += char;
      }
    }
    
    // Add decorative symbols
    const symbolStyle = symbolSets[selectedSymbols];
    const decoratedName = `${symbolStyle.prefix}${styledName}${symbolStyle.suffix}`;
    
    setResult(decoratedName);
    
    // Add to history (avoid duplicates)
    if (!customizedNames.includes(decoratedName)) {
      setCustomizedNames(prev => [decoratedName, ...prev].slice(0, 10)); // Keep last 10 names
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The customized name has been copied to your clipboard.",
    });
  };
  
  const generateRandom = () => {
    // Select random font and symbol set
    const randomFont = Math.floor(Math.random() * fontStyles.length);
    const randomSymbol = Math.floor(Math.random() * symbolSets.length);
    
    setSelectedFont(randomFont);
    setSelectedSymbols(randomSymbol);
    
    // If name is already entered, generate the result immediately
    if (name.trim()) {
      setTimeout(customizeName, 100); // Small delay to ensure state updates
    }
  };

  return (
    <>
      <Helmet>
        <title>Name Customizer - Create Stylish Names with Symbols | Zyfoox</title>
        <meta 
          name="description" 
          content="Create stylish, unique names with special symbols and fancy fonts for social media profiles, gaming usernames, and more. Free online name generator." 
        />
        <meta 
          name="keywords" 
          content="name customizer, fancy text generator, stylish name maker, font generator, cool text generator, username creator, social media name generator" 
        />
        <link rel="canonical" href="https://zyfoox.com/tools/name-customizer" />
      </Helmet>

      <ToolHero
        title="Name Customizer"
        description="Create stylish, unique names with special symbols and fonts for social media profiles and more."
        icon={<Text size={24} />}
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Customize Your Name</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name-input" className="block text-sm font-medium">
                    Enter Your Name or Text
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    className="glass-input w-full px-3 py-2 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Type your name or text here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={50}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Select Font Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontStyles.map((font, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`py-2 px-3 text-center rounded-lg transition-colors ${
                          selectedFont === index
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                        onClick={() => setSelectedFont(index)}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Add Decorative Symbols
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {symbolSets.map((symbols, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`py-2 px-3 text-center rounded-lg transition-colors ${
                          selectedSymbols === index
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                        onClick={() => setSelectedSymbols(index)}
                      >
                        {symbols.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={customizeName}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                  >
                    <Text size={16} className="mr-2" />
                    Customize Name
                  </button>
                  
                  <button
                    onClick={generateRandom}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors flex items-center justify-center"
                    title="Generate random style"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
              
              {result && (
                <div className="mt-6 p-4 bg-card/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Result</h3>
                    <button
                      onClick={() => copyToClipboard(result)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <div className="bg-background p-3 rounded break-all text-center">
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <div className="glass-card rounded-xl p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Recent Creations</h2>
              
              <div className="space-y-3">
                {customizedNames.length > 0 ? (
                  customizedNames.map((customName, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                      <span className="break-all">{customName}</span>
                      <button
                        onClick={() => copyToClipboard(customName)}
                        className="ml-2 p-2 text-primary hover:bg-primary/10 rounded-full transition-colors flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                    <Text size={48} className="mb-4 opacity-20" />
                    <p>Your customized names will appear here</p>
                    <p className="text-sm mt-2">Create a name to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>How to Use the Name Customizer</h2>
          <p>Our Name Customizer is a creative tool that transforms ordinary text into stylish, eye-catching names with unique fonts and decorative symbols. Perfect for social media profiles, gaming usernames, or any platform where you want to stand out, this tool gives you endless customization options to express your personality and style.</p>
          
          <h3>Simple Steps to Customize Your Name</h3>
          <ol>
            <li><strong>Enter your name or text</strong>: Type the text you want to customize in the input field. This can be your name, username, or any short text.</li>
            <li><strong>Select a font style</strong>: Choose from various fancy font styles like script, fraktur, contour, and more to transform your text.</li>
            <li><strong>Add decorative symbols</strong> (optional): Select from our collection of decorative symbol sets to add flair to your name with stars, hearts, flowers, or other symbols.</li>
            <li><strong>Click "Customize Name"</strong>: Generate your stylish name with the selected font and symbols.</li>
            <li><strong>Copy your creation</strong>: Use the copy button to easily copy your customized name to the clipboard for use on your favorite platforms.</li>
          </ol>
          
          <h3>Random Style Generator</h3>
          <p>Need inspiration or want to explore different possibilities? Click the random style button (refresh icon) to instantly apply random font and symbol combinations to your text. This feature is perfect for discovering unique styles you might not have considered.</p>
          
          <h2>Popular Uses for Customized Names</h2>
          <p>Stylish, customized names can enhance your online presence in numerous ways:</p>
          
          <h3>Social Media Profiles</h3>
          <p>Make your profiles stand out on platforms like Instagram, Twitter, TikTok, and Facebook with a uniquely styled display name. A distinctive name helps your profile get noticed in comments, mentions, and searches.</p>
          
          <h3>Gaming Usernames</h3>
          <p>Create memorable, stylish usernames for gaming platforms and communities. Many games and platforms support special characters and unicode fonts, allowing you to stand out in player lists and leaderboards.</p>
          
          <h3>Discord and Chat Applications</h3>
          <p>Enhance your presence in Discord servers, WhatsApp groups, and other chat platforms with a customized nickname that reflects your personality or role within the community.</p>
          
          <h3>Profile Bios and Descriptions</h3>
          <p>Add stylized text sections to your social media bios, "About Me" sections, or profile descriptions to highlight important information in an attention-grabbing way.</p>
          
          <h3>Digital Art and Design</h3>
          <p>Incorporate fancy text into digital artwork, signatures, watermarks, or design projects for a personalized touch without needing advanced graphic design skills.</p>
          
          <h3>Email Signatures</h3>
          <p>Create distinctive email signatures that leave a memorable impression while keeping your correspondence professional.</p>
          
          <h2>Understanding Different Font Styles</h2>
          <p>Our Name Customizer offers several distinctive font styles, each with its own character and appeal:</p>
          
          <h3>𝓢𝓬𝓻𝓲𝓹𝓽</h3>
          <p>This elegant, flowing script style evokes handwritten calligraphy. It's perfect for creating names with a touch of sophistication and artistry, ideal for artistic profiles or elegant branding.</p>
          
          <h3>𝔉𝔯𝔞𝔨𝔱𝔲𝔯</h3>
          <p>Also known as "Gothic" or "Old English," this blackletter-inspired font creates a medieval, traditional, or vintage aesthetic. It's popular for gaming profiles with fantasy themes or brands going for a classic, established look.</p>
          
          <h3>𝕮𝖔𝖓𝖙𝖔𝖚𝖗</h3>
          <p>This bold, outlined style offers excellent visibility and a striking appearance. The hollow letters create a distinctive look that stands out even in crowded feeds or player lists.</p>
          
          <h3>𝔻𝕠𝕦𝕓𝕝𝕖</h3>
          <p>With its mathematical or technical appearance, this style is perfect for tech-oriented profiles, coding communities, or gaming identities focused on strategy and precision.</p>
          
          <h3>𝐁𝐨𝐥𝐝</h3>
          <p>This straightforward bold style adds emphasis and strength to your name without elaborate decorations. It's versatile for any context where you want clear readability with added impact.</p>
          
          <h3>𝑰𝒕𝒂𝒍𝒊𝒄</h3>
          <p>The classic italic style adds a touch of elegance and sophistication with its subtle slant. It works well for creative profiles, writing communities, or any context where you want a refined appearance.</p>
          
          <h3>🆂🆀🆄🅰🆁🅴🆂</h3>
          <p>This distinctive style places each letter in a square, creating a bold, modern, and highly visible name. It's excellent for gaming platforms and social media where standing out in comments is important.</p>
          
          <h3>Ⓒⓘⓡⓒⓛⓔⓢ</h3>
          <p>This playful style encloses each letter in a circle, creating a friendly, approachable appearance. It's popular for casual social profiles and creative communities.</p>
          
          <h2>Decorative Symbol Sets</h2>
          <p>Enhance your customized name with carefully selected symbol combinations:</p>
          
          <h3>Stars (★彡 )</h3>
          <p>Add a touch of celestial magic with star symbols. Perfect for usernames that want to convey excellence, achievement, or a cosmic theme.</p>
          
          <h3>Hearts (♥♡ )</h3>
          <p>Surround your name with heart symbols for a loving, friendly, or romantic touch. Ideal for personal profiles, relationship-focused content, or spreading positivity.</p>
          
          <h3>Flowers (✿ )</h3>
          <p>Add a natural, organic feel with flower symbols. Great for profiles related to nature, wellness, beauty, or spring themes.</p>
          
          <h3>Sparkles (✨ )</h3>
          <p>Create a magical, enchanting effect with sparkle symbols. Perfect for creative profiles, fantasy themes, or highlighting something special.</p>
          
          <h3>Arrows (⇒ )</h3>
          <p>Direct attention to your name with arrow symbols. Good for tech-oriented profiles, directive content, or emphasizing progress and direction.</p>
          
          <h3>Music (♪ )</h3>
          <p>Surround your name with musical notes for a rhythmic, harmonious feel. Ideal for music-related profiles, artists, or those who want to express their musical passion.</p>
          
          <h3>Diamonds (♦ )</h3>
          <p>Add a touch of luxury and value with diamond symbols. Perfect for premium brands, luxury content, or profiles focusing on wealth and success.</p>
          
          <h3>Lightning (⚡ )</h3>
          <p>Energize your name with lightning bolt symbols. Great for dynamic personalities, sports enthusiasts, or profiles focusing on energy and action.</p>
          
          <h3>Magic (•*¨*•.¸¸♪ )</h3>
          <p>Create an elaborate, whimsical frame with this combination of symbols. Perfect for fantasy themes, creative profiles, or anywhere you want to add extra enchantment.</p>
          
          <h3>Simple (『 』)</h3>
          <p>Add a clean, minimalist frame with these Japanese-style brackets. Ideal for creating a distinct separation without overwhelming your name with decorations.</p>
          
          <h3>Crown (👑 )</h3>
          <p>Prefix your name with a royal crown symbol to convey authority, leadership, or premium status. Popular for gaming usernames and influential profiles.</p>
          
          <h2>Platform Compatibility</h2>
          <p>While our Name Customizer creates stylish text that works on many platforms, compatibility can vary:</p>
          
          <h3>High Compatibility</h3>
          <ul>
            <li><strong>Twitter</strong>: Excellent support for most unicode characters and symbols.</li>
            <li><strong>Instagram</strong>: Good support for fancy fonts in display names and bios.</li>
            <li><strong>Discord</strong>: Very good support for unicode characters in usernames and messages.</li>
            <li><strong>WhatsApp</strong>: Good support for special characters in display names and statuses.</li>
            <li><strong>Telegram</strong>: Excellent support for fancy text and symbols.</li>
          </ul>
          
          <h3>Moderate Compatibility</h3>
          <ul>
            <li><strong>Facebook</strong>: Supports many unicode characters but may have limitations for certain styles.</li>
            <li><strong>YouTube</strong>: Supports many fancy fonts but may restrict some symbol combinations.</li>
            <li><strong>Reddit</strong>: Limited support for fancy fonts in usernames but works in comments and posts.</li>
            <li><strong>TikTok</strong>: Supports many styles but may have character limitations.</li>
          </ul>
          
          <h3>Limited Compatibility</h3>
          <ul>
            <li><strong>Email addresses</strong>: Standard email addresses don't support unicode characters or fancy fonts.</li>
            <li><strong>Some gaming platforms</strong>: May restrict special characters for technical reasons.</li>
            <li><strong>Official documents or forms</strong>: These typically require standard Latin characters.</li>
          </ul>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-6">
            <h3 className="text-amber-800 dark:text-amber-300">Testing Tip</h3>
            <p className="text-amber-700 dark:text-amber-400 mt-1">Always test your customized name on your target platform before setting it as your permanent username. Some platforms may display the text differently or have specific character restrictions.</p>
          </div>
          
          <h2>Tips for Creating Effective Customized Names</h2>
          <p>To get the most out of your styled name, consider these professional recommendations:</p>
          
          <h3>Prioritize Readability</h3>
          <p>While fancy fonts look stylish, ensure your name remains readable. Extremely decorative fonts might look impressive but can be difficult to recognize or type when others need to search for you.</p>
          
          <h3>Consider Length Limitations</h3>
          <p>Many platforms have character limits for usernames and display names. Some unicode characters may count as multiple characters, so test your customized name before committing to it.</p>
          
          <h3>Match Style to Purpose</h3>
          <p>Choose font styles and symbols that reflect your personal brand or online persona. For professional contexts, opt for cleaner styles; for creative or gaming platforms, more decorative options may be appropriate.</p>
          
          <h3>Use Contrast Wisely</h3>
          <p>If you're using your customized name on platforms with both light and dark modes, ensure it remains visible in both settings. Some symbol combinations might be less visible against certain backgrounds.</p>
          
          <h3>Create Variations</h3>
          <p>Generate several versions of your customized name for different platforms. You might prefer a more elaborate style for social media but a simpler version for gaming or professional sites.</p>
          
          <h3>Save Your Favorites</h3>
          <p>Our tool automatically saves your recent creations, making it easy to revisit and reuse your favorite styles. Copy and save especially good combinations for future reference.</p>
          
          <h2>How It Works: The Technology Behind Name Customization</h2>
          <p>Understanding how our Name Customizer functions can help you make the most of its capabilities:</p>
          
          <h3>Unicode Character Mapping</h3>
          <p>Rather than using actual fonts, our tool maps standard Latin characters to special unicode characters that resemble stylized versions of letters. This allows the text to display consistently across platforms without requiring special fonts to be installed.</p>
          
          <h3>Mathematical Alphanumerics</h3>
          <p>Many of the font styles use Unicode's "Mathematical Alphanumeric Symbols" block, which contains character sets designed for mathematical notation but perfect for creating styled text.</p>
          
          <h3>Combining Characters</h3>
          <p>Some effects are achieved by combining multiple unicode characters together to create the appearance of decorated text, ensuring maximum compatibility across different systems.</p>
          
          <h2>Privacy and Security</h2>
          <p>Our Name Customizer processes all text directly in your browser:</p>
          <ul>
            <li>Your entered text is never sent to our servers</li>
            <li>No personal information is collected through this tool</li>
            <li>The customization process works even when offline once the page has loaded</li>
          </ul>
          
          <h2>Browser Compatibility</h2>
          <p>Our Name Customizer is designed to work with all modern browsers:</p>
          <ul>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Safari</li>
            <li>Microsoft Edge</li>
            <li>Opera</li>
          </ul>
          <p>For the best experience, we recommend keeping your browser updated to the latest version, as older browsers may have limited support for some unicode characters.</p>
          
          <h2>Conclusion</h2>
          <p>Our Name Customizer offers a simple yet powerful way to transform ordinary text into stylish, personalized names that help you stand out online. Whether you're looking to enhance your social media presence, create a memorable gaming identity, or simply have fun with creative text styling, this tool provides the flexibility and options you need.</p>
          
          <p>By combining different font styles with decorative symbols, you can create countless unique variations that express your personality and capture attention across various platforms. Start customizing your name today and discover the impact a stylish, distinctive username can have on your online presence.</p>
        </div>
      </div>
    </>
  );
}
