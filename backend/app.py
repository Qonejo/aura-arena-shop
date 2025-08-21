import os
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esto habilita CORS para todas las rutas y orígenes

# Obtenemos la ruta absoluta del directorio actual
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# Construimos la ruta al archivo de datos
DATA_FILE = os.path.join(BASE_DIR, 'data', 'productos.json')

def transform_product(product):
    """
    Transforma un producto del formato de la base de datos (JSON)
    al formato esperado por el frontend.
    """
    return {
        "id": str(product.get("id")),
        "nombre": product.get("name"),
        "descripcion": product.get("description"),
        "precio": product.get("price"),
        "stock": product.get("stock", 99),  # Añadimos un valor de stock por defecto
        "imagen": product.get("image"),
        "promocion": product.get("promotion", False),
        "aura_multiplier": product.get("aura_points")
    }

@app.route('/api/products', methods=['GET'])
def get_products():
    """
    Endpoint para obtener la lista de productos.
    """
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            products_data = json.load(f)

        transformed_products = [transform_product(p) for p in products_data]
        return jsonify(transformed_products)
    except FileNotFoundError:
        return jsonify({"error": "El archivo de productos no fue encontrado."}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error al decodificar el archivo JSON de productos."}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Usamos el puerto 5001 para el backend para evitar conflictos con el frontend de Vite (que usa 5173)
    app.run(debug=True, port=5001)
