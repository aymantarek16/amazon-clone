import { auth } from "@/auth";
import Container from "@/components/Container";
import FavoriteProducts from "@/components/FavoriteProducts";
import Title from "@/components/Tilte";
import { redirect } from "next/navigation";
import React from "react";

const FavoritePage = async () => {
  const session = await auth();
  if (!session) return redirect("/login");

  return (
    <Container className="py-10">
      <Title className="text-amazonBlue text-2xl">Favorite Page</Title>
      <FavoriteProducts />
    </Container>
  );
};

export default FavoritePage;