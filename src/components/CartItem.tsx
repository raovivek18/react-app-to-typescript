import { memo } from 'react';
import { useAppDispatch } from '../app/hooks';
import { increaseQuantity, decreaseQuantity } from '../features/cart/cartSlice';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as ICartItem } from '../types';
import './CartItem.css';

interface CartItemProps {
    item: ICartItem;
    onRemove: () => void;
}

const CartItem = memo(({ item, onRemove }: CartItemProps) => {
    const dispatch = useAppDispatch();

    const imageUrl = item.images[0]?.replace(/[\[\]"]/g, '') || 'https://via.placeholder.com/150';

    return (
        <div className="cart-item animate-fade-in">
            <div className="item-image-wrapper">
                <img src={imageUrl} alt={item.title} loading="lazy" />
            </div>

            <div className="item-content">
                <div className="item-info-main">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-detail">Size: <span>Large</span></p>
                    <p className="item-detail">Color: <span>White</span></p>
                    <div className="item-price">${item.price}</div>
                </div>

                <div className="item-actions-side">
                    <button
                        onClick={onRemove}
                        className="item-delete-btn"
                        aria-label="Remove item"
                    >
                        <Trash2 size={24} />
                    </button>

                    <div className="item-qty-selector">
                        <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="qty-btn"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={18} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="qty-btn"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CartItem;

