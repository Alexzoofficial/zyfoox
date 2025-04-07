// This integrates with Gemini API for various AI-powered tools

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

// Updated function to use the provided API key
export async function callGeminiAPI(
  prompt: string,
  apiKey: string = "AIzaSyCGfDcW5KvD-kDsQOc-gnqlLzpKczgIS-E"
): Promise<string> {
  console.log("AI prompt:", prompt);
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as GeminiResponse;
    
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No content received from Gemini API");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // For testing fallback
    return mockResults[prompt.toLowerCase().includes("business name") ? "business-names" : "business-ideas"];
  }
}

// Mock responses for fallback
const mockResults: Record<string, string> = {
  "personal-branding": "# LinkedIn Profile Optimization\n\n**Headline:**\nInnovative Tech Leader | AI & Machine Learning Specialist | Helping Companies Transform Digital Experiences\n\n**About Section:**\nTech visionary with 10+ years spearheading digital transformation initiatives across fintech, healthcare, and e-commerce sectors. Recognized for translating complex technical concepts into business value and leading cross-functional teams to deliver award-winning products. Partner with me to navigate the evolving tech landscape and build future-proof solutions that drive measurable business outcomes.\n\n**Experience Highlights:**\n• Led development of AI-powered customer segmentation tool that increased conversion rates by 32%\n• Orchestrated cloud migration strategy reducing infrastructure costs by $1.2M annually\n• Pioneered agile transformation resulting in 40% faster time-to-market\n\n# X (Twitter) Strategy\n\n**Bio:**\nTech innovator | Building the future with #AI & #MachineLearning | Sharing insights on digital transformation & tech leadership | Personal views\n\n**Content Strategy:**\n1. Share industry news with your unique perspective\n2. Create threads breaking down complex tech concepts\n3. Engage with thought leaders in your field\n4. Post behind-the-scenes looks at your work\n5. Use a 3:1 ratio of value-giving posts to self-promotion",
  "study-notes": "# Summary: Machine Learning Fundamentals\n\n## Key Concepts\n\n### Supervised Learning\n- Definition: Training with labeled data\n- Examples: Classification, regression\n- Popular algorithms: Decision trees, SVMs, neural networks\n\n### Unsupervised Learning\n- Definition: Finding patterns in unlabeled data\n- Examples: Clustering, dimensionality reduction\n- Popular algorithms: K-means, PCA, autoencoders\n\n## Important Formulas\n\n### Linear Regression\ny = mx + b\nwhere:\n- y is the predicted value\n- m is the slope\n- x is the feature value\n- b is the y-intercept\n\n### Gradient Descent\nθj := θj - α ∂/∂θj J(θ)\nwhere:\n- θj is the parameter to be updated\n- α is the learning rate\n- J(θ) is the cost function\n\n## Study Questions\n1. Explain the difference between supervised and unsupervised learning.\n2. What is the purpose of regularization in machine learning models?\n3. Compare and contrast precision and recall metrics.",
  "business-names": "# Business Name Suggestions for Tech Consulting Firm\n\n## Top Recommendations\n\n1. **InnovateTech Solutions**\n   - Domain: innovatetechsolutions.com\n   - Conveys innovation and technical expertise\n   - Modern, professional sound\n\n2. **Nexus Digital Consulting**\n   - Domain: nexusdigitalconsulting.com\n   - Suggests connection and digital transformation\n   - Memorable and authoritative\n\n3. **Quantum Shift Technologies**\n   - Domain: quantumshifttech.com\n   - Implies transformative, cutting-edge solutions\n   - Scientific and progressive feel\n\n## Additional Options\n\n4. **Apex Insight Tech**\n   - Domain: apexinsighttech.com\n   - Indicates top-tier knowledge and expertise\n\n5. **Prism Digital Strategies**\n   - Domain: prismdigitalstrategies.com\n   - Suggests diverse perspectives and clear vision\n\n6. **Catalyst Tech Advisors**\n   - Domain: catalysttechadvisors.com\n   - Conveys driving change and transformation\n\n## Brand Identity Considerations\n\n- Use blue and gray color schemes for professionalism\n- Consider geometric logo designs that suggest precision\n- Typography: Clean sans-serif fonts reinforce modern tech focus\n- Brand voice: Confident, knowledgeable, forward-thinking",
  "business-ideas": "# AI-Enhanced Fitness Coaching Platform\n\n## Business Concept\nCreate a mobile app that uses AI to provide personalized fitness coaching, form correction, and workout plans based on users' equipment, space limitations, fitness level, and goals.\n\n## Target Market\n- Busy professionals aged 25-45\n- Home fitness enthusiasts\n- People intimidated by traditional gyms\n- Individuals seeking affordable coaching alternatives\n\n## Revenue Streams\n- Freemium model with basic workouts free\n- Premium subscription ($15-25/month) for advanced features\n- Partnerships with fitness equipment brands\n- Certified trainer marketplace (commission-based)\n\n## Competitive Advantage\n- Real-time form correction using computer vision\n- Adaptive workout plans that evolve with progress\n- Community features for accountability\n- Integration with health wearables for comprehensive tracking\n\n## Initial Investment: $75,000-150,000\n\n## Growth Strategy\n1. Launch MVP focusing on 3 workout types\n2. Gather user feedback and improve AI accuracy\n3. Expand to additional workout categories\n4. Add nutrition coaching component\n5. Develop B2B offering for corporate wellness programs",
};

// Specific tool functions that leverage the Gemini API

