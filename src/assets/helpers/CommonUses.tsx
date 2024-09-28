export const Curruncy: string = "₹";

export const dateTransformDDMMYY = (date: string): string => {
  const transformdate = date.split("-").reverse().join("/");
  return transformdate;
};

export const getDueDateMessage = (dueDate: string): string => {
  const currentDate = new Date(); // Get current date and time
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0); // Set due date time to midnight

  const timeDiff = due.getTime() - currentDate.getTime(); // Difference in milliseconds
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

  if (dayDiff === 0) {
    return "today";
  } else if (dayDiff === 1) {
    return "tomorrow";
  } else if (dayDiff > 1) {
    return `in ${dayDiff} days`;
  } else {
    return "date passed";
  }
};

export function padWithZeros(number: number): string {
  return number.toString().padStart(5, "0");
}

export const parseFloatWithFixedValue = (value: string): string => {
  return parseFloat(value).toFixed(2);
};

export function formatIndianCurrency(amount: number): string {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const todayDate: string = new Date().toISOString().split("T")[0];
