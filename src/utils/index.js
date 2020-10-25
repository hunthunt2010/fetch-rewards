const formatData = (data) => {
  // filter out empty empty names, then group by listId
  const grouped = data
    .filter((d) => d.name)
    .reduce((acc, d) => {
      if (acc[d.listId]) {
        acc[d.listId] = [...acc[d.listId], d];
      } else {
        acc[d.listId] = [d];
      }
      return acc;
    }, {});

  // sort by listId
  const ordered = {};
  Object.keys(grouped)
    .sort()
    .forEach((key) => {
      ordered[key] = grouped[key];
    });
  return ordered;
};

export default formatData;
