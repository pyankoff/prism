if (Series.find().count() === 0) {
  Series.insert({
    name: 'ebitda',
    childs: ['sales', 'costs'],
    parents: [],
    values: [1, 2, 4, 6, 9, 14, 20, 25, 35, 50, 70, 85]
  });
  Series.insert({
    name: 'sales',
    childs: [],
    parents: ['ebitda'],
    values: [1, 2, 4, 6, 9, 14, 20, 25, 35, 50, 70, 85]
  });
  Series.insert({
    name: 'costs',
    childs: [],
    parents: ['ebitda'],
    values: [1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 15, 18]
  });
}