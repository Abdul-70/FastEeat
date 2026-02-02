const reviews = [
  {
    id: 1,
    name: "Amit Sharma",
    comment: "Food was hot & delivery was super fast. Loved the service!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "Neha Verma",
    comment: "Great variety of restaurants. UI is very smooth.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "Rahul Khan",
    comment: "Affordable prices and easy checkout experience.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
  },
];
import React from "react";
const Reviews = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Customers Say ⭐
        </h2>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="text-orange-500 text-sm">
                    {"⭐".repeat(review.rating)}
                  </div>
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm italic">
                “{review.comment}”
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
