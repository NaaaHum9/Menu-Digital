from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

#Conexion a la base de datos
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

#Rutas de get, post y delete para SOPA
@app.route('/sopa', methods = ["GET"])
def get_sopa():
    conn = get_db_connection()
    sopa = conn.execute("SELECT * FROM sopa").fetchall()
    conn.close()
    return jsonify([dict(row) for row in sopa])

@app.route('/sopa', methods = ['POST'])
def add_sopas():
    data = request.get_json()
    sopa_nombre = data.get("nombre")
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO sopa (nombre) VALUES (?)", (sopa_nombre,))
    conn.commit()
    sopa_id = cur.lastrowid
    conn.close()
    return jsonify({"id": sopa_id, "nombre": sopa_nombre})

@app.route('/sopa/<int:sopa_id>', methods = ["DELETE"])
def delete_sopa(sopa_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM sopa WHERE id = ?", (sopa_id, ))
    conn.commit()
    conn.close()
    return "", 204

#GET - POST - DELETE para ARROZ
@app.route('/arroz', methods =["GET"])
def get_arroz():
    conn = get_db_connection()
    arroz = conn.execute("SELECT * FROM arroz").fetchall()
    conn.close()
    return jsonify([dict(row) for row in arroz])

@app.route('/arroz', methods=["POST"])
def add_arroz():
    data = request.get_json()
    arroz_nombre = data.get("nombre")
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO arroz (nombre) VALUES (?)", (arroz_nombre, ))
    conn.commit()
    arroz_id = cur.lastrowid
    conn.close()
    return jsonify({
        "id": arroz_id, 
        "nombre": arroz_nombre
    })

@app.route('/arroz/<int:arroz_id>', methods=["DELETE"])
def delete_arroz(arroz_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM arroz WHERE id = ?", (arroz_id, ))
    conn.commit()
    conn.close()
    return "", 204

# GET - POST - DELETE para GUISO
@app.route('/guiso', methods=["GET"])
def get_guiso():
    conn = get_db_connection()
    guiso = conn.execute("SELECT * FROM guiso").fetchall()
    conn.close()
    return jsonify([dict(row) for row in guiso])

@app.route('/guiso', methods=["POST"])
def add_guiso():
    data = request.get_json()
    guiso_nombre = data.get("nombre")
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO guiso (nombre) VALUES (?)", (guiso_nombre, ))
    conn.commit()
    guiso_id = cur.lastrowid
    conn.close()
    return jsonify({
        "id": guiso_id,
        "nombre": guiso_nombre
    })

@app.route('/guiso/<int:guiso_id>', methods=["DELETE"])
def delete_guiso(guiso_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM guiso WHERE id = ?", (guiso_id,))
    conn.commit()
    conn.close()
    return "", 204

# Login route
@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM usuarios WHERE username = ? AND password = ?", (username, password)).fetchone()
    conn.close()
    
    if user:
        return jsonify({"success": True, "message": "Login exitoso"})
    else:
        return jsonify({"success": False, "message": "Credenciales invalidas"}), 401

if __name__ == "__main__":
    app.run(debug=True)


