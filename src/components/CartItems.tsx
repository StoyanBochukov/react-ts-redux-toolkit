import { useAppSelector } from "../hooks/useSelector";
import { useAppDispatch } from "../hooks/dispatch";
import { type CartItem, addToCart, removeFromCart } from "../store/cart-slice";

export default function CartItems() {
  const { items } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch()

  const handleRemoveFromCart = (item: CartItem) => {
    dispatch(removeFromCart(item))
  };

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item))
  };

  const totalPrice = items.reduce((val, item) => val + item.price * item.quantity, 0).toFixed(2)

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}

     {items.length > 0 && (<ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleRemoveFromCart(item)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>)}

      <p id="cart-total-price">
        Cart Total: <strong>${totalPrice}</strong>
      </p>
    </div>
  );
}
