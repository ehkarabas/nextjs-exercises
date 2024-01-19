import TourCard from "./TourCard";

const ToursList = ({ data }) => {
  if (data.length === 0) return <h4 className="text-lg">No tours found...</h4>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((tour, index) => {
        return <TourCard key={`tour-card-${index}`} tour={tour} />;
      })}
    </div>
  );
};

export default ToursList;