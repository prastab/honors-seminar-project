import pandas as pd
from transformers import pipeline
import torch # Make sure torch is installed

# --- Load Data ---
# Ensure 'df' DataFrame with 'film', 'character', 'cleaned_dialogue' is loaded
try:
    df = pd.read_csv('dialogues_with_sentiment.csv') # Or the latest CSV if you saved after VADER
    df = df[['film', 'character', 'cleaned_dialogue', 'sentiment_score']].copy() # Keep only needed columns if reloading
    if 'df' not in locals():
        raise NameError("'df' DataFrame not found.")
    if 'cleaned_dialogue' not in df.columns:
        raise NameError("DataFrame missing 'cleaned_dialogue' column.")
    if df.empty:
         raise ValueError("DataFrame 'df' is empty.")
    print("Using existing 'df' DataFrame for emotion analysis.")
except (NameError, FileNotFoundError, ValueError) as e:
     print(f"Error loading or validating DataFrame: {e}")
     print("Please ensure the previous steps were run or load the data correctly.")
     exit()

# --- Initialize Emotion Analysis Pipeline ---
MODEL_NAME = "j-hartmann/emotion-english-distilroberta-base"
print(f"\nInitializing emotion analysis pipeline with model: {MODEL_NAME}")
print("This may take a moment to download the model...")

# Check if CUDA (GPU) is available, otherwise use CPU
if torch.backends.mps.is_available():
    device = torch.device("mps")
    print("Using device: MPS (Apple Silicon GPU)")
elif torch.cuda.is_available():
    # Fallback for Nvidia GPUs if needed, though MPS is the target here
    device = torch.device("cuda:0")
    print("Using device: CUDA (NVIDIA GPU)")
else:
    device = torch.device("cpu")
    print("Using device: CPU")

# Using return_all_scores=True is deprecated, use top_k=None instead
emotion_classifier = pipeline("text-classification",
                              model=MODEL_NAME,
                              top_k=None, # Get scores for ALL labels
                              device=device) # Use GPU if available

print("Pipeline initialized.")

# --- Define Function to Apply Pipeline and Extract Scores ---
# Get the expected labels from the model's config
try:
    expected_labels = emotion_classifier.model.config.id2label
    emotion_columns = [expected_labels[i] for i in range(len(expected_labels))]
    print(f"Model expects emotions: {emotion_columns}")
except Exception as e:
    print(f"Could not automatically determine emotion labels: {e}")
    # Define manually based on model card if needed
    emotion_columns = ['anger', 'disgust', 'fear', 'joy', 'neutral', 'sadness', 'surprise']
    print(f"Using manually defined emotions: {emotion_columns}")


def analyze_emotions(text):
    """Applies the emotion classifier and returns a dictionary of scores."""
    if not isinstance(text, str) or not text.strip():
        # Return dictionary with 0 scores for empty/invalid input
        return {label: 0.0 for label in emotion_columns}
    try:
        results = emotion_classifier(text)
        # The output is a list of dictionaries, one per label.
        # Convert it to a dictionary mapping label to score.
        score_dict = {item['label']: item['score'] for item in results[0]}
        return score_dict
    except Exception as e:
        print(f"Error classifying text: '{text[:50]}...' - {e}")
        # Return dictionary with 0 scores in case of error
        return {label: 0.0 for label in emotion_columns}

# --- Apply Emotion Analysis ---
# This is the slow part!
print("\nApplying emotion analysis to all dialogues... (This may take several minutes)")

# Apply the function. Consider using tqdm for a progress bar if you install it (`pip install tqdm`)
from tqdm.auto import tqdm
tqdm.pandas()
emotion_results = df['cleaned_dialogue'].progress_apply(analyze_emotions)

# Without tqdm:
emotion_results = df['cleaned_dialogue'].apply(analyze_emotions)

print("Emotion analysis application complete.")


# --- Process Results and Update DataFrame ---
print("Processing results and updating DataFrame...")

# Convert the series of dictionaries into a DataFrame
emotion_df = pd.DataFrame(emotion_results.tolist(), index=df.index)

# Ensure all expected columns exist, fill missing with 0 (handles errors in analyze_emotions)
for col in emotion_columns:
    if col not in emotion_df.columns:
        emotion_df[col] = 0.0
emotion_df = emotion_df[emotion_columns] # Keep only expected columns in order

# Concatenate the new emotion scores with the original DataFrame
df = pd.concat([df, emotion_df], axis=1)

print("DataFrame updated with emotion scores.")

# --- Display Results ---
print("\nFirst few rows with VADER score and new Emotion Scores:")
# Select columns to display - adjust as needed
display_cols = ['film', 'character', 'cleaned_dialogue', 'sentiment_score'] + emotion_columns
print(df[display_cols].head())

print("\nBasic statistics for new emotion scores:")
# Calculate mean score for each emotion per character
emotion_stats = df.groupby(['film', 'character'])[emotion_columns].mean()
print(emotion_stats)

# --- Save the Results (Recommended) ---
df.to_csv('dialogues_with_vader_and_emotion.csv', index=False)
# print("\nDataFrame with VADER and fine-grained emotion scores saved to dialogues_with_vader_and_emotion.csv")

# --- Next Steps Suggestion ---
print("\n--- Emotion Analysis Complete ---")
print("You now have scores for specific emotions alongside the VADER sentiment.")
print("Next steps would involve visualizing these new emotion scores:")
print("  - Bar charts comparing average emotion scores (e.g., average 'anger') per character.")
print("  - Heatmaps showing the correlation between different emotions or VADER score.")
print("  - Analyzing specific high-scoring lines for particular emotions.")
print("  - Relating these emotion patterns back to character roles/morality (interpretive step).")