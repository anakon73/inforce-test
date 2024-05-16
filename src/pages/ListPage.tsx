import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import { IFButton } from "../components/ui/IFButton";
import { ProductCard } from "../components/ProductCard";
import { CreateProductModal } from "../components/CreateProductModal";

type Sort = "name" | "count";

export const ListPage = () => {
  const createDialogRef = useRef<HTMLDialogElement>(null);

  const [sort, setSort] = useState<Sort>("name");

  const products = useSelector((state: RootState) => {
    return state.products.products.toSorted((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      else return b.count - a.count;
    });
  });

  function toggleCreateDialog() {
    if (!createDialogRef.current) {
      return;
    }

    createDialogRef.current.hasAttribute("open")
      ? createDialogRef.current.close()
      : createDialogRef.current.showModal();
  }

  return (
    <>
      <CreateProductModal
        onClose={toggleCreateDialog}
        onUpdated={toggleCreateDialog}
        ref={createDialogRef}
      />

      <div className="flex gap-2">
        <IFButton onClick={toggleCreateDialog} variant="success">
          Add
        </IFButton>
        <select onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="name">By Name</option>
          <option value="count">By Count</option>
        </select>
      </div>

      <div className="min-[400px]:grid grid-cols-2 md:grid-cols-3 gap-3 mb-10 mt-4">
        {products.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            count={product.count}
            name={product.name}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </>
  );
};
