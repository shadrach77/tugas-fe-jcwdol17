"use client";
import CardComponent from "@/app/components/card.component";
import { IProduct } from "@/interfaces/product.interface";
import { api } from "@/utils/axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function page({ params }: Props) {
  const path = usePathname().split("/");
  const slug = path[path.length - 1];
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/products", {
          params: {
            slug,
          },
        });
        if (res.data.length) setProduct(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (slug) fetch();
  }, [slug]);
  return (
    <center className="max-w-screen-sm">
      {product ? <CardComponent {...product} /> : "product not found"}
    </center>
  );
}
