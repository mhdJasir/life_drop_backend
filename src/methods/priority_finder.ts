
enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}

function calculatePriority(
  dateOfRequirement: Date,
  donorAvailability: number, // Number of available donors with the required blood group
  thresholdDays: number = 3, // Days before requirement to increase priority
  maxPriority: number = 100, // Highest possible priority score
  minPriority: number = 1    // Lowest possible priority score
): Priority {
  const reqData = new Date(dateOfRequirement);

  const currentDate = new Date();

  // Time difference in milliseconds
  const timeDiff = reqData.getTime() - currentDate.getTime();

  // Calculate the number of days left until the requirement
  const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Priority based on how urgent the request is (closer date gets higher priority)
  let urgencyScore = Math.max(0, thresholdDays - daysLeft) * 10;

  // Priority based on donor availability (fewer donors = higher priority)
  let donorScore = donorAvailability > 0 ? 100 / donorAvailability : maxPriority;

  // Combine both factors
  let priority = Math.min(maxPriority, urgencyScore + donorScore);

  // Ensure priority is between minPriority and maxPriority
  const boundedPriority = Math.max(minPriority, Math.min(priority, maxPriority));

  if (boundedPriority <= 25) {
    return Priority.Low;
  } else if (boundedPriority <= 50) {
    return Priority.Medium;
  } else if (boundedPriority <= 75) {
    return Priority.High;
  } else {
    return Priority.Urgent;
  }
}


export default calculatePriority;