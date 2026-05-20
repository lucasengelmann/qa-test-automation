import { Trend, Rate } from 'k6/metrics';

export const loginDuration = new Trend('login_duration');
export const loginErrors = new Rate('login_errors');

export const productsDuration = new Trend('products_duration');
export const productsErrors = new Rate('products_errors');

export const checkoutDuration = new Trend('checkout_duration');
export const checkoutErrors = new Rate('checkout_errors');