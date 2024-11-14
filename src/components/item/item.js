import React from 'react';
import { Link } from 'react-router-dom';
import '../css/item.css';

export default function Item({ product }) {
    return (
        <div className="item">
            <Link to={`/product-detail/${product.id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            <div>
                <Link to={`/product-detail/${product.id}`}>
                    <p>{product.name}: {product.description}</p>
                </Link>
            </div>
            <div>
                <Link to={`/product-detail/${product.id}`}>Learn More</Link>
            </div>
        </div>
    );
}