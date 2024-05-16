import { Link } from "react-router-dom";
import { useRef } from "react";

import { IFButton } from "./ui/IFButton";
import { DeleteModal } from "./DeleteModal";

export interface Props {
  name: string;
  imageUrl: string;
  count: number;
  id: number;
  hideReadMore?: boolean;
}

export const ProductCard = ({
  name,
  count,
  imageUrl,
  id,
  hideReadMore,
}: Props) => {
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  function toggleDeleteDialog() {
    if (!deleteDialogRef.current) {
      return;
    }

    deleteDialogRef.current.hasAttribute("open")
      ? deleteDialogRef.current.close()
      : deleteDialogRef.current.showModal();
  }

  return (
    <div className="p-4 shadow rounded-xl max-w-96 flex flex-col gap-3">
      <img
        src={imageUrl}
        alt="product image"
        className="max-w-96 rounded h-52 object-cover"
      />
      <h2 className="text-semibold text-xl">{name}</h2>
      <div>
        {count ? (
          <div className="text-green-600">{count} available</div>
        ) : (
          <div className="text-red-600">Not available</div>
        )}
      </div>
      <div className="flex gap-2">
        {!hideReadMore && (
          <Link to={`/${id}`}>
            <IFButton>READ MORE</IFButton>
          </Link>
        )}
        <IFButton onClick={toggleDeleteDialog} variant="danger">
          Delete
        </IFButton>
      </div>
      <DeleteModal
        ref={deleteDialogRef}
        productId={id}
        onClose={toggleDeleteDialog}
        onDeleted={toggleDeleteDialog}
      />
    </div>
  );
};
