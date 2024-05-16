import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { Product } from "./types/models";
import { useDispatch } from "react-redux";
import { setProducts } from "./store/productSlice";

const initialProducts: Product[] = [
  {
    id: 1,
    name: "V12 Engine",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/800px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg",
    count: 10,
    comments: [],
    size: {
      height: 100,
      width: 100,
    },
    weight: "200g",
  },
  {
    id: 2,
    name: "V12 Engine",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/800px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg",
    count: 10,
    comments: [],
    size: {
      height: 100,
      width: 100,
    },
    weight: "200g",
  },
  {
    id: 3,
    name: "V12 Engine",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/800px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg",
    count: 0,
    comments: [],
    size: {
      height: 100,
      width: 100,
    },
    weight: "200g",
  },
  {
    id: 4,
    name: "V12 Engine",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/800px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg",
    count: 10,
    comments: [],
    size: {
      height: 100,
      width: 100,
    },
    weight: "200g",
  },
  {
    id: 5,
    name: "V12 Engine",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/800px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg",
    count: 10,
    comments: [],
    size: {
      height: 100,
      width: 100,
    },
    weight: "200g",
  },
  {
    id: 6,
    name: "V12 Engine",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/800px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg",
    count: 0,
    comments: [],
    size: {
      height: 100,
      width: 100,
    },
    weight: "200g",
  },
  {
    id: 7,
    name: "V12 Engine",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/800px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg",
    count: 10,
    comments: [],
    size: {
      height: 100,
      width: 100,
    },
    weight: "200g",
  },
  {
    id: 8,
    name: "V12 Engine",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/800px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg",
    count: 10,
    comments: [],
    size: {
      height: 100,
      width: 100,
    },
    weight: "200g",
  },
];

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const productsSaved = localStorage.getItem("products");

    const products = productsSaved
      ? (JSON.parse(productsSaved) as Product[])
      : initialProducts;

    dispatch(setProducts(products));
  }, [dispatch]);

  return (
    <div className="max-w-[1440px] px-5 xl:px-[150px] mx-auto mt-10">
      <Outlet />
    </div>
  );
};
