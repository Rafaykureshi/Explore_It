import pandas as pd
import numpy as np
import json
import sqlite3
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
from xgboost import XGBClassifier
import warnings
warnings.filterwarnings('ignore')

class ExploreItAI:
    def __init__(self):
        self.setup_database()
        self.initialize_models()
        self.user_profiles = {}
        self.interaction_weights = {
            'view': 1.0,
            'click': 2.0,
            'bookmark': 3.0,
            'share': 4.0,
            'attend': 5.0
        }

    def setup_database(self):
        self.conn = sqlite3.connect(':memory:')
        cursor = self.conn.cursor()

        cursor.execute('''
            CREATE TABLE user_profiles (
                user_id TEXT PRIMARY KEY,
                age INTEGER,
                initial_interests TEXT,
                created_at TIMESTAMP,
                total_interactions INTEGER DEFAULT 0
            )
        ''')
        cursor.execute('''
            CREATE TABLE user_interactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                event_id TEXT,
                interaction_type TEXT,
                duration INTEGER,
                timestamp TIMESTAMP,
                event_category TEXT,
                satisfaction_rating INTEGER
            )
        ''')
        cursor.execute('''
            CREATE TABLE search_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                search_query TEXT,
                results_clicked TEXT,
                timestamp TIMESTAMP,
                search_success BOOLEAN
            )
        ''')
        self.conn.commit()

    def initialize_models(self):
        self.vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        self.satisfaction_model = XGBClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.events_data = self.generate_sample_events()
        self.train_initial_models()

    def generate_sample_events(self):
        categories = [
            "Adventure Sports", "Cultural Heritage", "Music Festivals", "Food & Dining",
            "Art Exhibitions", "Beach Activities", "Mountain Hiking", "Historical Tours",
            "Wildlife Safari", "Photography Workshops", "Spiritual Retreats", "Wine Tasting",
            "Water Sports", "City Walking Tours", "Night Markets", "Local Festivals"
        ]
        events = []
        for i in range(200):
            category = np.random.choice(categories)
            events.append({
                'event_id': f'event_{i:03d}',
                'name': f'{category} Experience {i}',
                'category': category,
                'description': f'Amazing {category.lower()} experience with local guides',
                'location': f'Location {i%20}',
                'price': np.random.randint(20, 200),
                'rating': np.random.uniform(3.5, 5.0),
                'popularity_score': np.random.uniform(0.1, 1.0)
            })
        return pd.DataFrame(events)

    def onboard_new_user(self, user_id, age, preferences=None):
        if preferences is None:
            preferences = self.interactive_preference_collection()
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO user_profiles (user_id, age, initial_interests, created_at)
            VALUES (?, ?, ?, ?)
        ''', (user_id, age, json.dumps(preferences), datetime.now()))
        self.conn.commit()
        self.user_profiles[user_id] = {
            'age': age,
            'interests': preferences,
            'interaction_history': [],
            'search_patterns': {},
            'preference_weights': {pref: 1.0 for pref in preferences},
            'last_updated': datetime.now()
        }
        return self.get_recommendations(user_id, bootstrap=True)

    def interactive_preference_collection(self):
        categories = [
            "Adventure Sports", "Cultural Heritage", "Music Festivals", "Food & Dining",
            "Art Exhibitions", "Beach Activities", "Mountain Hiking", "Historical Tours",
            "Wildlife Safari", "Photography Workshops", "Spiritual Retreats", "Wine Tasting"
        ]
        return list(np.random.choice(categories, np.random.randint(3, 6), replace=False))

    def track_user_interaction(self, user_id, event_id, interaction_type, duration=None, satisfaction=None):
        if user_id not in self.user_profiles:
            return
        event = self.events_data[self.events_data['event_id'] == event_id]
        if event.empty:
            return
        event_category = event.iloc[0]['category']
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO user_interactions 
            (user_id, event_id, interaction_type, duration, timestamp, event_category, satisfaction_rating)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, event_id, interaction_type, duration, datetime.now(), event_category, satisfaction))
        self.conn.commit()
        self.update_user_preferences(user_id, event_category, interaction_type, duration)

    def update_user_preferences(self, user_id, event_category, interaction_type, duration):
        user_profile = self.user_profiles[user_id]
        base_score = self.interaction_weights.get(interaction_type, 1.0)
        duration_bonus = min(duration / 300, 2.0) if duration else 1.0
        interaction_score = base_score * duration_bonus
        if event_category in user_profile['preference_weights']:
            user_profile['preference_weights'][event_category] += interaction_score * 0.1
        else:
            user_profile['preference_weights'][event_category] = interaction_score * 0.1
        user_profile['interaction_history'].append({
            'category': event_category,
            'type': interaction_type,
            'score': interaction_score,
            'timestamp': datetime.now()
        })
        user_profile['interaction_history'] = user_profile['interaction_history'][-100:]
        user_profile['last_updated'] = datetime.now()
        self.apply_preference_decay(user_id)

    def apply_preference_decay(self, user_id):
        user_profile = self.user_profiles[user_id]
        for category in user_profile['preference_weights']:
            user_profile['preference_weights'][category] *= 0.95
            user_profile['preference_weights'][category] = max(0.1, user_profile['preference_weights'][category])

    def process_search_query(self, user_id, query, clicked_results=None):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO search_history (user_id, search_query, results_clicked, timestamp, search_success)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, query, json.dumps(clicked_results) if clicked_results else None, datetime.now(), clicked_results is not None))
        self.conn.commit()
        search_intent = self.extract_search_intent(query)
        if user_id in self.user_profiles:
            self.update_search_patterns(user_id, query, search_intent, clicked_results)
        return self.generate_search_results(query, user_id)

    def extract_search_intent(self, query):
        query_lower = query.lower()
        category_keywords = {
            'Adventure Sports': ['adventure', 'sports', 'extreme', 'thrill', 'climbing'],
            'Cultural Heritage': ['culture', 'heritage', 'traditional', 'history', 'museum'],
            'Music Festivals': ['music', 'festival', 'concert', 'band', 'live'],
            'Food & Dining': ['food', 'dining', 'restaurant', 'cuisine', 'cooking'],
            'Art Exhibitions': ['art', 'exhibition', 'gallery', 'painting', 'sculpture'],
            'Beach Activities': ['beach', 'ocean', 'sea', 'swimming', 'surfing'],
            'Mountain Hiking': ['mountain', 'hiking', 'trekking', 'trail', 'peak'],
            'Historical Tours': ['historical', 'tour', 'ancient', 'monument', 'castle']
        }
        return [cat for cat, keys in category_keywords.items() if any(k in query_lower for k in keys)]

    def update_search_patterns(self, user_id, query, intent, clicked_results):
        user_profile = self.user_profiles[user_id]
        for keyword in query.lower().split():
            user_profile['search_patterns'][keyword] = user_profile['search_patterns'].get(keyword, 0) + 1
        if clicked_results:
            for category in intent:
                user_profile['preference_weights'][category] = user_profile['preference_weights'].get(category, 0) + 0.2

    def generate_search_results(self, query, user_id):
        user_prefs = self.user_profiles.get(user_id, {}).get('preference_weights', {})
        query_lower = query.lower()
        matching = []
        for _, event in self.events_data.iterrows():
            score = 0
            if query_lower in event['name'].lower(): score += 3
            if query_lower in event['category'].lower(): score += 2
            if query_lower in event['description'].lower(): score += 1
            if event['category'] in user_prefs:
                score *= (1 + user_prefs[event['category']])
            if score > 0:
                matching.append({'event': event, 'relevance_score': score})
        return sorted(matching, key=lambda x: x['relevance_score'], reverse=True)[:10]

    def get_recommendations(self, user_id, num_recommendations=5, bootstrap=False):
        if user_id not in self.user_profiles:
            return []
        profile = self.user_profiles[user_id]
        weights = profile['preference_weights']
        event_scores = []
        for _, event in self.events_data.iterrows():
            score = self.calculate_event_score(event, weights, profile, bootstrap)
            event_scores.append({'event': event, 'score': score})
        event_scores.sort(key=lambda x: x['score'], reverse=True)
        return [
            {
                'event_id': item['event']['event_id'],
                'name': item['event']['name'],
                'category': item['event']['category'],
                'score': item['score'],
                'reason': self.generate_recommendation_reason(item['event'], weights)
            }
            for item in event_scores[:num_recommendations]
        ]

    def calculate_event_score(self, event, weights, profile, bootstrap):
        base = event['popularity_score'] * 0.3 + (event['rating'] / 5.0) * 0.2
        pref_score = weights.get(event['category'], 0.1) * 0.4
        inter_bonus = self.calculate_interaction_bonus(event, profile) if not bootstrap else 0
        diversity = self.calculate_diversity_factor(event, profile)
        return base + pref_score + inter_bonus + diversity

    def calculate_interaction_bonus(self, event, profile):
        history = profile.get('interaction_history', [])
        similar = [i for i in history if i['category'] == event['category']]
        if similar:
            return min(np.mean([i['score'] for i in similar]) * 0.1, 0.3)
        return 0

    def calculate_diversity_factor(self, event, profile):
        history = profile.get('interaction_history', [])[-20:]
        same = [i for i in history if i['category'] == event['category']]
        if len(same) > 5:
            return -0.1
        elif not same:
            return 0.1
        return 0

    def generate_recommendation_reason(self, event, weights):
        cat = event['category']
        if weights.get(cat, 0) > 1.0:
            return f"Based on your interest in {cat}"
        if event['rating'] > 4.5:
            return f"Highly rated {cat} experience"
        if event['popularity_score'] > 0.8:
            return f"Popular {cat} activity"
        return f"Recommended {cat} experience"

    def train_initial_models(self):
        sample_data = []
        for _ in range(1000):
            age = np.random.randint(18, 70)
            acc = np.random.uniform(60, 95)
            engage = np.random.uniform(0.1, 1.0)
            score = 3 + (acc - 60) / 20 + engage
            sample_data.append([age, acc, engage, int(min(5, max(3, score)))])
        df = pd.DataFrame(sample_data, columns=['age', 'rec_accuracy', 'engagement', 'satisfaction'])
        X = df[['age', 'rec_accuracy', 'engagement']]
        y = df['satisfaction'] - 3
        self.satisfaction_model.fit(X, y)
