/* eslint-disable */
/**
 *  COPY THIS FILE INTO faker/lib
 * @namespace faker.company
 */
var Company = function (faker) {
  
  var self = this;
  var f = faker.fake;
  
  /**
   * suffixes
   *
   * @method faker.company.suffixes
   */
  this.suffixes = function () {
    // Don't want the source array exposed to modification, so return a copy
    return faker.definitions.company.suffix.slice(0);
  }

  /**
   * companyName
   *
   * @method faker.company.companyName
   * @param {string} format
   */
  this.companyName = function (format) {
    const adjective = ['Organic', 'Edible', 'Tart', 'Hot', 'Spicy', 'SweetNSour', 'Savoury', 'Bittersweet', 'Seasoned', 'Fresh', 'Ketchupy', 'Garlicy', 'Roasted', 'Grilled', 'Fried', 'DeepFried', 'Grilled', 'Family', 'Sweet', 'Savory', 'Super', 'Giant', 'Summer', 'Winter', 'Wasabi', 'Whipped', 'Spring', 'BigOl', 'Tasty', 'BiteSize', 'Blended', 'Aged', 'Boiled', 'Candied', 'Carmelized', 'CharBroiled', 'Chocolate', 'Delectable', 'Delightful', 'Famous', 'Flaky', 'Fluffy', 'Frozen', 'Ginger', 'Golden', 'Toasted', 'Hearty', 'Hot', 'Intense', 'Jumbo', 'Mini', 'Lavish', 'Lite', 'Lukewarm', 'MouthWatering', 'Natural', 'Peppery', 'Peppered', 'Blackened', 'Pickled', 'Poached', 'Scrumptious', 'Silky', 'Smoked', 'Smoky', 'Smooth', 'Sprinkled', 'Steamy', 'Steamed', 'Succulent', 'Sugary', 'Strawberry', 'Sweetened', 'Thin', 'Thick', 'Fat', 'Traditional', 'Velvety', 'Zesty', 'Zingy', 'Crisp', 'Crispy', 'Crumbly', 'Crunchy', 'Sour', 'Juicy', 'Vegan', 'Big', 'Delicious'];
    const cuisine = ['Italian', 'Southern', 'Cajun', 'Lebanese', 'Jamaican', 'Tunisian', 'Danish', 'Belgian', 'Indonesian', 'Swedish', 'Norwegian', 'Soul', 'British', 'Haute', 'Armenian', 'Vegetarian', 'Chilean', 'Hawaiian', 'Mediterranean', 'Greek', 'American', 'Fusion', 'Peruvian', 'Argentinian', 'Thai', 'Indian', 'Japanese', 'Canadian', 'German', 'French', 'Spanish', 'Ethiopian', 'Arabian', 'Polish', 'Lithuanian', 'Georgian', 'Cuban', 'Sicilian', 'Moroccan', 'Vietnamese', 'Bulgarian', 'Chinese', 'Mexican', 'Russian', 'Slavic', 'European', 'French', 'Japanese', 'Korean', 'German', 'Turkish', 'Samoan', 'Filipino', 'Cambodian', 'Burmese', 'Pakistani', 'Afghan', 'Persian', 'Iranian', 'British'];
    const foodSingular = ['Burger', 'Chow', 'Grub', 'Avocado', 'Breakfast', 'Lunch', 'Dinner', 'Black Beans', 'Brunch', 'Buckwheat', 'Broccoli', 'Boysenberry Pie', 'Brownie', 'Cheesecake', 'Cereal', 'Carrots', 'Coffee', 'Chickpeas', 'Falafel', 'Schwarma', 'Collard Greens', 'Corn', 'Doughnut', 'Eggplant', 'French Fries', 'Mushroom', 'Granola', 'Lettuce', 'HoneyDew', 'Jackfruit', 'Kumquat', 'Loquat', 'Lemonade', 'Maize', 'Milkshake', 'Mochi', 'Noodles', 'Omelet', 'Pineapple', 'Peanut Butter', 'Persimmon', 'PotRoast', 'Picnic', 'Pretzel', 'Edamame', 'SplitPeas', 'Stew', 'Porridge', 'Squash', 'Supper', 'SweetPotato', 'Turnips', 'Cookie', 'Curry', 'Bowl', 'Enchilada', 'Poke', 'Bean', 'Sushi', 'Pizza', 'BBQ', 'Summer Salad', 'Casserole', 'Chili Bowl', 'Soup', 'Pie', 'Cake', 'Burrito', 'Taco', 'Salad', 'Pho', 'Chili', 'Momo', 'StirFry', 'FishNChips', 'MacNCheese', 'Pasta', 'Spaghetti'];
    const foodPlural = ["Burgers", "Burritos", "Country Dumplins", "Grits", "Tacos", "Salads", "Dumplings", "Soups", "Pies", "Cakes", "Smoothies"];
    const place = ["Bar", "Restaurant", "Buffet", "Hub", "Spot", "Corner", "Avenue", "Street", "Table", "Diner", "Cafe", "Bistro"];
    const random = (array) => (array[faker.random.number({ min: 0, max: array.length - 1, precision: 1 })]);
  
    var formats = [
      `{{name.lastName}}s ${random(cuisine)} ${random(foodPlural)}`,
      `{{name.lastName}}s ${random(cuisine)} ${random(foodSingular)}`,
      `{{name.lastName}}s`,
      `${random(foodSingular)} ${random(place)}`,
      `{{name.firstName}}s ${random(foodSingular)} ${random(place)}`,
      `The ${random(foodSingular)} ${random(place)}`,
      `The ${random(adjective)} ${random(place)}`,
      `The ${random(adjective)} ${random(foodSingular)}`,
      `The ${random(cuisine)} ${random(foodSingular)}`,
      `{{name.firstName}}s ${random(adjective)} ${random(foodSingular)}`,
      `{{name.firstName}}s ${random(cuisine)} ${random(foodSingular)}`,
    ];
  
    if (typeof format !== "number") {
      format = faker.random.number(formats.length - 1);
    }
  
    return f(formats[format]);
  }

  /**
   * companySuffix
   *
   * @method faker.company.companySuffix
   */
  this.companySuffix = function () {
      return faker.random.arrayElement(faker.company.suffixes());
  }

  /**
   * catchPhrase
   *
   * @method faker.company.catchPhrase
   */
  this.catchPhrase = function () {
    return f('{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}')
  }

  /**
   * bs
   *
   * @method faker.company.bs
   */
  this.bs = function () {
    return f('{{company.bsAdjective}} {{company.bsBuzz}} {{company.bsNoun}}');
  }

  /**
   * catchPhraseAdjective
   *
   * @method faker.company.catchPhraseAdjective
   */
  this.catchPhraseAdjective = function () {
      return faker.random.arrayElement(faker.definitions.company.adjective);
  }

  /**
   * catchPhraseDescriptor
   *
   * @method faker.company.catchPhraseDescriptor
   */
  this.catchPhraseDescriptor = function () {
      return faker.random.arrayElement(faker.definitions.company.descriptor);
  }

  /**
   * catchPhraseNoun
   *
   * @method faker.company.catchPhraseNoun
   */
  this.catchPhraseNoun = function () {
      return faker.random.arrayElement(faker.definitions.company.noun);
  }

  /**
   * bsAdjective
   *
   * @method faker.company.bsAdjective
   */
  this.bsAdjective = function () {
      return faker.random.arrayElement(faker.definitions.company.bs_adjective);
  }

  /**
   * bsBuzz
   *
   * @method faker.company.bsBuzz
   */
  this.bsBuzz = function () {
      return faker.random.arrayElement(faker.definitions.company.bs_verb);
  }

  /**
   * bsNoun
   *
   * @method faker.company.bsNoun
   */
  this.bsNoun = function () {
      return faker.random.arrayElement(faker.definitions.company.bs_noun);
  }
  
}

module['exports'] = Company;