import { useGetAdsQuery } from "../libs/graphql/generated/graphql-types";
import AdGallery from "../organisms/AdGallery";

export default function HomePage() {
  const { loading, error, data } = useGetAdsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Aw fck, something broke !</p>;
  if (!data) return <p>We found nothing to display.</p>;

  return (
    <>
      <AdGallery title="Annonces les plus récentes" ads={data.getAds} />
    </>
  );
}
