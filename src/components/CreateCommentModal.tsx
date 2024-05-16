import { FormEventHandler, forwardRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Product } from "../types/models";
import { createComment } from "../store/productSlice";

import { IFDialog } from "./ui/IFDialog";
import { IFInput } from "./ui/IFInput";
import { IFButton } from "./ui/IFButton";

export interface Props {
  productId: Product["id"];
  onCreated: () => void;
  onClose: () => void;
}

export const CreateCommentModal = forwardRef<HTMLDialogElement, Props>(
  ({ productId, onCreated, onClose }, ref) => {
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();

      dispatch(createComment({ id: productId, comment }));

      onCreated();
    };

    return (
      <IFDialog className="p-4 rounded max-w-sm w-full" ref={ref}>
        <h1 className="text-3xl font-bold">Create Comment</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <IFInput
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <IFButton type="submit" className="self-start" variant="success">
              Create
            </IFButton>
            <IFButton
              onClick={onClose}
              type="reset"
              className="self-start"
              variant="danger"
            >
              Cancel
            </IFButton>
          </div>
        </form>
      </IFDialog>
    );
  }
);
