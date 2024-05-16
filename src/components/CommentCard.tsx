import { useDispatch } from "react-redux";

import { Product, ProductComment } from "../types/models";
import { deleteComment } from "../store/productSlice";

import { IFButton } from "./ui/IFButton";

export interface Props {
  id: ProductComment["id"];
  productId: Product["id"];
  date: string;
  description: string;
}

export const CommentCard = ({
  id,
  productId,
  date,
  description,
  ...props
}: Props) => {
  const dispatch = useDispatch();

  const onDeleteComment = (id: ProductComment["id"]) => {
    dispatch(deleteComment({ commentId: id, productId: productId }));
  };
  return (
    <div {...props} className="max-w-96 p-4 border rounded-xl">
      <p className="text-sm">{date}</p>
      <p>{description}</p>
      <IFButton
        className="mt-2"
        variant="danger"
        onClick={() => onDeleteComment(id)}
      >
        Delete
      </IFButton>
    </div>
  );
};
