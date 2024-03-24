const recentlyViewed = localStorage.getItem("recentlyViewed") ? localStorage.getItem("recentlyViewed") : [];

export const addToRecentlyViewed = (board) => {
  const viewedBoard = {
    board: board,
    time: Date.now()
  }



  localStorage.setItem("recentlyViewed", allViewedBoard);
}