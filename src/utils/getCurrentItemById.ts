type TAnySortingArrOfObj = {
  id: number | string;
  [key: string]: any;
}[];

export const getCurrentItemById = (
  id: string,
  dataArr: TAnySortingArrOfObj
) => {
  const eventData = dataArr.find((event) => {
    const result = String(event.id) === String(id);
    return result;
  });
  return eventData;
};
