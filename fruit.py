import sqlite3
import os

def init_db():
    # Create database directory if it doesn't exist
    os.makedirs('database', exist_ok=True)
    
    # Connect to database
    conn = sqlite3.connect('database/fruit_reviews.db')
    cursor = conn.cursor()
    
    # Read and execute SQL file
    with open('database/fruit_reviews.sql', 'r') as sql_file:
        sql_script = sql_file.read()
        cursor.executescript(sql_script)
    
    # Commit changes and close connection
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()