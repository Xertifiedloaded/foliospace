import React from "react";
import { Loader2 } from "lucide-react";

const ProfilePreview = ({ data, loading, skills }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-6 w-48 bg-gray-200 animate-pulse mt-4" />
        </div>

        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 animate-pulse" />
            <div className="h-8 w-full bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 ">
      <div className="flex flex-col items-center text-center">
        {data?.previewUrl ? (
          <img
            src={data.previewUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl text-gray-500">👤</span>
          </div>
        )}
        <h2 className="mt-4 font-semibold text-lg">
          {data?.tagline || "No tagline set"}
        </h2>
      </div>

      {skills.length > 0 && (
        <section>
          <h3 className="text-sm font-medium text-heading">Skills</h3>
          <ul className="flex items-center flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-background rounded-full text-xs"
              >
                <span>{skill.name}</span>
              </span>
            ))}
          </ul>
        </section>
      )}

      <div className="space-y-4">
        <section>
          <h3 className="text-sm font-medium text-heading">About</h3>
          <p className="mt-1 text-sm">{data?.bio || "No bio added yet"}</p>
        </section>

        <section>
          <h3 className="text-sm font-medium text-heading">Contact</h3>
          <div className="mt-1 text-sm">
            <p>{data?.phoneNumber || "No phone number added"}</p>
            <p>{data?.address || "No address added"}</p>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-heading">Hobbies</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {data?.hobbies ? (
              (typeof data.hobbies === "string"
                ? data.hobbies.split(",")
                : data.hobbies
              ).map((hobby, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-background rounded-full text-xs"
                >
                  {hobby.trim()}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">No hobbies added</span>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-heading">Languages</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {data?.languages ? (
              (typeof data.languages === "string"
                ? data.languages.split(",")
                : data.languages
              ).map((language, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-background rounded-full text-xs"
                >
                  {language.trim()}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">No languages added</span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePreview;
