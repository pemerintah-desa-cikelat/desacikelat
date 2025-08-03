import BeritaDetailClient from '../../../components/BeritaDetailClient';

export default function Page({ params }) {
  const id = params.id;
  return <BeritaDetailClient id={id} />;
}
