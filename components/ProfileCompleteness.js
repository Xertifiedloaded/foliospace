const ProfileCompleteness = ({ profile }) => {
  const safeProfile = profile || {};
  const requiredFields = [
    "tagline",
    "bio",
    "phoneNumber",
    "address",
    "hobbies",
    "languages",
    "picture",
  ];

  const nonEmptyFieldsCount = requiredFields.filter((field) => {
    const fieldValue = safeProfile[field];
    if (Array.isArray(fieldValue)) {
      return fieldValue?.length > 0;
    } else if (typeof fieldValue === "string") {
      return fieldValue?.trim().length > 0;
    }
    return false;
  }).length;

  const completenessPercentage =
    (nonEmptyFieldsCount / requiredFields.length) * 100;

  const isComplete = nonEmptyFieldsCount === requiredFields?.length;

  return (
  <>
    <div className="flex justify-between items-center">
      <span className="text-sm text-neutral-600">Profile Completeness</span>

      <div className="flex-grow mx-2 relative">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isComplete ? "bg-blue-600" : "bg-red-600"
            }`}
            style={{ width: `${completenessPercentage}%` }}
          />
        </div>
      </div>

      <span
        className={`text-sm font-semibold ${
          isComplete ? "text-blue-600" : "text-red-600"
        }`}
      >
        {completenessPercentage.toFixed(0)}%
      </span>
    </div>

  </>
  );
};

export default ProfileCompleteness;
