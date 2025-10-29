import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { resetOrderModalData, createOrder } from '../../services/slices/orders';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector((state) => state.builder);

  const { orderRequest, orderModalData } = useSelector((state) => state.orders);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const data = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient.id),
      constructorItems.bun?._id
    ];
    dispatch(createOrder(data));
  };
  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
