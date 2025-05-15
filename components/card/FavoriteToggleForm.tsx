'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { toggleFavoriteAction } from '@/utils/actions';
import { CardToggleFavesButton } from '../form/Buttons';

type FavoriteToggleFormProps = {
  carId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({
  carId,
  favoriteId,
}: FavoriteToggleFormProps) {

  const pathname = usePathname();

  const toggleAction = toggleFavoriteAction.bind(null, {
    carId,
    favoriteId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <CardToggleFavesButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;