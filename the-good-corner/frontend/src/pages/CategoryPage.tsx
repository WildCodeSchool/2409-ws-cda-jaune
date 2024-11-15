import AdGallery from "../organisms/AdGallery";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_ADS_BY_CATGEGORY = gql`
query Query($categoryId: String!) {
  getAdsByCategory(categoryId: $categoryId) {
    id
    title
    price
    picture
  }
}
`;

export default function CategoryPage() {
	const { catId } = useParams();
	const { loading, error, data } = useQuery(GET_ADS_BY_CATGEGORY, {
		variables: { categoryId: catId },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Aw fck, something broke !</p>;

	return (
		<AdGallery
			title={`Annonces de la catégorie n°${catId}`}
			ads={data.getAdsByCategory}
		/>
	);
}
