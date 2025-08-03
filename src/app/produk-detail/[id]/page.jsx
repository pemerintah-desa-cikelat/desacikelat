import ProdukDetailClient from '../../../components/ProdukDetailClient';

export default function Page({ params }) {
  const { id } = params;
  return <ProdukDetailClient id={id} />;
}
