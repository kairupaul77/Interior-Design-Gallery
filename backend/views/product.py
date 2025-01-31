from flask import jsonify, request, Blueprint
from models import db, Product, ProductImage, Cart, Order, User  # Ensure models are imported correctly
from flask_jwt_extended import jwt_required, get_jwt_identity

product_bp = Blueprint("product_bp", __name__)

# ==================================PRODUCT======================================

# Add a new product (with optional images)
@product_bp.route("/add", methods=["POST"])
@jwt_required()
def add_product():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    stock_quantity = data.get('stock_quantity')
    images = data.get('https://i.pinimg.com/736x/0c/d3/d6/0cd3d6975f25335fef522a8c8d6100ac.jpg', [])  # List of image URLs (optional)

    if not name or not price or not stock_quantity:
        return jsonify({"error": "Missing required fields: name, price, stock_quantity"}), 400

    # Create new product
    new_product = Product(
        name=name,
        description=description,
        price=price,
        stock_quantity=stock_quantity
    )
    
    db.session.add(new_product)
    db.session.commit()

    # Add images for the new product if any
    for image_url in images:
        new_image = ProductImage(url=image_url, product_id=new_product.id)
        db.session.add(new_image)

    db.session.commit()

    return jsonify({"success": "Product added successfully"}), 201

# GET - Get All Products
@product_bp.route("/products", methods=["GET"])
@jwt_required()
def get_products():
    # Get the current user ID from the JWT token
    current_user_id = get_jwt_identity()

    # Fetch all products (or you can modify this to filter by user if needed)
    products = Product.query.all()  # Modify the query if needed

    product_list = []

    for product in products:
        # You can filter, update or change logic depending on what you need to do with the products

        product_data = {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "stock_quantity": product.stock_quantity,
            "created_at": product.created_at,
            "images": [{"id": img.id, "url": img.url} for img in product.images],  # Assuming images are related to products
            # If you have any more logic to add for each product, do it here
        }
        
        # Append the product data to the product list
        product_list.append(product_data)

    # Return the list of products as a JSON response
    return jsonify(product_list), 200

# GET - Get Product by ID (with images)
@product_bp.route("/<int:product_id>", methods=["GET"])
@jwt_required()
def get_product(product_id):
    current_user_id = get_jwt_identity()

    # Fetch a specific product by ID
    product = Product.query.filter_by(id=product_id).first()

    if not product:
        return jsonify({"error": "Product not found"}), 404

    product_details = {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "stock_quantity": product.stock_quantity,
        "created_at": product.created_at,
        "images": [{"id": img.id, "url": img.url} for img in product.images]
    }

    return jsonify(product_details), 200

# PUT - Update Product
@product_bp.route("/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_product(product_id):
    current_user_id = get_jwt_identity()

    # Get the product data to update
    data = request.get_json()
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Allow updates to specific fields
    name = data.get('name', product.name)
    description = data.get('description', product.description)
    price = data.get('price', product.price)
    stock_quantity = data.get('stock_quantity', product.stock_quantity)
    images = data.get('images', [])  # List of image URLs to update

    product.name = name
    product.description = description
    product.price = price
    product.stock_quantity = stock_quantity

    db.session.commit()

    # Update images if provided
    for image_url in images:
        new_image = ProductImage(url=image_url, product_id=product.id)
        db.session.add(new_image)

    db.session.commit()

    return jsonify({"success": "Product updated successfully"}), 200

# DELETE - Delete Product
@product_bp.route("/<int:product_id>", methods=["DELETE"])
@jwt_required()
def delete_product(product_id):
    current_user_id = get_jwt_identity()

    # Find the product to delete
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Delete related images
    ProductImage.query.filter_by(product_id=product.id).delete()

    db.session.delete(product)
    db.session.commit()

    return jsonify({"success": "Product deleted successfully"}), 200

# ==================================CART=========================================

# Add a product to cart
@product_bp.route("/cart/add", methods=["POST"])
@jwt_required()
def add_to_cart():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    # Ensure product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Ensure product is in stock
    if product.stock_quantity < quantity:
        return jsonify({"error": "Not enough stock available"}), 400

    # Add product to cart
    cart_item = Cart.query.filter_by(user_id=current_user_id, product_id=product_id).first()

    if cart_item:
        cart_item.quantity += quantity  # Increase quantity if the product is already in the cart
    else:
        new_cart_item = Cart(user_id=current_user_id, product_id=product_id, quantity=quantity)
        db.session.add(new_cart_item)

    db.session.commit()
    return jsonify({"success": "Product added to cart"}), 200

# GET - View Cart (for the logged-in user)
@product_bp.route("/cart", methods=["GET"])
@jwt_required()
def view_cart():
    current_user_id = get_jwt_identity()

    # Fetch cart items for the current user
    cart_items = Cart.query.filter_by(user_id=current_user_id).all()

    cart_list = [
        {
            "product_id": cart_item.product_id,
            "name": cart_item.product.name,
            "quantity": cart_item.quantity,
            "price": cart_item.product.price,
            "total_price": cart_item.quantity * cart_item.product.price
        } for cart_item in cart_items
    ]

    return jsonify(cart_list), 200

# Checkout (create an order from the cart)
@product_bp.route("/checkout", methods=["POST"])
@jwt_required()
def checkout():
    current_user_id = get_jwt_identity()

    # Fetch all cart items for the user
    cart_items = Cart.query.filter_by(user_id=current_user_id).all()
    if not cart_items:
        return jsonify({"error": "Cart is empty"}), 400

    total_price = sum(cart_item.quantity * cart_item.product.price for cart_item in cart_items)

    # Create the order
    new_order = Order(user_id=current_user_id, total_price=total_price)
    db.session.add(new_order)
    db.session.commit()

    # Move cart items to order
    for cart_item in cart_items:
        cart_item.order_id = new_order.id

    db.session.commit()

    # Clear cart
    Cart.query.filter_by(user_id=current_user_id).delete()
    db.session.commit()

    return jsonify({"success": "Order placed successfully", "order_id": new_order.id}), 200
