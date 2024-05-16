import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductComment, Product } from "../types/models";

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

function syncProductsInLocalStorage(products: Product[]) {
  localStorage.setItem("products", JSON.stringify(products));
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.products = payload;
      syncProductsInLocalStorage(state.products);
    },
    createProduct: (
      state,
      { payload }: PayloadAction<Omit<Product, "id" | "comments">>
    ) => {
      state.products = [
        ...state.products,
        { ...payload, id: Date.now(), comments: [] },
      ];
      syncProductsInLocalStorage(state.products);
    },
    editProduct: (
      state,
      { payload }: PayloadAction<Omit<Product, "comments">>
    ) => {
      state.products = state.products.map((p) => {
        if (p.id === payload.id) {
          return { ...p, ...payload };
        } else {
          return p;
        }
      });
      syncProductsInLocalStorage(state.products);
    },
    deleteProduct: (state, { payload }: PayloadAction<Product["id"]>) => {
      state.products = state.products.filter((p) => p.id !== payload);
      syncProductsInLocalStorage(state.products);
    },
    createComment: (
      state,
      { payload }: PayloadAction<{ id: Product["id"]; comment: string }>
    ) => {
      let yourDate = new Date();
      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
      const date = yourDate.toISOString().split("T")[0];

      state.products
        .find((p) => p.id === payload.id)
        ?.comments.push({
          productId: payload.id,
          id: Date.now(),
          description: payload.comment,
          date,
        });
      syncProductsInLocalStorage(state.products);
    },
    deleteComment: (
      state,
      {
        payload,
      }: PayloadAction<{
        commentId: ProductComment["id"];
        productId: Product["id"];
      }>
    ) => {
      state.products = state.products.map((p) => {
        if (p.id === payload.productId) {
          return {
            ...p,
            comments: p.comments.filter((c) => c.id !== payload.commentId),
          };
        } else {
          return p;
        }
      });
      syncProductsInLocalStorage(state.products);
    },
  },
});

export const {
  setProducts,
  createProduct,
  deleteProduct,
  editProduct,
  createComment,
  deleteComment,
} = productsSlice.actions;

export default productsSlice.reducer;