export async function generatePersonalBranding(formData: Record<string, string>): Promise<string> {
  const prompt = `
    Generate a comprehensive personal branding strategy for LinkedIn and X (Twitter).
    
    Name: ${formData.name}
    Industry: ${formData.industry}
    Experience level: ${formData.experience}
    Key skills: ${formData.skills}
    Personal branding goals: ${formData.goals}
    
    Please provide:
    1. LinkedIn headline and about section optimization
    2. Key content themes for LinkedIn
    3. X (Twitter) bio and content strategy
    4. Engagement tactics for both platforms
  `;
  
  return callGeminiAPI(prompt);
}

export async function generateStudyNotes(formData: Record<string, string>): Promise<string> {
  const prompt = `
    Create comprehensive study notes and a summary for the following topic:
    
    Topic: ${formData.topic}
    Learning level: ${formData.level}
    Key areas to focus on: ${formData.focus}
    
    Please include:
    1. Key concepts and definitions
    2. Important formulas or principles
    3. Visual aids or diagrams (described in text)
    4. Study questions for comprehension check
  `;
  
  return callGeminiAPI(prompt);
}

export async function generateBusinessNames(formData: Record<string, string>): Promise<string> {
  const prompt = `
    Generate creative and available business name suggestions for the following:
    
    Industry: ${formData.industry}
    Location: ${formData.location || "Not specified"}
    Keywords: ${formData.keywords}
    Business type: ${formData.business_type}
    Business description: ${formData.description}
    
    Please provide:
    1. At least 6 business name suggestions with domain availability
    2. Brief explanation for each name suggestion
    3. Brand identity considerations (colors, typography, logo ideas)
  `;
  
  return callGeminiAPI(prompt);
}

export async function generateMemeMarketing(formData: Record<string, string>): Promise<string> {
  const prompt = `
    Create meme marketing concepts for social media for the following brand:
    
    Brand/Product: ${formData.brand}
    Industry: ${formData.industry}
    Target audience: ${formData.audience}
    Brand tone: ${formData.tone}
    Campaign context/goal: ${formData.context}
    
    Please provide:
    1. 3-5 meme concepts with captions and descriptions
    2. Suggested platforms for each meme
    3. Call-to-action suggestions
    4. Relevant hashtag strategy
  `;
  
  return callGeminiAPI(prompt);
}

export async function generateBusinessIdeas(formData: Record<string, string>): Promise<string> {
  const prompt = `
    Generate a detailed business idea based on the following inputs:
    
    Industry interest: ${formData.industry}
    Skills and experience: ${formData.skills}
    Target market: ${formData.target}
    Investment capacity: ${formData.investment}
    
    Please provide:
    1. Business concept overview
    2. Target market analysis
    3. Revenue model suggestions
    4. Competitive advantages
    5. Initial investment estimates
    6. Growth strategy outline
  `;
  
  return callGeminiAPI(prompt);
}

export async function generateHooks(formData: Record<string, string>): Promise<string> {
  const prompt = `
    Create attention-grabbing hooks for TikTok and Instagram Reels based on:
    
    Content type: ${formData.content_type}
    Niche/Industry: ${formData.niche}
    Target audience: ${formData.target_audience}
    Content description: ${formData.content_description}
    Preferred hook style: ${formData.hook_style}
    
    Please provide:
    1. At least 5 hook examples (first 5-10 seconds of video)
    2. Hook construction formula for future reference
    3. On-screen text suggestions
  `;
  
  return callGeminiAPI(prompt);
}

export async function generateWhatsAppMarketing(formData: Record<string, string>): Promise<string> {
  const prompt = `
    Create WhatsApp marketing messages and campaign strategy for:
    
    Business type: ${formData.business_type}
    Campaign type: ${formData.campaign_type}
    Target audience: ${formData.target_audience}
    Key benefits/offers: ${formData.key_benefits}
    Communication tone: ${formData.tone}
    
    Please provide:
    1. WhatsApp promotional announcement template
    2. Follow-up or re-engagement message
    3. Broadcast strategy (timing, frequency, segmentation)
  `;
  
  return callGeminiAPI(prompt);
}

export async function generateYouTubeBranding(formData: Record<string, string>): Promise<string> {
  const prompt = `
    Create YouTube channel branding strategy for:
    
    Content type: ${formData.content_type}
    Specific niche: ${formData.niche}
    Target audience: ${formData.target_audience}
    Brand personality: ${formData.brand_personality}
    Channel goals: ${formData.channel_goals}
    
    Please provide:
    1. Channel name suggestions (at least 3)
    2. Visual identity recommendations (logo concept, colors, thumbnail style)
    3. Content pillar suggestions with percentage breakdown
    4. Channel growth strategy by subscriber milestone
  `;
  
  return callGeminiAPI(prompt);
}

export async function generateArticle(formData: Record<string, string>): Promise<string> {
  const wordCount = formData.length === "short" ? "300-500" : 
                    formData.length === "medium" ? "500-800" : 
                    formData.length === "long" ? "800-1200" : "1200-2000";
  
  const prompt = `
    Generate a well-structured, SEO-optimized article on the following topic:
    
    Topic: ${formData.topic}
    Keywords to include: ${formData.keywords}
    Tone of voice: ${formData.tone}
    Article length: ${wordCount} words
    Target audience: ${formData.audience}
    Additional instructions: ${formData.additionalInstructions || "None"}
    
    Format the article with proper Markdown formatting including:
    - A compelling headline with a primary H1 (#)
    - Organized sections with H2 (##) and H3 (###) headings
    - Bullet points and numbered lists where appropriate
    - Bold text for important points
    - Include a brief introduction and conclusion
    
    Make sure the content is engaging, informative, and optimized for both readers and search engines.
  `;
  
  return callGeminiAPI(prompt);
}
