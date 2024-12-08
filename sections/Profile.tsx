import React from "react";

interface Profile {
  image: string;
  name: string;
  profession: string;
}

const profileSample: Profile[] = [
  {
    image: "/images/user.jpg",
    name: "John Doe",
    profession: "Full Stack Developer",
  },
  {
    image: "/images/user.jpg",
    name: "Jane Smith",
    profession: "Software Engineer",
  },
  {
    image: "/images/user.jpg",
    name: "Alice Brown",
    profession: "UI/UX Designer",
  },
  {
    image: "/images/user.jpg",
    name: "Bob White",
    profession: "Backend Developer",
  },
  {
    image: "/images/user.jpg",
    name: "Charlie Green",
    profession: "Data Scientist",
  },
  {
    image: "/images/user.jpg",
    name: "Dana Black",
    profession: "Full Stack Developer",
  },
  {
    image: "/images/user.jpg",
    name: "Eva Gray",
    profession: "Product Manager",
  },
];

const Profile: React.FC = () => {
  return (
    <section className="wrapper bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sample Profile
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the talented individuals behind the projects and
            innovations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {profileSample.map((profile, index) => (
            <div
              key={index}
              className="border text-center border-gray-200 p-6 rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center  mb-4">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full border-4 border-blue-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {profile.name}
              </h3>
              <p className="text-gray-600">{profile.profession}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
