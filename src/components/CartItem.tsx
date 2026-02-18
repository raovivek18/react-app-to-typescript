import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { increaseQuantity, decreaseQuantity } from '../features/cart/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as ICartItem } from '../types';
import './CartItem.css';

interface CartItemProps {
    item: ICartItem;
    onRemove: (item: ICartItem) => void;
}

const CartItem = React.memo(({ item, onRemove }: CartItemProps) => {
    const dispatch = useAppDispatch();

    const imageUrl = item.images?.[0]?.replace(/[\[\]"]/g, '') || 'https://via.placeholder.com/150';

    return (
        <div className="cart-item glass animate-fade-in">
            <div className="item-image-wrapper">
                <img src={imageUrl} alt={item.title} loading="lazy" />
            </div>

            <div className="item-info">
                <div className="item-meta">
                    <span className="item-category">{item.category?.name}</span>
                    <h3 className="item-title">{item.title}</h3>
                </div>

                <div className="item-price-row">
                    <span className="item-unit-price">${item.price}</span>
                </div>
            </div>

            <div className="item-controls">
                <div className="qty-selector">
                    <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="qty-action"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="qty-action"
                        aria-label="Increase quantity"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                <button
                    onClick={() => onRemove(item)}
                    className="item-remove-btn"
                    title="Remove from bag"
                    aria-label="Remove item"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="item-total-price">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
});

export default CartItem;

