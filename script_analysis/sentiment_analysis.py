import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import nltk # VADER often uses nltk resources

# --- Optional: Download VADER lexicon if needed (run once) ---
# try:
#     nltk.data.find('sentiment/vader_lexicon.zip')
# except nltk.downloader.DownloadError:
#     print("Downloading VADER lexicon...")
#     nltk.download('vader_lexicon')
# except LookupError: # Sometimes it's just not found locally
#     print("Downloading VADER lexicon (LookupError)...")
#     nltk.download('vader_lexicon')

# --- Load the DataFrame ---
# If 'df' is already in memory from the previous script, you can skip this.
# Otherwise, uncomment the next line:
df = pd.read_csv('cleaned_dialogues.csv')
print("Loaded DataFrame from cleaned_dialogues.csv")

# --- Ensure the DataFrame exists and has the right column ---
if 'df' not in locals() and 'df' not in globals():
    print("Error: DataFrame 'df' not found. Please run the data preparation script first or load 'cleaned_dialogues.csv'.")
    exit()
elif 'cleaned_dialogue' not in df.columns:
    print("Error: DataFrame does not contain the 'cleaned_dialogue' column.")
    exit()
elif df.empty:
    print("Error: DataFrame is empty.")
    exit()


# --- Sentiment Analysis ---

print("\nInitializing VADER Sentiment Analyzer...")
analyzer = SentimentIntensityAnalyzer()

def get_vader_score(text):
    """Calculates the VADER compound score for a given text."""
    # Ensure text is a string, handle potential non-string data
    if not isinstance(text, str):
        return 0.0 # Assign neutral score to non-string input
    return analyzer.polarity_scores(text)['compound']

print("Applying VADER analysis to cleaned dialogue...")
# Apply the function to the 'cleaned_dialogue' column
df['sentiment_score'] = df['cleaned_dialogue'].apply(get_vader_score)

print("Sentiment analysis complete.")

# --- Calculate Basic Statistics ---

print("\nCalculating statistics per character...")
# Group by film and character, then aggregate sentiment scores
character_stats = df.groupby(['film', 'character'])['sentiment_score'].agg(['mean', 'median', 'std', 'count'])
# Rename columns for clarity
character_stats.rename(columns={'mean': 'Mean Sentiment', 'median': 'Median Sentiment', 'std': 'Std Dev Sentiment', 'count': 'Dialogue Count'}, inplace=True)
print(character_stats)


print("\nCalculating overall statistics per film...")
# Group by film only, then aggregate sentiment scores
film_stats = df.groupby('film')['sentiment_score'].agg(['mean', 'median', 'std', 'count'])
# Rename columns for clarity
film_stats.rename(columns={'mean': 'Mean Sentiment', 'median': 'Median Sentiment', 'std': 'Std Dev Sentiment', 'count': 'Dialogue Count'}, inplace=True)
print(film_stats)


# --- Display first few rows with sentiment scores ---
print("\nFirst 5 rows of DataFrame with Sentiment Score:")
print(df.head())

# Optional: Save the DataFrame with sentiment scores
df.to_csv('dialogues_with_sentiment.csv', index=False)
# print("\nDataFrame with sentiment scores saved to dialogues_with_sentiment.csv")