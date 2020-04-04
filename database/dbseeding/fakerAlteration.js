/* eslint-disable */
this.companyName = function (format) {
  const adjective = ["Organic", "BigOl", "Tasty", "Juicy", "Vegan", "Big", "Delicious"];
  const cuisine = ["Italian", "Chinese", "Mexican", "Russian", "Slavic", "European", "French", "Japanese", "Korean", "German", "British"];
  const foodSingular = ["Burger", "Pizza", "Casserole", "Chili Bowl", "Soup", "Pie", "Cake", "Burrito", "Taco", "Salad", "Pho", "Chili", "Momo", "StirFry", "FishNChips", "MacNCheese", "Pasta", "Spaghetti"];
  const foodPlural = ["Burgers", "Burritos", "Tacos", "Salads", "Dumplings", "Soups", "Pies", "Cakes", "Smoothies"];
  const place = ["Bar", "Restaurant", "Hub", "Spot", "Corner", "Avenue", "Street", "Table", "Diner", "Cafe", "Bistro"];
  const random = (array) => (array[faker.random.number({ min: 0, max: array.length - 1, precision: 1 })]);

  var formats = [
    `{{name.lastName}}s ${random(cuisine)} ${random(foodPlural)}`,
    `{{name.lastName}}s`,
    `${random(foodSingular)} ${random(place)}`,
    `{{name.firstName}}s ${random(foodSingular)} ${random(place)}`,
    `The ${random(foodSingular)} ${random(place)}`,
    `The ${random(adjective)} ${random(foodSingular)}`,
  ];

  if (typeof format !== "number") {
    format = faker.random.number(formats.length - 1);
  }

  return f(formats[format]);
}