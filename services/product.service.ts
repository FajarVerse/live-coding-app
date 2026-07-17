export const getProduct = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = response.json();
  return data;
};

export const getProductById = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = response.json();
  return data;
};
