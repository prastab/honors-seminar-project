import SectionContainer from '@/components/SectionContainer';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import {
  MotionH1, MotionH2, MotionH3, MotionP, MotionUl, MotionLi, MotionImg
} from '@/components/MotionComponents';

// Helper component for numbered inline citations
const Cite = ({ id }: { id: number }) => ( // Changed prop name/type to number
  <sup className="font-medium text-primary px-0.5">
    <a href={`#ref-${id}`} className="hover:underline">[{id}]</a>
  </sup>
);

// Define ALL section IDs in the order they appear on the page
const allSectionIds = [
  "introduction", "background", "methodology", "methodology-vader",
  "methodology-roberta", "results", "results-overall", "results-character-avg",
  "results-dominant", "results-correlation", "results-anger-focus",
  "results-qualitative", "conclusion", "references",
];

// Define the MAJOR section IDs that will appear in the Navbar
const majorSectionIdsForNav = [
  "introduction", "background", "methodology", "results", "conclusion", "references",
];

// Assign reference numbers (adjust order if needed)
const REF_NUM = {
  GF: 1,
  PF: 2,
  TD: 3,
  KB: 4,
  SCRIPTS: 5,
  VADER: 6,
  ROBERTA: 7,
  LIBS: 8,
  WEB: 9,
};


