import { create } from "zustand";
import { persist } from "zustand/middleware";

const parseTotalPages = (v: number) => (v === 0 ? 1 : v);

export const useListStore = create(
  persist(
    (set: any, get: any) => ({
      data: [],
      visibleData: [],
      searchData: [],
      pageSize: 10,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      searchValue: "",
      setData: (data: any) =>
        set((s: any) => ({
          data,
          totalItems: data.length,
          totalPages: parseTotalPages(
            Math.ceil(
              (s.searchData.length ? s.searchData.length : data.length) /
                s.pageSize
            )
          ),
          visibleData: s.searchData.length
            ? s.searchData.slice(0, 10)
            : data.slice(0, 10),
        })),
      loadMore: () =>
        set((s: any) => {
          const nextIndex = s.visibleData.length + 10;
          return {
            visibleData: s[s.searchData.length ? "searchData" : "data"].slice(
              0,
              nextIndex
            ),
            currentPage: nextIndex,
          };
        }),
      setPageSize: (pageSize: any) =>
        set((s: any) => {
          return {
            pageSize,
            currentPage: 1,
            visibleData: s[s.searchData.length ? "searchData" : "data"].slice(
              0,
              pageSize
            ),
            totalPages: parseTotalPages(
              Math.ceil(
                s[s.searchData.length ? "searchData" : "data"].length / pageSize
              )
            ),
          };
        }),
      setPage: (page: number) =>
        set((s: any) => {
          if (page < 1) {
            return {
              currentPage: 1,
            };
          }
          if (page > s.totalPages) {
            return {
              currentPage: s.totalPages,
            };
          }
          const startIndex = (page - 1) * s.pageSize;
          const endIndex = startIndex + s.pageSize;
          return {
            currentPage: page,
            visibleData: s[s.searchData.length ? "searchData" : "data"].slice(
              startIndex,
              endIndex
            ),
          };
        }),
      changePage: (newPage: number) =>
        set((s: any) => {
          if (newPage < 1) return;
          if (newPage > s.totalPages) return;
          s.setPage(newPage);
        }),
      searchByName: (name: string) => {
        set((s: any) => {
          if (!name.length) {
            s.clearSearch();
          }

          const filteredData = s.data.filter((item: any) =>
            item.name.toLowerCase().includes(name.trim().toLowerCase())
          );
          return {
            searchValue: name,
            searchData: filteredData,
            totalItems: filteredData.length,
            totalPages: parseTotalPages(
              Math.ceil(filteredData.length / s.pageSize)
            ),
            visibleData: filteredData.slice(0, s.pageSize),
            currentPage: 1,
          };
        });
      },
      clearSearch: () =>
        set((s: any) => {
          return {
            searchValue: "",
            searchData: [],
            visibleData: s.data.slice(0, s.pageSize),
            totalItems: s.data.length,
            totalPages: parseTotalPages(Math.ceil(s.data.length / s.pageSize)),
            currentPage: 1,
          };
        }),
      getGameById: (id: string) => {
        const game = get().data.find((item: any) => item.id === id);
        return game || null;
      },
    }),
    {
      name: "list-storage",
    }
  )
);
