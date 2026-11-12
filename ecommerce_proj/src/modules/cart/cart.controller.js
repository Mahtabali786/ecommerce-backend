import { asyncHandler } from "../../shared/utils/async-handler.js";
import { cartService } from "./cart.service.js";

export const getCart = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await cartService.get(req.user.userId) });
});

export const addCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = res.locals.validated.body;
  const item = await cartService.addItem(req.user.userId, productId, quantity);
  res.status(201).json({ success: true, data: item });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = res.locals.validated.params;
  const { quantity } = res.locals.validated.body;
  const item = await cartService.updateItem(req.user.userId, itemId, quantity);
  res.json({ success: true, data: item });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  await cartService.removeItem(
    req.user.userId,
    res.locals.validated.params.itemId,
  );
  res.json({ success: true, message: "Cart item removed" });
});
