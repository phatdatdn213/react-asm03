import { useEffect } from "react";

export const sum = (arr) => {
  const sumArray = arr.map((e) => {
    return Number(e.price) * Number(e.amount);
  });

  const result = sumArray.reduce((total, current) => {
    return total + current;
  }, 0);

  return result;
};

export const calculate = (arr) => {
  arr = arr.toString();
  const length = arr.length;
  let com = ",";
  let string = "";
  let count = 0;

  for (let i = length - 1; i > -1; i--) {
    string = arr[i].concat(string);
    count++;
    if (count % 3 === 0 && i !== 0) {
      string = com.concat(string);
    }
  }
  return `${string} VNĐ`;
};

export const total = (price, amount) => {
  return Number(price) * Number(amount);
};

const useData = (handle, depence) => {
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      handle(data);
    };

    getData().catch((err) => {
      console.log(err.message);
    });
  }, [depence]);
};

export default useData;
