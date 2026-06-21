import { notFound } from "next/navigation";
import { getTourBySlug } from "@/data/tours";
import { getReviewsByTourId } from "@/data/reviews";
import TourDetailsClient from "@/components/tours/TourDetailsClient";

export default async function TourDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = getTourBySlug(id);

  if (!tour) {
    notFound();
  }

  const reviews = getReviewsByTourId(tour.id);

  return <TourDetailsClient tour={tour} reviews={reviews} />;
}
