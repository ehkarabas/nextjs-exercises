import Link from "next/link";

const TourCard = ({ tour: { id, city, country, title, lang } }) => {
  return (
    <Link
      href={`/tours/${id}`}
      className="card card-compact rounded-xl bg-base-100 shadow-xl"
    >
      <div className="card-body items-center ">
        <h2 className="card-title text-center text-base text-wrap">
          {city}, {country}, {lang}
        </h2>
      </div>
    </Link>
  );
};

export default TourCard;
