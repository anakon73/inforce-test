import { FormEventHandler, forwardRef, useEffect, useState } from "react";

import { IFDialog } from "./ui/IFDialog";
import { IFInput } from "./ui/IFInput";
import { IFButton } from "./ui/IFButton";
import { useDispatch } from "react-redux";
import { createProduct, editProduct } from "../store/productSlice";
import { Product } from "../types/models";

type Values = Omit<Product, "id" | "comments">;

const defaultValues: Values = {
  name: "",
  count: 0,
  imageUrl: "",
  size: {
    height: 0,
    width: 0,
  },
  weight: "",
};

export interface Props {
  product?: Product;
  onUpdated: () => void;
  onClose: () => void;
}

export const CreateProductModal = forwardRef<HTMLDialogElement, Props>(
  ({ product, onUpdated, onClose }, ref) => {
    const [values, setValues] = useState({ ...defaultValues });

    const dispatch = useDispatch();

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();

      if (!product) {
        dispatch(createProduct(values));
      } else {
        dispatch(editProduct({ ...values, id: product.id }));
      }

      onUpdated();
    };

    useEffect(() => {
      if (product) {
        setValues({ ...product });
      }
    }, [product]);

    return (
      <IFDialog className="p-4 rounded max-w-sm w-full" ref={ref}>
        <h1 className="text-3xl font-bold">Create Product</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <IFInput
              required
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Image</label>
            <IFInput
              type="url"
              required
              value={values.imageUrl}
              onChange={(e) =>
                setValues({ ...values, imageUrl: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Count</label>
            <IFInput
              type="number"
              required
              value={values.count}
              onChange={(e) => setValues({ ...values, count: +e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Width</label>
            <IFInput
              required
              min={0}
              type="number"
              value={values.size.width}
              onChange={(e) =>
                setValues({
                  ...values,
                  size: { ...values.size, width: +e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Height</label>
            <IFInput
              min={0}
              type="number"
              required
              value={values.size.height}
              onChange={(e) =>
                setValues({
                  ...values,
                  size: { ...values.size, height: +e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Weight</label>
            <IFInput
              required
              value={values.weight}
              onChange={(e) => setValues({ ...values, weight: e.target.value })}
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