export default function Home() {
  return (
    <ClientLayoutWrapper allSectionIds={allSectionIds} majorSectionIds={majorSectionIdsForNav}>

      {/* --- Introduction Section --- */}
      <SectionContainer id="introduction">
        <MotionH1>Feeling the Dialogue: Emotions and Morality in Scorsese & Tarantino Films</MotionH1>
        <MotionP>
          Martin Scorsese and Quentin Tarantino are masters of modern cinema, known for their
          stylish crime narratives, morally complex characters, and unforgettable dialogue.
          Their films, such as Scorsese's <strong>Goodfellas</strong><Cite id={REF_NUM.GF} /> and <strong>Taxi Driver</strong><Cite id={REF_NUM.TD} />, or Tarantino's <strong>Pulp Fiction</strong><Cite id={REF_NUM.PF} /> and <strong>Kill Bill Vol. 1</strong><Cite id={REF_NUM.KB} />, often leave audiences grappling with questions of right and wrong,
          while simultaneously experiencing a whirlwind of emotions – from humor and joy to
          intense anger and fear.
        </MotionP>
        <MotionP>
          This project dives into the emotional landscape of their characters' speech.
          Using computational tools like <strong>sentiment and emotion analysis</strong>, we explore how
          different characters in the iconic films <strong>Goodfellas</strong><Cite id={REF_NUM.GF} /> and <strong>Pulp Fiction</strong><Cite id={REF_NUM.PF} /> express
          emotions through their words. Can we find patterns? Do characters perceived as
          "villains" talk differently, emotionally speaking, than the "protagonists"?
        </MotionP>
        <MotionP>
          We started with a basic sentiment analysis tool (VADER<Cite id={REF_NUM.VADER} />) and then moved to a more
          advanced AI model (DistilRoBERTa<Cite id={REF_NUM.ROBERTA} />) to get a detailed breakdown of specific emotions
          like anger, joy, fear, and sadness. This white paper presents our findings,
          offering a data-driven look at how emotion and morality intertwine in the dialogue
          of these cinematic giants.
        </MotionP>
      </SectionContainer>

      {/* --- Background Section --- */}
      <SectionContainer id="background">
        <MotionH2>Background: Setting the Scene</MotionH2>
        <MotionH3>Why Analyze Dialogue in These Films?</MotionH3>
        <MotionP>
          Scorsese and Tarantino have distinct but influential styles. Both often feature:
        </MotionP>
        <MotionUl>
          <MotionLi>Characters operating outside the law (mobsters, hitmen, thieves).</MotionLi>
          <MotionLi>Dialogue that is sharp, memorable, and often reveals character psychology and motivations.</MotionLi>
          <MotionLi>Complex morality where heroes are flawed and villains can be charismatic.</MotionLi>
          <MotionLi>Sudden shifts in tone, mixing violence with dark humor or mundane conversation.</MotionLi>
        </MotionUl>
        <MotionP>
          Think of the tense diner scene in <strong>Pulp Fiction</strong><Cite id={REF_NUM.PF} /> or Tommy DeVito's "funny how?" rant
          in <strong>Goodfellas</strong><Cite id={REF_NUM.GF} />. The words characters choose, and the underlying emotion, are central
          to the impact of these films.
        </MotionP>
        <MotionH3>The Problem: Subjectivity vs. Data</MotionH3>
        <MotionP>
          Film analysis often relies on subjective interpretation. While valuable, it can be hard
          to make concrete comparisons. How much <strong>more</strong> angry does Tommy sound compared to Henry,
          according to their dialogue? Does <strong>Pulp Fiction</strong> truly have more 'surprising' moments
          reflected in its speech compared to <strong>Goodfellas</strong>? Traditional analysis struggles to quantify these emotional undercurrents at scale.
        </MotionP>
        <MotionP>
           This project addresses this gap by applying natural language processing (NLP)<Cite id={REF_NUM.LIBS} /> techniques to treat the script's dialogue as data, allowing for measurable comparisons.
           Can we use data to provide objective, replicable insights into the emotional
           expression of characters and how it might relate to their roles and the film's overall tone?
        </MotionP>
      </SectionContainer>

       {/* --- Methodology Section (Grouped) --- */}
       <SectionContainer id="methodology">
        <MotionH2>Methodology: How I Analyzed the Dialogue</MotionH2>
        <MotionP>
          My process involved transforming the film scripts into analyzable data through several key steps using Python<Cite id={REF_NUM.LIBS} /> and related libraries:
        </MotionP>

        <MotionH3 className="text-xl mt-6 mb-3 font-medium">1. Data Collection & Preparation</MotionH3> {/* Combined heading */}
        <MotionP>
          First, I obtained the text screenplays for <em>Pulp Fiction</em><Cite id={REF_NUM.PF} /> and <em>Goodfellas</em><Cite id={REF_NUM.GF} /> from public online databases<Cite id={REF_NUM.SCRIPTS} />. Using Python<Cite id={REF_NUM.LIBS} />, I then wrote code to parse these files, extracting dialogue spoken by key characters (Vincent, Jules, Mia, Butch; Henry, Tommy, Jimmy). This involved cleaning the text by removing non-spoken elements like stage directions. The result was a structured dataset containing the film, character, and the cleaned dialogue line, ready for analysis.
        </MotionP>

        {/* --- Introduction to Analysis Phase --- */}
        <MotionH3 className="text-xl mt-8 mb-3 font-medium">2. Sentiment and Emotion Analysis</MotionH3> {/* New Subheading */}
        <MotionP>
          With the prepared dialogue data, I applied two distinct computational techniques to measure the emotional content:
        </MotionP>
      </SectionContainer> {/* End of main Methodology Intro section */}


      {/* --- VADER Analysis Section --- */}
      {/* This section now clearly falls under the "Sentiment and Emotion Analysis" subheading */}
      <SectionContainer id="methodology-vader" className="pt-2 md:pt-4"> {/* Adjusted padding */}
        <MotionH3>Analysis Step 1: Basic Sentiment with VADER</MotionH3> {/* Changed heading slightly */}
        <MotionP>
          My first pass used <strong>VADER</strong><Cite id={REF_NUM.VADER} />.
          VADER is a lexicon and rule-based tool good for general sentiment, especially text with slang or emphasis (like social media or dialogue). It efficiently provides a single 'compound' score from -1 (very negative) to +1 (very positive), giving a broad measure of polarity.
        </MotionP>
          {/* VADER Plot Images with Subtitle */}
          <div className='flex flex-col items-center gap-2 py-4 px-4'> {/* Wrap images and subtitle */} 
            <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-8'> {/* Image row */} 
              <MotionImg src="/plots/vader1.png" alt="VADER Sentiment Analysis Results Chart 1" className="max-w-md" />
              <MotionImg src="/plots/vader2.png" alt="VADER Sentiment Analysis Results Chart 2" className="max-w-md" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Figure 1: VADER sentiment scores for key characters.</p> {/* Subtitle */} 
          </div>
          <strong>Limitations:</strong> While quick, VADER's single score lacked detail. It couldn't differentiate *types* of negative emotions (anger vs. sadness) and often scored nuanced dialogue as neutral. For deeper insights, a more sophisticated approach was needed.
      </SectionContainer>


      {/* --- RoBERTa Analysis Section --- */}
      <SectionContainer id="methodology-roberta" className="pt-2 md:pt-4"> {/* Adjusted padding */}
        <MotionH3>Analysis Step 2: Detailed Emotion Classification with RoBERTa</MotionH3> {/* Changed heading slightly */}
        <MotionP>
          To get a richer understanding, I employed a powerful AI model based on <strong>RoBERTa</strong> (<code>j-hartmann/emotion-english-distilroberta-base</code><Cite id={REF_NUM.ROBERTA} /> via Hugging Face<Cite id={REF_NUM.LIBS} />). This model analyzes text contextually and classifies it into seven distinct emotion categories:
        </MotionP>
        {/* Emotion List */}
        <MotionUl className="grid grid-cols-2 md:grid-cols-3 gap-x-4 mb-4">
           <MotionLi>Anger</MotionLi> <MotionLi>Disgust</MotionLi> <MotionLi>Fear</MotionLi>
           <MotionLi>Joy</MotionLi> <MotionLi>Neutral</MotionLi> <MotionLi>Sadness</MotionLi>
           <MotionLi>Surprise</MotionLi>
        </MotionUl>
        {/* Advantages List */}
        <MotionP>This model offers key advantages over VADER for this task:</MotionP>
        <MotionUl className="mb-4">
          <MotionLi>Context-aware understanding.</MotionLi>
          <MotionLi>Specific emotion detection (not just +/- polarity).</MotionLi>
          <MotionLi>Better potential for handling nuances in dialogue.</MotionLi>
        </MotionUl>
        {/* Implementation Details */}
        <MotionP>
          I applied this model using the Transformers<Cite id={REF_NUM.LIBS} /> and PyTorch<Cite id={REF_NUM.LIBS} /> libraries, optimizing performance with batch processing and hardware acceleration (MPS). This generated the detailed emotion scores used in the main results section.
        </MotionP>
      </SectionContainer>

      {/* --- Results Section (Grouped) --- */}
      <SectionContainer id="results">
         <MotionH2>Results & Insights</MotionH2>
         <MotionP>
           Applying the emotion classification model yielded quantifiable data about the emotional expression in the dialogue. The following sections explore these findings through visualizations and interpretations.
         </MotionP>
      </SectionContainer>

      <SectionContainer id="results-overall" className="pt-0 md:pt-4">
         <MotionH3>Overall Film Emotional Fingerprints</MotionH3>
         <MotionP>  Looking at the average emotion scores across all analyzed dialogue gives each film a unique "emotional profile". The radar chart below visualizes this, with each axis representing an emotion. A point further from the center indicates a higher average score for that emotion in the film's dialogue.</MotionP>
         <div className="flex flex-col items-center gap-2 py-4 px-4"> {/* Wrap image and subtitle */} 
           <MotionImg src="/plots/plot2_film_emotion_profile_radar.png" alt="Radar chart showing average emotion scores per film" className="max-w-lg" />
           <p className="text-sm text-muted-foreground mt-2">Figure 2: Overall emotional profile comparison (Radar Chart).</p> {/* Subtitle */} 
         </div>
         <MotionP>
            <strong>Insights:</strong> {/* ... Insights text using film titles and cite numbers ... */}
            <strong>Goodfellas</strong><Cite id={REF_NUM.GF} /> (orange) dialogue shows slightly higher average scores for <strong>'anger'</strong> (0.21 vs 0.18) and <strong>'disgust'</strong> (0.18 vs 0.15) compared to <strong>Pulp Fiction</strong><Cite id={REF_NUM.PF} /> (blue). Conversely, <strong>Pulp Fiction</strong> dialogue scores higher on average for <strong>'surprise'</strong> (0.16 vs 0.11) and slightly higher for <strong>'neutral'</strong> and <strong>'joy'</strong>. While average differences aren't vast, the overall patterns suggest a potentially 'hotter', more confrontational baseline in <strong>Goodfellas</strong> dialogue, contrasting with more tonal variation or neutrality in <strong>Pulp Fiction</strong>, according to this model's predictions.
         </MotionP>
      </SectionContainer>

       <SectionContainer id="results-character-avg" className="pt-6 md:pt-8">
         <MotionH3>Average Emotion per Character</MotionH3>
         <MotionP>
           Comparing the average intensity of each emotion across key characters reveals distinct personalities reflected in dialogue. This chart displays the average predicted score for each emotion, grouped by character.
         </MotionP>        
         <div className="flex flex-col items-center gap-2 py-4 px-4"> {/* Wrap image and subtitle */} 
            <MotionImg src="/plots/plot1_avg_emotion_intensity_character.png" alt="Bar chart showing average emotion intensity per character" className="max-w-2xl" />
            <p className="text-sm text-muted-foreground mt-2">Figure 3: Average emotion intensity per character.</p> {/* Subtitle */} 
         </div>
         <MotionP>
            <strong>Insights:</strong> {/* ... Insights text using film titles and cite numbers ... */}
            Jimmy (<strong>Goodfellas</strong><Cite id={REF_NUM.GF} />) stands out dramatically with the highest average <strong>'anger'</strong> score (0.35), nearly double that of most other characters analyzed. His fellow Goodfella, Tommy, also scores high on average <strong>'anger'</strong> (0.27) and <strong>'disgust'</strong> (0.24). In  <strong>Pulp Fiction</strong><Cite id={REF_NUM.PF} />,  Jules shows the highest average <strong>'anger'</strong> (0.24) among the main characters, potentially reflecting his authoritative and sometimes confrontational role. Mia, conversely, exhibits the lowest average <strong>'anger'</strong> (0.08), aligning with her generally cooler demeanor, though she shows higher average <strong>'neutral'</strong> scores (0.42).
         </MotionP>
       </SectionContainer>

       {/* --- Other Results Sections --- */}
       {/* ... (Update insights text similarly in results-dominant, results-correlation, etc.) ... */}
        <SectionContainer id="results-dominant" className="pt-6 md:pt-8">
            <MotionH3>Dominant Emotions per Character</MotionH3>
            <MotionP>
           Which emotion was <strong>most</strong> likely present (highest score) in each line? Analyzing the dominant emotion reveals the <strong>frequency</strong> of expression. These charts show the percentage breakdown for each character within their film.
         </MotionP>

             <div className='flex flex-col items-center gap-2 py-4 px-4'> {/* Wrap images and subtitle */} 
                <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-8'> {/* Image row */} 
                  <MotionImg src="/plots/plot3_dominant_emotion_Pulp_Fiction.png" alt="Stacked bar chart dominant emotions Pulp Fiction" className="max-w-md" />
                  <MotionImg src="/plots/plot3_dominant_emotion_Goodfellas.png" alt="Stacked bar chart dominant emotions Goodfellas" className="max-w-md" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Figure 4: Dominant emotion frequency per character (Pulp Fiction & Goodfellas).</p> {/* Subtitle */} 
            </div>
            <MotionP>
            <strong>Insights:</strong> 'Neutral' is the most frequent dominant emotion for many characters, including Henry (46%), Butch (40%), Mia (51%), and Vincent (45%), indicating much dialogue serves exposition or basic interaction. However, the exceptions are telling: For Jimmy, <strong>'anger'</strong> was dominant in a remarkable 43% of his lines, far exceeding any other emotion for him. For Tommy, <strong>'anger'</strong> (30%) and 'neutral' (25%) were the most frequent dominant emotions. Jules also showed <strong>'anger'</strong> as dominant frequently (26%), second only to 'neutral' (35%). This highlights how even if the <strong>average</strong> intensity isn't always extreme, certain characters express specific dominant emotions much more often.
         </MotionP>
                 </SectionContainer>
        <SectionContainer id="results-correlation" className="pt-6 md:pt-8">
            <MotionH3>How Emotions Relate (Correlation)</MotionH3>
            <MotionP>
           How do the different predicted emotions relate to each other and to the basic VADER sentiment score? This heatmap visualizes the correlation coefficients. Red indicates a positive correlation (scores tend to rise and fall together), blue indicates a negative correlation. Values near zero suggest little linear relationship.
         </MotionP>
                      <div className="flex flex-col items-center gap-2 py-4 px-4"> {/* Wrap image and subtitle */} 
                <MotionImg src="/plots/plot5_emotion_correlation_heatmap.png" alt="Heatmap showing emotion correlation" className="max-w-xl" />
                <p className="text-sm text-muted-foreground mt-2">Figure 5: Correlation heatmap of emotion scores and VADER sentiment.</p> {/* Subtitle */} 
             </div>
             <MotionP>
            <strong>Insights:</strong> The results align with expectations in many ways. VADER's positive sentiment score correlates negatively with model-predicted <strong>'anger'</strong> (-0.34) and <strong>'disgust'</strong> (-0.22), while correlating positively with <strong>'joy'</strong> (0.29) and <strong>'neutral'</strong> (0.28). This confirms that the more nuanced model generally agrees with VADER's polarity but adds detail. We also observe a strong negative correlation between predicted <strong>'anger'</strong> and <strong>'neutral'</strong> (-0.52), indicating the model clearly distinguishes these states. Interestingly, <strong>'surprise'</strong> shows very little correlation with the overall VADER sentiment score (0.04).
         </MotionP>
                 </SectionContainer>
        <SectionContainer id="results-anger-focus" className="pt-6 md:pt-8">
            <MotionH3>Focus on Anger Distribution</MotionH3>
            <MotionP>
           Given the genre and the previous findings, let's examine the distribution of 'anger' scores more closely. This box plot displays the range and central tendency of predicted 'anger' for each character, ordered by their average score. The box shows the middle 50% of scores, the line is the median.
         </MotionP>
             <div className="flex flex-col items-center gap-2 py-4 px-4"> {/* Wrap image and subtitle */} 
                <MotionImg src="/plots/plot6_distribution_anger.png" alt="Box plot showing anger distribution" className="max-w-2xl" />
                <p className="text-sm text-muted-foreground mt-2">Figure 6: Distribution of 'Anger' scores per character.</p> {/* Subtitle */} 
             </div>
             <MotionP>
            <strong>Insights:</strong> While Jimmy clearly has the highest average 'anger', the box plot reveals more. His scores seem consistently high (a relatively compact box shifted upwards). Characters like Jules and Henry, while having lower averages, show a wider range in their middle 50% of scores (larger boxes), suggesting more variability in their expression of anger – sometimes low, sometimes high. Tommy's distribution also appears shifted high. Mia's 'anger' scores are clustered very low, confirming her minimal expression of this emotion via dialogue.
         </MotionP>
                 </SectionContainer>
        <SectionContainer id="results-qualitative" className="pt-6 md:pt-8">
            <MotionH3>Qualitative Examples</MotionH3>
            <MotionP>
           Quantitative data provides patterns, but specific examples ground the analysis. Here are some dialogue lines that the RoBERTa model assigned the highest scores for certain emotions:
         </MotionP>
             <div className="space-y-4 text-sm bg-muted p-4 rounded-md max-w-xl mx-auto">
                {/* ... Qualitative examples ... */}
                <p><strong>Top 'Anger' Examples:</strong></p>
           <p className='pl-2'>- Pulp Fiction | JULES (0.980): '...blessed is he who, in the name of charity and good will, shepherded the weak through the valley ...'</p>
           <p className='pl-2'>- Pulp Fiction | BUTCH (0.975): 'Shut up!...'</p>
           <p className='pl-2'>- Pulp Fiction | JULES (0.974): 'There's a passage I got memorized, seems appropriate for this situation: Ezekiel 25:17. \'The path of...'</p>
           <p className='pl-2'>- Pulp Fiction | VINCENT (0.961): 'Stop fuckin\' talkin\' like that!...'</p>
           <p className='pl-2'>- Pulp Fiction | JULES (0.948): 'We should be fuckin\' dead!...'</p>

           <p className="mt-3 pt-2 border-t border-border"><strong>Top 'Disgust' Examples:</strong></p>
           <p className='pl-2'>- Pulp Fiction | JULES (0.980): 'A sewer rat may taste like pumpkin pie. I\'ll never know \'cause even if it did, I wouldn\'t eat the fi...'</p>
           <p className='pl-2'>- Pulp Fiction | JULES (0.976): 'They\'re filthy animals. I don\'t eat filthy animals....'</p>
           <p className='pl-2'>- Pulp Fiction | JULES (0.971): 'Naw, I don\'t eat pork....'</p>

           <p className="mt-3 pt-2 border-t border-border"><strong>Top 'Fear' Examples:</strong></p>
           <p className='pl-2'>- Pulp Fiction | JULES (0.991): 'If you find my answers frightening, Vincent, you should cease askin\' scary questions....'</p>
           <p className='pl-2'>- Pulp Fiction | JULES (0.982): 'Yolanda, I thought you were gonna be cool. When you yell at me, it makes me nervous. When I get nerv...'</p>
           <p className='pl-2'>- Pulp Fiction | VINCENT (0.982): 'Let\'s shake on it....'</p>
             </div>
             <MotionP className="mt-4">
            <strong>Insights:</strong> These specific examples show the model often aligns well with explicit textual cues (Butch's "Shut up!" scoring high on 'anger', Jules' dialogue about dietary preferences scoring high on 'disgust'). The high 'anger' score for Jules's Ezekiel passage<Cite id={REF_NUM.PF} /> likely reflects the text's inherent intensity and violent context, even if the character's delivery is controlled.
         </MotionP>
         <MotionP>
          However, comparing these peaks to the overall averages reveals a fascinating contrast. Our earlier analysis showed <strong>Goodfellas</strong><Cite id={REF_NUM.GF} /> characters, particularly Jimmy and Tommy, possessing higher <strong>average</strong> scores for negative emotions like anger, disgust, and fear. Yet, as seen above, the dialogue lines receiving the absolute <strong>highest</strong>, most extreme scores for these same emotions predominantly originate from <strong>Pulp Fiction</strong><Cite id={REF_NUM.PF} />.
         </MotionP>
         <MotionP>
           This suggests potentially different stylistic approaches. The consistently higher negative averages in <strong>Goodfellas</strong> could reflect the pervasive tension, cynicism, and threat normalized within the mob environment Scorsese portrays – a constant, simmering baseline of negativity. Tarantino, on the other hand, might utilize moments of extreme emotional intensity in dialogue more <strong>selectively</strong> but with maximum textual force, creating sharp, impactful peaks (like Jules's righteous fury or sudden outburst) for dramatic or stylistic effect within a film that might otherwise have more varied emotional states. It highlights how average emotional tone differs from the intensity of emotional peaks in dialogue.
         </MotionP>
         <MotionP>
           Of course, some results remain less intuitive (e.g., Vincent's 'fear' score for "Let's shake on it"), reminding us that the model interprets textual patterns and doesn't fully capture human subtext, irony, or performance nuance, which are vital parts of the cinematic experience.
         </MotionP>
        </SectionContainer>


       {/* --- Conclusion Section --- */}
       <SectionContainer id="conclusion">
        <MotionH2>Conclusion: Data Meets Dialogue</MotionH2>
        <MotionP>
          This analysis demonstrates that computational methods can offer valuable, quantifiable
          insights... By moving from basic sentiment analysis (VADER<Cite id={REF_NUM.VADER} />) to fine-grained emotion classification (using a RoBERTa-based model<Cite id={REF_NUM.ROBERTA} />), we uncovered
          nuanced patterns in how characters in <strong>Goodfellas</strong><Cite id={REF_NUM.GF} /> and <strong>Pulp Fiction</strong><Cite id={REF_NUM.PF} /> express emotion...
        </MotionP>
        <MotionP>
        We found observable, measurable differences in characters' emotional profiles that often align with their established narrative roles and personalities – for instance, the significantly higher average and dominant 'anger' expressed by antagonists like Jimmy. Furthermore, the overall emotional "fingerprints" of the two films showed subtle but distinct characteristics. This data-driven approach complements traditional film analysis by providing objective evidence based directly on the script's text.
        </MotionP>
        <MotionH3>Limitations and Future Work</MotionH3>
        <MotionP>
          This analysis is a starting point... Current AI models... accuracy of online scripts<Cite id={REF_NUM.SCRIPTS} />...
        </MotionP>
        <MotionUl>
          <MotionLi><strong>Expand Scope:</strong> Analyze more films (e.g., <strong>Taxi Driver</strong><Cite id={REF_NUM.TD} />, <em>Kill Bill</em><Cite id={REF_NUM.KB} />, others)...</MotionLi>
          {/* ... Other future work points ... */}
        </MotionUl>
       </SectionContainer>

       {/* --- References Section --- */}
       {/* --- References Section --- */}
       <SectionContainer id="references">
         <MotionH2>References & Tools</MotionH2>
         <MotionUl className="space-y-2 text-sm list-none pl-0">
            {/* Add target styles to each MotionLi */}
            <MotionLi
              id={`ref-${REF_NUM.GF}`}
              // Add these classes for highlighting on target
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.GF}]</strong> Scorsese, M. (Director). (1990). <strong>Goodfellas</strong> [Film]. Warner Bros.
            </MotionLi>

            <MotionLi
              id={`ref-${REF_NUM.PF}`}
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.PF}]</strong> Tarantino, Q. (Director). (1994). <strong>Pulp Fiction</strong> [Film]. Miramax Films.
            </MotionLi>

            <MotionLi
              id={`ref-${REF_NUM.TD}`}
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.TD}]</strong> Scorsese, M. (Director). (1976). <strong>Taxi Driver</strong> [Film]. Columbia Pictures.
            </MotionLi>

            <MotionLi
              id={`ref-${REF_NUM.KB}`}
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.KB}]</strong> Tarantino, Q. (Director). (2003). <strong>Kill Bill: Volume 1</strong> [Film]. Miramax Films.
            </MotionLi>

            <MotionLi
              id={`ref-${REF_NUM.SCRIPTS}`}
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.SCRIPTS}]</strong> Film Scripts sourced from online databases such as IMSDb & Script Slug. Specific scripts used: <a href="https://www.dailyscript.com/scripts/goodfellas.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Goodfellas</a>, <a href="https://www.dailyscript.com/scripts/pulp_fiction.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Pulp Fiction</a> (via Daily Script).
            </MotionLi>

            <MotionLi
              id={`ref-${REF_NUM.VADER}`}
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.VADER}]</strong> Hutto, C.J. & Gilbert, E.E. (2014). VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text. <em>Eighth International Conference on Weblogs and Social Media (ICWSM-14)</em>. <a href="https://github.com/cjhutto/vaderSentiment" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">GitHub Repository</a>.
            </MotionLi>

            <MotionLi
              id={`ref-${REF_NUM.ROBERTA}`}
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.ROBERTA}]</strong> Hartmann, J. et al. Emotion English DistilRoBERTa-base Model. Hugging Face Model Hub. <a href="https://huggingface.co/j-hartmann/emotion-english-distilroberta-base" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Model Link</a>.
            </MotionLi>

            <MotionLi
              id={`ref-${REF_NUM.LIBS}`}
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.LIBS}]</strong> Software Libraries: Python 3, Pandas, NumPy, NLTK, Transformers (Hugging Face), PyTorch, Matplotlib, Seaborn, Tabulate.
            </MotionLi>

            <MotionLi
              id={`ref-${REF_NUM.WEB}`}
              className="target:[&]:bg-primary/10 target:[&]:ring-1 target:[&]:ring-primary/30 target:[&]:rounded target:[&]:p-1 target:[&]:transition-all target:[&]:duration-300"
            >
              <strong>[{REF_NUM.WEB}]</strong> Website Technology Stack: Next.js, React, Tailwind CSS, Shadcn/ui, Framer Motion.
            </MotionLi>
         </MotionUl>
       </SectionContainer>

    </ClientLayoutWrapper>
  );
}