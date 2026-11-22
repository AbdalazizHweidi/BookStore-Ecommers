import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import FormField from "../components/FormField";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
import { useCartSummary } from "../hooks/useCartSummary";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { COUNTRIES } from "../schemas/checkoutSchema";
import { useCartStore } from "../store/cartStore";
import type { CompletedOrder } from "../types/order";
import { generateOrderReference } from "../utils/orderReference";

export default function CheckoutPage() {
  const { lines, subtotal, shipping, total } = useCartSummary();
  const clearCart = useCartStore((state) => state.clearCart);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  const { values, errors, handleChange, handleSubmit } = useCheckoutForm((customer) => {
    if (lines.length === 0) return; // never place an order for an empty cart
    setCompletedOrder({
      reference: generateOrderReference(),
      placedAt: new Date().toISOString(),
      customer,
      lines, // a copy of the cart lines, saved before the cart is cleared
      subtotal,
      shipping,
      total,
    });
    clearCart(); // the wishlist is not touched
  });

  // ---- 1. After a successful order: confirmation ----
  if (completedOrder) {
    const { customer } = completedOrder;
    const placedOn = new Date(completedOrder.placedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <>
        <PageHeader title="Order Confirmed" crumbs={[{ label: "Home", to: "/" }, { label: "Checkout" }]} />
        <div className="container-fluid pb-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="confirmation-box border p-4 p-md-5">
                  <i className="fa fa-check-circle fa-3x text-primary mb-3" aria-hidden="true"></i>
                  <h2 className="h2 mb-3">Thank you, {customer.fullName.split(" ")[0]}!</h2>
                  <p className="mb-4">Your order has been placed. This is a demo store, so nothing was charged or shipped.</p>
                  <p className="mb-1">Your order reference</p>
                  <p className="order-reference h3 text-primary mb-4">{completedOrder.reference}</p>
                  <p className="mb-1">
                    <strong>Placed on:</strong> {placedOn}
                  </p>
                  <p className="mb-1">
                    <strong>Delivering to:</strong> {customer.fullName}, {customer.address}, {customer.city}{" "}
                    {customer.postalCode}, {customer.country}
                  </p>
                  <p className="mb-4">
                    <strong>Contact:</strong> {customer.email}
                  </p>
                  <Link to="/books" className="btn btn-primary py-2 px-4 me-2">
                    Continue Shopping
                  </Link>
                  <Link to="/wishlist" className="btn btn-outline-primary py-2 px-4 mt-2 mt-sm-0">
                    View Wishlist
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <OrderSummary
                  lines={completedOrder.lines}
                  subtotal={completedOrder.subtotal}
                  shipping={completedOrder.shipping}
                  total={completedOrder.total}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ---- 2. Empty cart: checkout cannot continue ----
  if (lines.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" crumbs={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
        <div className="container-fluid pb-5">
          <div className="container">
            <EmptyState
              icon="fa-shopping-cart"
              title="Your cart is empty"
              message="Add a book to your cart before checking out."
              actionLabel="Browse Books"
              actionTo="/books"
            />
          </div>
        </div>
      </>
    );
  }

  // ---- 3. The checkout form ----
  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
      <div className="container-fluid pb-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              {/* noValidate turns off the browser's own messages so our Zod messages are shown instead */}
              <form onSubmit={handleSubmit} noValidate aria-label="Delivery details">
                <h2 className="h4 mb-4">Delivery details</h2>
                <div className="row g-3">
                  <div className="col-12">
                    <FormField name="fullName" label="Full name" autoComplete="name" value={values.fullName} error={errors.fullName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="email" label="Email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="phone" label="Phone number" type="tel" autoComplete="tel" value={values.phone} error={errors.phone} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <FormField name="address" label="Street address" autoComplete="street-address" value={values.address} error={errors.address} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="city" label="City" autoComplete="address-level2" value={values.city} error={errors.city} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="postalCode" label="Postal code" autoComplete="postal-code" value={values.postalCode} error={errors.postalCode} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <FormField name="country" label="Country" autoComplete="country-name" options={COUNTRIES} value={values.country} error={errors.country} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <FormField name="deliveryNotes" label="Delivery notes" multiline optional value={values.deliveryNotes} error={errors.deliveryNotes} onChange={handleChange} />
                  </div>
                </div>

                <p className="small mt-4 mb-3">
                  No payment is taken. This is a demo store, so you only enter delivery details.
                </p>
                <button type="submit" className="btn btn-primary py-2 px-5">
                  Place Order
                </button>
              </form>
            </div>

            <div className="col-lg-5">
              <OrderSummary lines={lines} subtotal={subtotal} shipping={shipping} total={total} />
              <Link to="/cart" className="btn btn-link px-0 mt-3">
                Back to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
