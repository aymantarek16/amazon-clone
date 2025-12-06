import { auth } from "@/auth";
import CartProducts from "@/components/CartProducts";
import Container from "@/components/Container";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cart | Amazon online shopping",
  description: "Amazon clone for learning purpose",
};

const CartPage = async () => {
  const session = await auth();
  if(!session) return redirect('/login');

  return <Container className="py-10">
    <CartProducts />
  </Container>;
};

export default CartPage;