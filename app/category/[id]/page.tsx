import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import { fetchData } from "@/hooks/fetchdata";

const CategoryPage = async ({ params, }: { params: Promise<{ id: string }> }) => {
  const endpoint = "https://dummyjson.com/products/category-list";
  const categories = await fetchData(endpoint);
  const { id } = await params;

  return (
    <Container className="py-10">
      <CategoryProducts categories={categories} id={id} />
    </Container>
  );
};

export default CategoryPage;