import Container from "@/components/Container";
import SingleProduct from "../../../components/SingleProduct";

const SingleProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!id) {
    return (
      <Container className="py-10">
        <p className="text-center text-red-500">No product ID provided</p>
      </Container>
    );
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }

    const product = await res.json();

    return (
      <Container className="py-10">
        <SingleProduct product={product} />
      </Container>
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    return (
      <Container className="py-10">
        <p className="text-center text-red-500">Error loading product data</p>
      </Container>
    );
  }
};

export default SingleProductPage;
