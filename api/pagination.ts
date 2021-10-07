export interface PaginationQuery {
  first?: string;
  last?: string;
  before?: string;
  after?: string;
}

export const paginate = <T extends { id: string }>(
  arr: T[],
  params: PaginationQuery
) => {
  const { first, last, before, after } = params;
  if (!first && !last) {
    throw new Error("Must be specified as first or last");
  }
  let limit = 0,
    offset = 0;
  if (first) {
    limit = Number(first);
    offset = after ? arr.findIndex((item) => item.id === after) + 1 : 0;
  } else if (last) {
    limit = Number(last);
    offset = before
      ? arr.length - arr.findIndex((item) => item.id === before)
      : 0;
  }

  const newArr = [...arr]
    .sort((a, b) => {
      let ret = a.id < b.id ? -1 : 1;
      return last ? -ret : ret;
    })
    .slice(offset, offset + limit);

  return {
    newArr,
    pageInfo: {
      hasNextPage: arr.length > offset + limit,
      hasPreviousPage: offset > 0,
      startCursor: newArr.length ? newArr[0].id : null,
      endCursor: newArr.length ? newArr[newArr.length - 1].id : null,
    },
    totalCount: newArr.length,
  };
};
