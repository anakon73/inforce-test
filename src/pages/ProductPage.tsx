import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../store";
import { ProductCard } from "../components/ProductCard";
import { CreateCommentModal } from "../components/CreateCommentModal";
import { IFButton } from "../components/ui/IFButton";
import { CreateProductModal } from "../components/CreateProductModal";
import { CommentCard } from "../components/CommentCard";

export const ProductPage = () => {
  const createCommentDialogRef = useRef<HTMLDialogElement>(null);
  const editProductDialogRef = useRef<HTMLDialogElement>(null);

  const { id } = useParams<"id">();

  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === +id!)
  );

  function toggleCreateCommentDialog() {
    if (!createCommentDialogRef.current) {
      return;
    }

    createCommentDialogRef.current.hasAttribute("open")
      ? createCommentDialogRef.current.close()
      : createCommentDialogRef.current.showModal();
  }

  function toggleEditProductDialog() {
    if (!editProductDialogRef.current) {
      return;
    }

    editProductDialogRef.current.hasAttribute("open")
      ? editProductDialogRef.current.close()
      : editProductDialogRef.current.showModal();
  }

  if (!product) {
    return "404";
  }

  return (
    <>
      <CreateCommentModal
        productId={product.id}
        onClose={toggleCreateCommentDialog}
        onCreated={toggleCreateCommentDialog}
        ref={createCommentDialogRef}
      />

      <CreateProductModal
        product={product}
        onClose={toggleEditProductDialog}
        onUpdated={toggleEditProductDialog}
        ref={editProductDialogRef}
      />

      <div className="flex gap-2 mb-2">
        <ProductCard
          hideReadMore
          count={product.count}
          id={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
        />
        <div className="flex flex-col gap-2">
          <div>
            Size:
            <p className="pl-2">Width: {product.size.width}</p>
            <p className="pl-2">Height: {product.size.height}</p>
          </div>
          <div>Weight: {product.weight}</div>
        </div>
      </div>

      <IFButton onClick={toggleEditProductDialog} className="mb-10">
        Edit
      </IFButton>

      <div className="mb-10">
        <IFButton onClick={toggleCreateCommentDialog}>Add Comment</IFButton>

        <div className="mt-4 flex flex-col gap-3">
          {product.comments.map((c) => (
            <CommentCard
              date={c.date}
              description={c.description}
              id={c.id}
              productId={product.id}
              key={c.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
