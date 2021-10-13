CREATE TABLE IF NOT EXISTS traducciones(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src TEXT, 
    dest TEXT,
    texto TEXT,
    traduccion TEXT
);