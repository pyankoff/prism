if (Series.find().count() === 0) {
  Series.insert({
    name: 'EBITDA',
    values: [1, 2, 4, 6, 9, 14, 20, 25, 35, 50, 70, 85]
  });
}