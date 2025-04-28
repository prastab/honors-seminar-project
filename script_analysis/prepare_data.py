import pandas as pd
import re
import os # To check if files exist

# --- Configuration ---
PULP_FICTION_SCRIPT_PATH = 'pulpfiction.txt'
GOODFELLAS_SCRIPT_PATH = 'goodfellas.txt'

TARGET_CHARACTERS = {
    'Pulp Fiction': {'VINCENT', 'JULES', 'MIA', 'BUTCH'},
    'Goodfellas': {'HENRY', 'TOMMY', 'JIMMY'}
}

# Heuristics for parsing (these might need tweaking based on the exact files)
MIN_CHAR_NAME_LEADING_SPACES = 30 # How much space indicates a centered character name
MIN_DIALOGUE_LEADING_SPACES = 20   # How much space indicates an indented dialogue line
MAX_CHAR_NAME_LENGTH = 30         # Avoid grabbing long uppercase headings

# --- Helper Functions ---

def clean_dialogue(text):
    """Removes parenthetical remarks and extra whitespace."""
    # Remove anything inside parentheses
    text = re.sub(r'\([^)]*\)', '', text)
    # Remove potential character name prefixes sometimes left in dialogue lines
    text = re.sub(r'^[A-Z\s]+\s*(\(.*\))?:\s*', '', text)
    # Replace multiple spaces/newlines with a single space
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def parse_script(filepath, film_name, target_chars):
    """
    Parses a script file to extract dialogue for specific characters.

    Args:
        filepath (str): Path to the script text file.
        film_name (str): Name of the film.
        target_chars (set): A set of uppercase character names to extract.

    Returns:
        list: A list of dictionaries, each containing 'film', 'character', 'dialogue'.
    """
    if not os.path.exists(filepath):
        print(f"Error: Script file not found at {filepath}")
        return []

    extracted_data = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading file {filepath}: {e}")
        return []

    i = 0
    while i < len(lines):
        line = lines[i]
        line_stripped = line.strip()
        leading_spaces = len(line) - len(line.lstrip(' ')) # Count leading spaces

        # Potential Character Name Check:
        # - Is it mostly uppercase?
        # - Is it significantly indented (centered)?
        # - Is it relatively short?
        # - Is it potentially followed by an indented line?
        if (line_stripped.isupper() and
            leading_spaces >= MIN_CHAR_NAME_LEADING_SPACES and
            len(line_stripped) > 0 and
            len(line_stripped) < MAX_CHAR_NAME_LENGTH and
            not line_stripped.startswith(('INT.', 'EXT.', 'CUT TO:', 'FADE IN:', 'FADE OUT:'))):

            # Clean up potential additions like (O.S.), (V.O.), (CONT'D)
            potential_char_name = re.sub(r'\s*\(.*\)\s*$', '', line_stripped).strip()

            if potential_char_name in target_chars:
                current_character = potential_char_name
                dialogue_lines = []
                # Look ahead for dialogue lines
                i += 1 # Move to the next line
                while i < len(lines):
                    dialogue_line = lines[i]
                    dialogue_line_stripped = dialogue_line.strip()
                    dlg_leading_spaces = len(dialogue_line) - len(dialogue_line.lstrip(' '))

                    # Dialogue Line Check:
                    # - Is it indented (but usually less than the character name)?
                    # - Is it not empty?
                    # - Does it NOT look like another character name cue or scene heading?
                    if (dialogue_line_stripped and
                        dlg_leading_spaces >= MIN_DIALOGUE_LEADING_SPACES and
                        dlg_leading_spaces < MIN_CHAR_NAME_LEADING_SPACES and # Avoid capturing next char name if less indented
                        not dialogue_line_stripped.isupper()): # Avoid lines that are just uppercase

                        dialogue_lines.append(dialogue_line_stripped)
                        i += 1
                    else:
                        # This line is not part of the dialogue, break inner loop
                        break # Stop collecting dialogue for this character

                if dialogue_lines:
                    full_dialogue = " ".join(dialogue_lines)
                    extracted_data.append({
                        'film': film_name,
                        'character': current_character,
                        'dialogue': full_dialogue # Store raw combined dialogue first
                    })
                # The outer loop's 'i' is already at the line that stopped dialogue collection
                # Decrement 'i' so the outer loop increments it correctly to check that line next
                i -= 1

        # Move to the next line in the outer loop
        i += 1

    print(f"Parsed {film_name}: Found {len(extracted_data)} dialogues for target characters.")
    return extracted_data

# --- Main Execution ---

all_dialogue_data = []

# Process Pulp Fiction
print("Processing Pulp Fiction...")
pf_data = parse_script(
    PULP_FICTION_SCRIPT_PATH,
    'Pulp Fiction',
    TARGET_CHARACTERS['Pulp Fiction']
)
all_dialogue_data.extend(pf_data)

# Process Goodfellas
print("\nProcessing Goodfellas...")
gf_data = parse_script(
    GOODFELLAS_SCRIPT_PATH,
    'Goodfellas',
    TARGET_CHARACTERS['Goodfellas']
)
all_dialogue_data.extend(gf_data)

# Create Pandas DataFrame
print(f"\nCreating DataFrame with {len(all_dialogue_data)} total entries...")
if not all_dialogue_data:
    print("No data extracted. Please check script paths and format.")
    # Exit or handle error appropriately
    exit()

df = pd.DataFrame(all_dialogue_data)

# Clean the dialogue column
print("Cleaning dialogue text...")
df['cleaned_dialogue'] = df['dialogue'].apply(clean_dialogue)

# Remove entries where cleaning resulted in empty dialogue
df = df[df['cleaned_dialogue'] != '']
df.reset_index(drop=True, inplace=True)


# Display results
print(f"\nCreated DataFrame with {len(df)} cleaned dialogue entries.")
print("\nDataFrame Info:")
df.info()

print("\nFirst 5 rows of the DataFrame:")
print(df.head())

print("\nDialogue counts per character:")
print(df.groupby(['film', 'character']).size())

df.to_csv('cleaned_dialogues.csv', index=False)
# print("\nDataFrame saved to cleaned_dialogues.csv")