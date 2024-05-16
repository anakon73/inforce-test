import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Product } from "../types/models";
import { deleteProduct } from "../store/productSlice";

import { IFDialog } from "./ui/IFDialog";
import { IFButton } from "./ui/IFButton";

export interface Props {
  productId: Product["id"];
  onDeleted: () => void;
  onClose: () => void;
}

export const DeleteModal = forwardRef<HTMLDialogElement, Props>(
  ({ productId, onDeleted, onClose }, ref) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(deleteProduct(productId));
      onDeleted();
    };

    return (
      <IFDialog className="p-4 rounded max-w-sm w-full" ref={ref}>
        <h1 className="text-3xl font-bold mb-2">Delete Product</h1>

        <p className="mb-4">Are you sure to delete product</p>

        <div className="flex gap-2 justify-end">
          <Link to={"/"}>
            <IFButton onClick={onDelete} variant="regular">
              Confirm
            </IFButton>
          </Link>
          <IFButton onClick={onClose} variant="danger">
            Cancel
          </IFButton>
        </div>
      </IFDialog>
    );
  }
);
