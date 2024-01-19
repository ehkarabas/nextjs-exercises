import TourInfo from "@/components/TourInfo";
import { getSingleTour } from "@/utils/actions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
const TourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);

  const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

  const { data } = await axios(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  return (
    <div>
      <Link href="/tours" className="btn btn-primary mb-12 uppercase">
        back to tours
      </Link>
      {tourImage ? (
        <div className="flex justify-center">
          <Image
            src={tourImage}
            width={300}
            height={300}
            className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
            alt={tour.title}
            priority
          />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};
export default TourPage;
