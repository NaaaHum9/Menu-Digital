import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

"""
# Tabla SOPA
cursor.execute('''
CREATE TABLE sopa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
)
''')

# Tabla ARROZ
cursor.execute('''
CREATE TABLE arroz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
)
''')

# Tabla GUISADOS
cursor.execute('''
CREATE TABLE guiso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
)
''')


# Tabla de usuarios 
cursor.execute('''
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)
''')
"""

cursor.execute('''
INSERT INTO usuarios (username, password) values ('admin', '1234')
''')


conn.commit()
conn.close()