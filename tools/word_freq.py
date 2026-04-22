#!/usr/bin/env python3
"""
Word frequency analysis across all narrative content files.
Outputs top N most-used words to help identify vocabulary to retire.
Usage: python tools/word_freq.py [--top 100] [--min-length 4]
"""
import re, sys, os, argparse
from collections import Counter
from pathlib import Path

STOPWORDS = {
    'the','a','an','and','or','but','in','on','at','to','for','of','with',
    'is','was','are','were','be','been','being','have','has','had','do','does',
    'did','will','would','could','should','may','might','shall','can','cannot',
    'not','no','nor','so','yet','both','either','neither','than','then','that',
    'this','these','those','it','its','you','your','he','she','they','them',
    'their','we','our','i','me','my','him','her','his','who','which','what',
    'when','where','why','how','all','each','every','few','more','most','other',
    'some','such','only','own','same','too','very','just','because','as','until',
    'while','about','against','between','into','through','during','before','after',
    'above','below','from','up','down','out','off','over','under','again','further',
    'once','here','there','any','if','by','per','via','s','t','re','ll','ve','d',
}

NARRATIVE_GLOBS = [
    'content/*.js',
]

JS_STRING_RE = re.compile(r'`([^`]*)`|"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*)\'' , re.DOTALL)
WORD_RE = re.compile(r"[a-z']{3,}")

def extract_strings_from_js(text):
    parts = []
    for m in JS_STRING_RE.finditer(text):
        parts.append(m.group(1) or m.group(2) or m.group(3) or '')
    return ' '.join(parts)

def extract_from_html(text):
    # Pull BACKGROUNDS, GROUP_BACKSTORIES, ARCHETYPES objects — treat as raw text
    # Strip HTML tags and JS boilerplate, keep string content
    clean = re.sub(r'<[^>]+>', ' ', text)
    return clean

def count_words(text, min_length):
    words = WORD_RE.findall(text.lower())
    return Counter(w for w in words if w not in STOPWORDS and len(w) >= min_length and not w.startswith("'"))

def main():
    parser = argparse.ArgumentParser(description='Narrative word frequency analysis')
    parser.add_argument('--top', type=int, default=100, help='Number of top words to show')
    parser.add_argument('--min-length', type=int, default=4, help='Minimum word length')
    parser.add_argument('--no-stopwords', action='store_true', help='Include common stopwords')
    args = parser.parse_args()

    root = Path(__file__).parent.parent
    total = Counter()
    file_counts = {}

    # Content JS files
    for glob in NARRATIVE_GLOBS:
        for fp in sorted(root.glob(glob)):
            text = fp.read_text(encoding='utf-8-sig', errors='ignore')
            strings = extract_strings_from_js(text)
            c = count_words(strings, args.min_length)
            file_counts[fp.name] = c
            total.update(c)

    # Main HTML narrative sections
    html_path = root / 'ledger-of-ash.html'
    if html_path.exists():
        text = html_path.read_text(encoding='utf-8-sig', errors='ignore')
        strings = extract_strings_from_js(text)
        c = count_words(strings, args.min_length)
        file_counts['ledger-of-ash.html'] = c
        total.update(c)

    print(f"\n{'='*60}")
    print(f"TOP {args.top} MOST-USED WORDS (min length: {args.min_length})")
    print(f"Across {len(file_counts)} files, {sum(total.values()):,} total word tokens")
    print(f"{'='*60}\n")
    print(f"{'Rank':<6} {'Word':<25} {'Count':>8}")
    print(f"{'-'*6} {'-'*25} {'-'*8}")
    for rank, (word, count) in enumerate(total.most_common(args.top), 1):
        print(f"{rank:<6} {word:<25} {count:>8}")

    print(f"\n{'='*60}")
    print("TOP 20 WORDS BY FILE (diagnostic — which files drive overuse)")
    print(f"{'='*60}")
    for fname, c in sorted(file_counts.items()):
        top5 = ', '.join(f"{w}({n})" for w, n in c.most_common(5))
        print(f"  {fname:<50} {top5}")

if __name__ == '__main__':
    main()
